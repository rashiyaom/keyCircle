# Dummy Login Information

## Test Credentials

Use these credentials to test the application without Supabase configuration:

- **Email:** `demo@keycircle.com`
- **Password:** `Demo123!`

## Features

✅ **Session Persistence**: Your login session is saved and will persist across page refreshes  
✅ **Auto-Fill**: Click the "Use Demo" button on the sign-in page to automatically fill credentials  
✅ **24-Hour Session**: Sessions expire after 24 hours for security  
✅ **Visual Indicators**: See your logged-in status in the navigation bar  
✅ **Easy Logout**: Click "Sign Out" to end your session  
✅ **Protected Routes**: Access all features - Dashboard, Profile, Share, Rent  
✅ **Smart Redirects**: After login, you'll be taken to the page you tried to visit  
✅ **Consistent Auth**: Authentication state works across all pages

## How It Works

### Sign In Process:
1. Navigate to `/signin` or click "Sign In" from the home page
2. Click the "Use Demo" button to auto-fill the credentials
3. Click "Sign In"
4. You'll be redirected to your destination (or home page if you came directly)
5. Your session is saved in localStorage and will persist until:
   - You click "Sign Out"
   - 24 hours have passed
   - You clear your browser data

### Accessing Protected Features:
Once logged in, you can access:
- **Dashboard** (`/dashboard`) - Your personal dashboard
- **Profile** (`/profile`) - View and edit your profile
- **Share** (`/share`) - Share your vehicle
- **Rent** (`/rent`) - Rent vehicles

### Protected Routes:
If you try to access a protected page while logged out:
1. You'll be automatically redirected to the sign-in page
2. After signing in, you'll be taken back to the page you tried to visit
3. No need to navigate again!

## Session Storage

The dummy authentication system stores:
- User information (email, name, ID) in `localStorage` under key `dummyUser`
- Session expiry timestamp under key `sessionExpiry`

This allows the app to remember your login even after closing and reopening the browser.

## Navigation Features

When logged in, the navigation bar shows:
- ✅ Your name ("Demo User") with a green status indicator
- 🔴 "Sign Out" button to log out
- All navigation links remain accessible

When logged out:
- 🔵 "Sign In" button to access authentication
- Public pages (Home, Market, Services) remain accessible
- Protected pages redirect to sign-in

## Testing the Full Experience

1. **Test Session Persistence**:
   - Sign in with dummy credentials
   - Close the browser completely
   - Reopen and visit the site
   - ✅ You'll still be logged in!

2. **Test Protected Routes**:
   - Without signing in, try to visit `/dashboard`
   - ✅ You'll be redirected to sign-in
   - Sign in with dummy credentials
   - ✅ You'll be taken directly to the dashboard!

3. **Test Sign Out**:
   - Click "Sign Out" in the navigation
   - Try to access `/dashboard`
   - ✅ You'll be redirected to sign-in again

## Dummy User Details

- **ID**: `dummy-user-123`
- **Name**: `Demo User`
- **Email**: `demo@keycircle.com`
- **Session Duration**: 24 hours from login

