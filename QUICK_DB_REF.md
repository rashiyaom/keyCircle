# 🎯 QUICK REFERENCE - Database Setup

## ⚡ TL;DR

### What You Got
✅ Direct PostgreSQL connection via `src/lib/db.js`  
✅ Environment variable configured  
✅ Navigation bug fixed  
✅ Complete documentation  

### What You Need To Do
1. Get database password from Supabase Dashboard
2. Create `.env.local` with your password
3. Start using the database!

---

## 🔑 Your Database Connection

### Connection String Template
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.jarhsqdwssbpwjedykfz.supabase.co:5432/postgres
```

### Where to Get Password
Supabase Dashboard → Settings → Database → Database Password

---

## 💻 How to Use

### Import
```javascript
import sql from '@/lib/db'
```

### Query
```javascript
const users = await sql`SELECT * FROM users`
```

### Insert
```javascript
const result = await sql`
  INSERT INTO users (name) VALUES (${name})
  RETURNING *
`
```

### Close Connection (if needed)
```javascript
await sql.end()
```

---

## 🔒 Security Rules

| ✅ DO | ❌ DON'T |
|-------|----------|
| Use in API routes | Use in frontend |
| Store in .env.local | Commit to git |
| Server-side only | Client-side code |
| Keep password secret | Share credentials |

---

## 📁 File Locations

```
src/lib/db.js          → Database connection
.env.local             → Your credentials (create this)
.env.example           → Template (already exists)
DATABASE_SETUP.md      → Full documentation
```

---

## 🎨 Two Tools, Different Jobs

### Supabase Client → Frontend
```typescript
import { supabase } from '@/lib/supabase'
// For: Auth, RLS-protected queries, real-time
```

### Direct SQL → Backend
```javascript
import sql from '@/lib/db'
// For: Admin queries, complex SQL, bulk operations
```

---

## 🚀 Next Steps Checklist

- [ ] Get database password from Supabase
- [ ] Create `.env.local` file
- [ ] Add `DATABASE_URL` with your password
- [ ] Create database tables/schema
- [ ] Build API routes using `db.js`
- [ ] Test connection

---

## 📚 Full Documentation

- **DATABASE_SETUP.md** - Complete guide with examples
- **AUTH_SETUP.md** - Authentication setup
- **DB_COMPLETE.md** - Full implementation summary

---

## 🆘 Troubleshooting

**Can't connect?**
- Check password is correct
- Verify `.env.local` exists
- Restart dev server

**Module error?**
```bash
npm install postgres
```

**Permission denied?**
- Check using correct credentials
- Verify database is active in Supabase

---

## 🎉 You're Ready!

Everything is configured. Just add your password and start building!

**Server running:** http://localhost:8081/  
**Auth page:** http://localhost:8081/auth
