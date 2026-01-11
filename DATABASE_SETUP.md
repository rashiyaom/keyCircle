# 🗄️ Database Configuration Guide

## Overview
Your application now supports **direct PostgreSQL database connection** using the `postgres` package alongside Supabase Auth. This gives you flexibility to use both Supabase's authentication features and direct database queries.

## What Was Added

### 1. Database Connection File
**Location:** `src/lib/db.js`

```javascript
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

export default sql
```

This creates a connection pool to your Supabase PostgreSQL database.

### 2. Package Installation
- ✅ Installed `postgres` package (v3.4.5+)
- Lightweight, fast SQL client for Node.js
- Works with Supabase PostgreSQL

### 3. Environment Variable
Updated `.env.example` to include:
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.jarhsqdwssbpwjedykfz.supabase.co:5432/postgres
```

## 🚀 Setup Instructions

### Step 1: Get Your Database Password
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Find your database password (or reset if needed)

### Step 2: Configure Environment
1. Create/update your `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

2. Add your actual database password:
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.jarhsqdwssbpwjedykfz.supabase.co:5432/postgres
   ```

3. Replace `YOUR_ACTUAL_PASSWORD` with your real password

### Step 3: Test Connection (Optional)
Create a test file to verify the connection:

```javascript
// test-db.js
import sql from './src/lib/db.js'

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`
    console.log('✅ Database connected:', result)
  } catch (error) {
    console.error('❌ Connection failed:', error)
  } finally {
    await sql.end()
  }
}

testConnection()
```

Run: `node test-db.js`

## 📊 Usage Examples

### Basic Query
```javascript
import sql from '@/lib/db'

// Select all users
const users = await sql`
  SELECT * FROM users
  WHERE active = true
`
```

### Insert Data
```javascript
const newUser = await sql`
  INSERT INTO users (name, email)
  VALUES (${name}, ${email})
  RETURNING *
`
```

### Transaction
```javascript
const result = await sql.begin(async sql => {
  const user = await sql`INSERT INTO users...`
  const profile = await sql`INSERT INTO profiles...`
  return { user, profile }
})
```

### With Parameters
```javascript
const userId = 123
const user = await sql`
  SELECT * FROM users 
  WHERE id = ${userId}
`
```

## 🏗️ Architecture

### Two Connection Methods

#### 1. Supabase Client (Frontend)
**File:** `src/lib/supabase.ts`
- For authentication
- Client-side operations
- Row Level Security (RLS) enabled
- Uses `@supabase/supabase-js`

```typescript
import { supabase } from '@/lib/supabase'

// Auth operations
await supabase.auth.signUp({...})
await supabase.auth.signIn({...})

// Client-side queries (respects RLS)
const { data } = await supabase
  .from('users')
  .select('*')
```

#### 2. Direct PostgreSQL (Backend/Server)
**File:** `src/lib/db.js`
- For server-side operations
- Direct SQL queries
- Bypasses RLS (admin access)
- Uses `postgres` package

```javascript
import sql from '@/lib/db'

// Direct SQL (server-side only)
const users = await sql`SELECT * FROM users`
```

## ⚠️ Important Security Notes

### 1. Environment Variables
- ✅ **DO:** Store `DATABASE_URL` in `.env.local`
- ❌ **DON'T:** Commit `.env.local` to git
- ✅ **DO:** Use `.env.example` as template only

### 2. Server-Side Only
The direct database connection (`db.js`) should **ONLY** be used in:
- API routes
- Server-side functions
- Backend services

**Never** expose direct database access to the frontend!

### 3. Row Level Security
- Direct SQL bypasses Supabase RLS
- Use Supabase client for user-facing queries
- Use direct SQL only for admin operations

## 🛠️ When to Use Which?

### Use Supabase Client When:
- ✅ Frontend/client-side code
- ✅ User authentication
- ✅ Need RLS protection
- ✅ Real-time subscriptions
- ✅ Storage/file uploads

### Use Direct SQL When:
- ✅ Backend/API routes
- ✅ Admin operations
- ✅ Complex queries
- ✅ Bulk operations
- ✅ Migrations/seeds

## 📁 File Structure

```
src/
  lib/
    supabase.ts      # Supabase client (frontend)
    db.js            # Direct PostgreSQL (backend)
.env.local           # Your actual credentials (git ignored)
.env.example         # Template (committed to git)
```

## 🔧 Configuration Reference

### Full .env.local Example
```env
# Supabase Auth (Frontend)
VITE_SUPABASE_URL=https://jarhsqdwssbpwjedykfz.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Direct Database (Backend)
DATABASE_URL=postgresql://postgres:your-password@db.jarhsqdwssbpwjedykfz.supabase.co:5432/postgres
```

### Connection String Format
```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]

USER:     postgres (default)
PASSWORD: Your database password
HOST:     db.jarhsqdwssbpwjedykfz.supabase.co
PORT:     5432 (default PostgreSQL)
DATABASE: postgres (default)
```

## 🎯 Next Steps

### 1. Create Database Schema
```sql
-- Example: Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);
```

### 2. Build API Routes
Create server-side endpoints that use `db.js`:
```javascript
// api/users.js
import sql from '@/lib/db'

export async function getUsers() {
  return await sql`SELECT * FROM users`
}
```

### 3. Integrate with Auth
Combine Supabase Auth with direct DB queries:
```javascript
// After user signs up via Supabase
const { user } = await supabase.auth.signUp({...})

// Store additional data via direct SQL
await sql`
  INSERT INTO user_profiles (user_id, bio)
  VALUES (${user.id}, ${bio})
`
```

## 🐛 Troubleshooting

### Connection Fails
1. Check password is correct
2. Verify database URL format
3. Ensure `.env.local` is loaded
4. Check Supabase database is active

### Permission Denied
1. Verify using correct user (postgres)
2. Check database permissions
3. Ensure RLS policies if using Supabase client

### Module Not Found
```bash
# Reinstall postgres package
npm install postgres
```

## 📚 Resources

- [postgres.js Documentation](https://github.com/porsager/postgres)
- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## ✅ Status

**Database Setup Complete!**

You now have:
- ✅ Direct PostgreSQL connection configured
- ✅ Supabase client for auth
- ✅ Environment variables documented
- ✅ Both connection methods ready to use

Ready to build your data layer! 🚀
