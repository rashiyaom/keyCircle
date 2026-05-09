# KeyCircle - Peer-to-Peer Vehicle Rental Marketplace

A modern web application for sharing and renting vehicles in your community.

## Project Structure

```
keyCircle/
├── frontend/              # React + TypeScript frontend application
│   ├── src/              # Source code (components, pages, hooks, etc.)
│   ├── public/           # Static assets
│   ├── dist/             # Built application (production)
│   ├── package.json      # Dependencies and scripts
│   ├── vite.config.ts    # Vite build configuration
│   ├── tailwind.config.ts # Tailwind CSS configuration
│   ├── tsconfig.json     # TypeScript configuration
│   └── README.md         # Frontend setup instructions
│
├── backend/              # Backend API (Node.js/Express - to be implemented)
│   ├── README.md         # Backend setup instructions
│   └── ...               # Backend implementation files
│
├── .env.example          # Environment variables template
├── SETUP_DATABASE.sql    # Database schema reference
├── DUMMY_LOGIN_INFO.md   # Test credentials
└── README.md            # This file

```

## Quick Start

### Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Test Credentials

```
Email: demo@keycircle.com
Password: Demo123!
```

Refer to [DUMMY_LOGIN_INFO.md](./DUMMY_LOGIN_INFO.md) for more details.

## Technology Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 7.3.1
- **Routing**: React Router v6.30.1
- **Styling**: Tailwind CSS 3.4.17 + Shadcn/ui components
- **State Management**: React Context API + TanStack React Query
- **Authentication**: Custom Auth Context with localStorage persistence
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: Sonner toasts
- **Database Integration**: Supabase (optional)

### Backend (To Be Implemented)
- Recommended: Node.js + Express
- Database: PostgreSQL (can use Supabase)
- Authentication: JWT tokens
- API Style: REST/GraphQL

## Features

- 🏍️ **Vehicle Marketplace** - Browse and filter available vehicles
- 📅 **Booking System** - Multi-step booking flow
- 👤 **User Profiles** - Comprehensive profile management
- ✅ **Verification** - Aadhaar and document verification
- 📊 **Dashboard** - User analytics and statistics
- 🔐 **Security** - Protected routes and authentication
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Glassmorphic design with animations

## Key Pages

- **Landing Page** (`/`) - Marketing landing page
- **Marketplace** (`/marketplace`) - Browse vehicles
- **Dashboard** (`/dashboard`) - User dashboard (protected)
- **Profile** (`/profile`) - Profile management (protected)
- **Sign In** (`/signin`) - Authentication
- **Sign Up** (`/signup/journey`) - Multi-step signup with verification
- **Services** (`/services`) - Services information

## Authentication Flow

1. User signs up with email/password or Google OAuth
2. User completes multi-step signup (identity, Aadhaar verification, password)
3. User is automatically authenticated and redirected to profile page
4. Session persisted in localStorage (24-hour expiry)
5. Protected routes redirect to signin if not authenticated

## Database Schema

The application uses Supabase PostgreSQL. Refer to [SETUP_DATABASE.sql](./SETUP_DATABASE.sql) for the schema reference.

Key tables:
- `rental_requests` - Booking records
- `user_dashboard_stats` - User metrics
- `profiles` - User profile information
- `addresses` - User addresses
- `payment_methods` - Payment options
- `vehicles` - Vehicle listings

## Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUREPASS_TOKEN=your_surepass_token  # For Aadhaar verification
```

Refer to `.env.example` for all required variables.

## Recent Changes

### Auth & Profile System (May 9, 2026)
- ✅ Fixed signup flow - users now automatically logged in after signup
- ✅ Made profile page persistent and loads correctly
- ✅ Unified auth context for consistent state management
- ✅ ProfileEnhanced now uses AuthContext instead of Supabase
- ✅ Deleted legacy database.ts implementation
- ✅ Added `signup()` method to AuthContext

### Project Restructure (May 9, 2026)
- ✅ Separated frontend and backend folders
- ✅ Frontend is a complete Vite+React application
- ✅ Backend ready for independent implementation
- ✅ Each folder can have its own package.json and dependencies

## Running the Application

```bash
# Frontend only (current state)
cd frontend
npm install
npm run dev

# Backend (when implemented)
cd backend
npm install
npm run dev
```

## Next Steps

1. **Implement Backend API** - Create Node.js/Express API in `backend/` folder
2. **Database Setup** - Connect to Supabase and run migrations
3. **Payment Integration** - Add Razorpay or similar
4. **Real-time Updates** - Add WebSocket support
5. **Testing** - Add unit and integration tests
6. **Deployment** - Setup CI/CD pipeline

## Project Status

- ✅ Frontend: Functional React application with authentication and UI
- ✅ Authentication: Dummy auth with localStorage + Supabase integration ready
- ✅ Database Schema: Defined but not yet implemented
- ⏳ Backend: Awaiting implementation
- ⏳ Payment System: Not yet implemented
- ⏳ Real-time Features: Not yet implemented

## Contributing

[To be defined - add contribution guidelines]

## License

[To be defined - add license]

## Support

For issues and questions, please create an issue in the repository.
