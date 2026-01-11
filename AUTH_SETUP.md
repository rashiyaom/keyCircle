# Authentication Setup Guide

## Overview
This application uses **Supabase** for authentication. The structure is already in place, but you'll need to configure your Supabase project credentials.

## Current Authentication Structure

### Routes
- `/auth` - Main authentication entry page (Sign In / Sign Up choice)
- `/signin` - Sign in form (to be implemented)
- `/signup` - Sign up flow (to be implemented)
- `/admin/signin` - Hidden admin access route (not visible in UI)

### Pages Created
1. **Auth.tsx** - Clean entry page with two equal-weight options
2. **SignIn.tsx** - Placeholder for sign-in form
3. **SignUp.tsx** - Placeholder for sign-up flow
4. **AdminSignIn.tsx** - Hidden admin route (access via direct URL only)

### Supabase Integration
- Client initialized in `src/lib/supabase.ts`
- Environment variables configured via `.env.example`

## Setup Instructions

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database provisioning

### 2. Get Your Credentials
1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy:
   - Project URL
   - `anon` public key

### 3. Configure Environment Variables
1. Create a `.env.local` file in the project root:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Restart Development Server
```bash
npm run dev
```

## Next Steps (To Be Implemented)

### Authentication Forms
- [ ] Build sign-in form with email/password
- [ ] Build sign-up form with user details
- [ ] Add email verification flow
- [ ] Implement password reset
- [ ] Add OAuth providers (Google, GitHub, etc.)

### Role Management
- [ ] Set up user roles (user, host, admin)
- [ ] Create role-based access control
- [ ] Implement admin dashboard
- [ ] Add role selection during signup

### Protected Routes
- [ ] Create authentication context
- [ ] Add route guards
- [ ] Implement session management
- [ ] Add auto-redirect logic

### Admin Features
- [ ] Secure admin authentication
- [ ] Admin dashboard UI
- [ ] User management panel
- [ ] Analytics and reporting

## Design Philosophy

### Why This Structure?
1. **Clean Separation** - Auth entry page is simple and focused
2. **Future-Ready** - Easy to extend with forms and logic
3. **Secure Admin** - Hidden route, not exposed in UI
4. **Supabase First** - Built with proper auth foundation

### Navigation Flow
```
Landing Page (/)
    ↓
Auth Page (/auth)
    ↓ ↓
Sign In (/signin)  OR  Sign Up (/signup)
    ↓                      ↓
[Forms to be built]    [Flow to be built]

Hidden: Admin (/admin/signin) - Direct URL access only
```

## Current Features

### ✅ Completed
- Clean auth entry page design
- Routing structure
- Supabase client setup
- Environment variable configuration
- Sign in button in navigation
- Hidden admin route
- Mobile responsive design

### 🔜 Coming Next
- Actual authentication forms
- Supabase auth integration
- Email verification
- Role-based access
- Protected routes

## Development Notes

### Admin Access
Admin sign-in is accessible via `/admin/signin` URL directly. There is intentionally **no UI link** to this page for security through obscurity. In production, you should:
- Add IP whitelisting
- Implement 2FA
- Add additional security layers
- Use separate admin subdomain

### Styling
The auth pages use your existing design system:
- Tailwind CSS classes
- Consistent spacing and shadows
- Matches your brand aesthetic
- Premium, modern feel

## Questions?
Refer to [Supabase Auth Documentation](https://supabase.com/docs/guides/auth) for detailed implementation guides.
