import express, { Express, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./config/supabase.js";
import { errorHandler, sendSuccess } from "./utils/response.js";
dotenv.config({ path: ".env.local" });
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Health check endpoint
app.get("/health", (req, res) => {
    sendSuccess(res, {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
// API version endpoint
app.get("/api/v1", (req, res) => {
    sendSuccess(res, {
        name: "KeyCircle API",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
    });
});
// Test Supabase connection endpoint
app.get("/api/v1/test-db", async (req, res) => {
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
    }
    catch (err) {
        console.error("Database connection error:", err);
        sendSuccess(res, {
            message: "Database connection test (schema may not exist yet)",
            error: err.message,
            note: "Run CHUNK 3 to set up the schema",
        });
    }
});
// Routes (to be added in later chunks)
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/vehicles", vehicleRoutes);
// app.use("/api/v1/bookings", bookingRoutes);
// app.use("/api/v1/users", userRoutes);
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
    console.log(`  GET  /health           - Health check`);
    console.log(`  GET  /api/v1           - API info`);
    console.log(`  GET  /api/v1/test-db   - Test database connection\n`);
});
//# sourceMappingURL=index.js.map