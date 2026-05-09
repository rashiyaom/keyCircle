# Backend - KeyCircle

Backend API for the KeyCircle vehicle rental marketplace. Ready for implementation.

## Overview

This folder is set up for backend development. The frontend (React application) communicates with this backend API to handle:

- User authentication and session management
- Vehicle listing and search
- Booking and rental management
- Payment processing
- User verification and profiles
- Real-time notifications

## Recommended Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT (JSON Web Tokens)
- **API Style**: REST (or GraphQL if preferred)
- **ORM**: Prisma or TypeORM
- **Validation**: Zod or Joi
- **Testing**: Jest + Supertest
- **Deployment**: Docker + Railway/Render/Vercel

## Project Structure (To Implement)

```
backend/
├── src/
│   ├── routes/              # API routes
│   │   ├── auth.ts         # Authentication routes
│   │   ├── vehicles.ts     # Vehicle routes
│   │   ├── bookings.ts     # Booking routes
│   │   ├── users.ts        # User routes
│   │   └── ...
│   ├── controllers/         # Business logic
│   ├── middleware/          # Express middleware (auth, validation, etc.)
│   ├── models/             # Database models (if using TypeORM/Sequelize)
│   ├── services/           # Business logic services
│   ├── types/              # TypeScript types and interfaces
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration files
│   └── index.ts            # Entry point
├── prisma/                 # Prisma schema (if using Prisma)
│   └── schema.prisma
├── tests/                  # Test files
├── package.json
├── tsconfig.json
├── .env.example
├── docker-compose.yml      # Local development database
└── README.md
```

## Getting Started

### 1. Initialize Node.js Project

```bash
npm init -y
npm install express cors dotenv
npm install -D typescript ts-node @types/node @types/express
```

### 2. Install Database Tools

Using Supabase PostgreSQL:

```bash
npm install @supabase/supabase-js
npm install -D prisma @prisma/client  # Or TypeORM
```

Or install PostgreSQL locally:

```bash
npm install pg
npm install -D @types/pg
```

### 3. Create Basic Structure

```bash
mkdir -p src/{routes,controllers,middleware,services,utils,types,config}
touch src/index.ts
```

### 4. Set Up TypeScript

```bash
npx tsc --init
```

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  }
}
```

## API Endpoints (To Implement)

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user

### Vehicles
- `GET /api/vehicles` - List all vehicles
- `GET /api/vehicles/:id` - Get vehicle details
- `POST /api/vehicles` - Create listing (authenticated)
- `PUT /api/vehicles/:id` - Update listing (owner only)
- `DELETE /api/vehicles/:id` - Delete listing (owner only)

### Bookings
- `POST /api/bookings` - Create booking (authenticated)
- `GET /api/bookings` - List user bookings (authenticated)
- `PUT /api/bookings/:id` - Update booking status (authenticated)
- `DELETE /api/bookings/:id` - Cancel booking (authenticated)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (authenticated)
- `GET /api/users/:id/ratings` - Get user ratings
- `POST /api/users/:id/verify` - Verify user documents (authenticated)

### Payments
- `POST /api/payments` - Process payment
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments/:id/refund` - Refund payment

## Environment Variables

Create `.env`:

```env
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/keycircle

# Or use Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=24h

# CORS
CORS_ORIGIN=http://localhost:8080

# Payment Gateway (if using)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

# Verification Services
SUREPASS_TOKEN=your_surepass_token
```

## Database Schema

Reference the database schema in `../SETUP_DATABASE.sql`.

Key tables:
- `users` - User accounts
- `profiles` - User profiles
- `vehicles` - Vehicle listings
- `bookings` - Rental bookings
- `payments` - Payment records
- `ratings` - User ratings and reviews
- `verifications` - Document verification status

## Basic Express Server

Example `src/index.ts`:

```typescript
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

## Authentication Middleware

Example middleware for JWT verification:

```typescript
// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as { id: string; email: string };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

## Database Connection

Using Supabase:

```typescript
// src/config/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default supabase;
```

Using PostgreSQL with Prisma:

```bash
npm install @prisma/client
npx prisma init
```

Update `prisma/schema.prisma` with your models.

## Development

```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  }
}
```

## Testing

Setup Jest:

```bash
npm install -D jest ts-jest @types/jest supertest @types/supertest
npx jest --init
```

Example test:

```typescript
// tests/api.test.ts
import request from 'supertest';
import app from '../src/index';

describe('API Health', () => {
  it('should return 200 and status ok', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body.status).toBe('ok');
  });
});
```

## Deployment

### Using Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

### Deploy to Railway

```bash
npm install -g @railway/cli
railway init
railway up
```

## Performance Best Practices

- Use connection pooling for database
- Implement caching (Redis)
- Add rate limiting
- Use pagination for list endpoints
- Optimize database queries
- Monitor performance with APM tools

## Security Best Practices

- Use HTTPS in production
- Validate all inputs (Zod/Joi)
- Implement CORS properly
- Use environment variables for secrets
- Add rate limiting
- Implement CSRF protection
- Use secure headers (helmet.js)
- Validate JWT tokens
- Hash passwords (bcrypt)
- Implement proper error handling

## Environment Variables

The `.env.local` file contains all backend configuration and sensitive credentials. This file should be:

- ✅ **Located in**: `/backend/.env.local`
- ✅ **Gitignored**: Already ignored by project's `.gitignore`
- ✅ **Never committed**: Contains API keys and secrets

### Environment Variables Included

- **VITE_SUPABASE_URL**: Supabase project URL
- **VITE_SUPABASE_ANON_KEY**: Supabase anonymous key for client-side requests
- **SUPABASE_SERVICE_ROLE_KEY**: Server-side service role key (sensitive - for server only)
- **DATABASE_URL**: Direct PostgreSQL connection string
- **VITE_STRIPE_PUBLISHABLE_KEY**: Stripe publishable key
- **STRIPE_SECRET_KEY**: Stripe secret key (sensitive)

### Setup Instructions

1. Copy `.env.local` from backend folder
2. Update with your actual credentials:
   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   DATABASE_URL=your_database_url
   VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   ```
3. Never commit `.env.local` - it's in `.gitignore`

## Next Steps

1. ✅ Choose framework and database
2. ✅ Set up project structure
3. ✅ Implement authentication endpoints
4. ✅ Create vehicle endpoints
5. ✅ Implement booking system
6. ✅ Add payment integration
7. ✅ Setup testing
8. ✅ Deploy to production

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [JWT Authentication](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Support

For backend-related questions, refer to the main README.md or create an issue.

---

**Status**: ⏳ Ready for implementation
