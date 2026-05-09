# Frontend - KeyCircle

React + TypeScript + Vite frontend for the KeyCircle vehicle rental marketplace.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/              # Page components (routed pages)
│   ├── components/         # Reusable UI components
│   │   └── ui/            # Shadcn/ui components
│   ├── contexts/          # React Context (auth, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and helpers
│   ├── assets/            # Images and static files
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # Entry point
│   └── index.css           # Global styles
├── public/                # Static files
├── dist/                  # Build output
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.js
└── index.html
```

## Key Features

- 🔐 **Authentication** - Sign in/up with email and Google OAuth
- 👤 **Profile Management** - Comprehensive user profiles with validation
- 📅 **Booking System** - Multi-step booking flow
- 🏍️ **Vehicle Marketplace** - Browse and filter vehicles
- ✅ **Verification** - Aadhaar and document verification support
- 📊 **Dashboard** - User statistics and rental history
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- ⚡ **Performance** - Built with Vite for fast development and production

## Technologies

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite 7.3.1** - Build tool
- **Tailwind CSS 3.4.17** - Styling
- **Shadcn/ui** - UI component library
- **React Router v6** - Client-side routing
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Framer Motion** - Animations
- **TanStack Query** - Server state management
- **Supabase** - Backend (optional integration)

## Key Pages

| Path | Component | Protected | Purpose |
|------|-----------|-----------|---------|
| `/` | Index | No | Landing page |
| `/signin` | SignIn | No | User login |
| `/signup/journey` | SignUpJourney | No | Multi-step registration |
| `/auth` | Auth | No | Auth options page |
| `/marketplace` | Marketplace | No | Browse vehicles |
| `/services` | Services | No | Services info |
| `/dashboard` | Dashboard | Yes | User dashboard |
| `/profile` | ProfileEnhanced | Yes | Profile management |
| `/share` | Share | Yes | List a vehicle |
| `/rent` | Rent | Yes | Rental form |

## Authentication

### Auth Context (`src/contexts/AuthContext.tsx`)

Provides global authentication state:

```typescript
const { user, isAuthenticated, login, signup, logout } = useAuth();
```

- **user**: Current user object `{ id, email, name }`
- **isAuthenticated**: Boolean flag
- **login(email, password)**: Sign in with credentials
- **signup(email, name)**: Create new account
- **logout()**: Sign out

### Session Persistence

- Sessions stored in localStorage
- 24-hour expiry time
- Automatic restoration on page reload

## Protected Routes

The `ProtectedRoute` component guards pages that require authentication:

```tsx
<Route path="/profile" element={<ProtectedRoute><ProfileEnhanced /></ProtectedRoute>} />
```

Unauthenticated users are redirected to `/signin`.

## Form Validation

Uses **React Hook Form** + **Zod** for type-safe validation:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

## API Integration

Currently uses mock data and localStorage. To integrate with backend:

1. Create API client in `src/lib/api.ts`
2. Use Axios for HTTP requests
3. Use React Query for caching and state management

Example:

```typescript
// src/lib/api.ts
export const fetchVehicles = async () => {
  const { data } = await axios.get('/api/vehicles');
  return data;
};

// In component
import { useQuery } from '@tanstack/react-query';
const { data: vehicles } = useQuery({
  queryKey: ['vehicles'],
  queryFn: fetchVehicles,
});
```

## Environment Variables

Create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUREPASS_TOKEN=your_surepass_token
```

## Development Tips

### Fast Refresh
Vite provides instant HMR (Hot Module Replacement) - changes appear instantly without full page reload.

### Debugging
- Use React DevTools browser extension
- Console logs appear in browser dev tools and terminal

### Component Library
Browse Shadcn/ui components at `src/components/ui/` - copy and customize as needed.

### Styling
- Use Tailwind CSS utility classes
- Define custom colors in `tailwind.config.ts`
- Global styles in `src/index.css`

## Building for Production

```bash
npm run build    # Creates optimized build in dist/
npm run preview  # Preview build locally
```

## Deployment

The `dist/` folder is ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Performance

- Code splitting via Vite
- Lazy-loaded route components
- Optimized images with Shadcn UI
- Minified production build
- Gzip compression enabled

## Testing

[To be implemented - add test setup]

## Troubleshooting

### Port 8080 already in use
```bash
npm run dev -- --port 3000
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
npm run build  # Check terminal for errors
```

## Next Steps

1. **Implement Backend API** - Create Node.js/Express server
2. **Replace Mock Data** - Connect to real API endpoints
3. **Add Tests** - Unit and integration tests
4. **Setup CI/CD** - Automate builds and deployments
5. **Performance Optimization** - Use profiling tools
6. **Analytics** - Add user tracking

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [TanStack Query](https://tanstack.com/query/latest)

## Support

For frontend-specific issues, check the main README.md or create an issue.
