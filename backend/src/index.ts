import express from "express";
import type { Express, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { supabase } from "./config/supabase.js";
import { errorHandler, sendSuccess } from "./utils/response.js";
import { checkSchemaStatus, getTableStats, verifyConnection } from "./services/database.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import vehicleRoutes from "./routes/vehicles.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config({ path: ".env.local" });

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { success: false, error: { message: "Too many requests, please try again later." } }
});
app.use(limiter);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res: Response) => {
  sendSuccess(res, {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API version endpoint
app.get("/api/v1", (req, res: Response) => {
  sendSuccess(res, {
    name: "KeyCircle API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// Test Supabase connection endpoint
app.get("/api/v1/test-db", async (req, res: Response) => {
  try {
    const { data, error } = await supabase.from("vehicles").select("count", {
      count: "exact",
      head: true,
    });

    if (error) {
      throw error;
    }

    sendSuccess(res, {
      message: "✓ Supabase connection successful",
      vehicleCount: data?.length || 0,
    });
  } catch (err: any) {
    console.error("Database connection error:", err);
    sendSuccess(res, {
      message: "Database connection test (schema may not exist yet)",
      error: err.message,
      note: "Run CHUNK 2 to set up the schema",
    });
  }
});

// Schema status endpoint
app.get("/api/v1/schema/status", async (req, res: Response) => {
  const result = await checkSchemaStatus();
  res.status(result.success ? 200 : 400).json(result);
});

// Table statistics endpoint
app.get("/api/v1/schema/stats", async (req, res: Response) => {
  const result = await getTableStats();
  res.status(result.success ? 200 : 400).json(result);
});

// Connection verification endpoint
app.get("/api/v1/schema/verify", async (req, res: Response) => {
  const result = await verifyConnection();
  res.status(result.success ? 200 : 400).json(result);
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/users", usersRouter);

// 404 handler
app.use((req, res) => {
  sendSuccess(res, { message: "Route not found" }, 404);
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`\n📚 Available endpoints:`);
  console.log(`  GET  /health                  - Health check`);
  console.log(`  GET  /api/v1                  - API info`);
  console.log(`  GET  /api/v1/test-db          - Test database connection`);
  console.log(`  GET  /api/v1/schema/status    - Check schema status`);
  console.log(`  GET  /api/v1/schema/stats     - Get table statistics`);
  console.log(`  GET  /api/v1/schema/verify    - Verify database connection\n`);
  console.log(`  POST /api/v1/auth/signup     - Create auth session`);
  console.log(`  POST /api/v1/auth/login      - Log in with email`);
  console.log(`  GET  /api/v1/auth/me         - Get current session user`);
  console.log(`  POST /api/v1/auth/refresh    - Refresh auth session`);
  console.log(`  POST /api/v1/auth/logout     - Log out\n`);
  console.log(`  GET  /api/v1/users/:id       - Fetch a user profile`);
  console.log(`  POST /api/v1/users           - Create a user profile`);
  console.log(`  PUT  /api/v1/users/:id       - Update a user profile\n`);
  console.log(`  GET  /api/v1/vehicles        - List vehicles`);
  console.log(`  GET  /api/v1/vehicles/:id    - Get vehicle details`);
  console.log(`  POST /api/v1/vehicles        - Create a vehicle`);
  console.log(`  PUT  /api/v1/vehicles/:id    - Update a vehicle`);
  console.log(`  DELETE /api/v1/vehicles/:id  - Delete a vehicle\n`);
  console.log(`  GET  /api/v1/bookings        - List bookings`);
  console.log(`  GET  /api/v1/bookings/:id    - Get booking details`);
  console.log(`  POST /api/v1/bookings        - Create a booking`);
  console.log(`  PUT  /api/v1/bookings/:id    - Update a booking`);
  console.log(`  DELETE /api/v1/bookings/:id  - Delete a booking\n`);
});
