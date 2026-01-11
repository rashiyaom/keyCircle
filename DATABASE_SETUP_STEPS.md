# 🎯 STEP-BY-STEP: Create Supabase Tables for Aadhaar Verification

## ⚡ **DO THIS RIGHT NOW (5 minutes)**

---

## **Step 1: Open Supabase SQL Editor**

1. Go to: **https://app.supabase.com/project/jarhsqdwssbpwjedykfz/sql/new**

2. You should see:
   ```
   [ + New query ]  [ Saved queries ]
   ```

---

## **Step 2: Copy the SQL Script**

1. Open the file: `create_aadhaar_table.sql` (in your project root)

2. **Copy EVERYTHING** from the file

   OR copy this shorter version:

```sql
-- Create aadhaar_verifications table
CREATE TABLE IF NOT EXISTS aadhaar_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  aadhaar_last_4 TEXT NOT NULL,
  full_name TEXT NOT NULL,
  dob DATE,
  gender TEXT,
  address JSONB,
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  verification_method TEXT DEFAULT 'otp',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_aadhaar_verifications_user_id 
ON aadhaar_verifications(user_id);

-- Enable RLS
ALTER TABLE aadhaar_verifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own verification
CREATE POLICY "Users can view own verification"
ON aadhaar_verifications FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own verification
CREATE POLICY "Users can insert verification"
ON aadhaar_verifications FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

---

## **Step 3: Paste and Run**

1. **Paste** the SQL into the Supabase SQL Editor

2. Click the **green "RUN"** button (bottom right)

3. You should see:
   ```
   ✅ Success. No rows returned
   ```

---

## **Step 4: Verify Table Created**

1. Click **"Table Editor"** in the left sidebar

2. You should see a new table: **`aadhaar_verifications`**

3. Click on it to see the structure:
   ```
   Columns:
   - id (uuid)
   - user_id (uuid)
   - aadhaar_last_4 (text)
   - full_name (text)
   - dob (date)
   - gender (text)
   - address (jsonb)
   - verified_at (timestamptz)
   - verification_method (text)
   - created_at (timestamptz)
   ```

---

## **Step 5: Check RLS (Row Level Security)**

1. In Table Editor, click on **`aadhaar_verifications`** table

2. Click **"RLS"** tab at the top

3. You should see:
   ```
   🔒 RLS enabled
   
   Policies:
   ✅ Users can view own verification
   ✅ Users can insert verification
   ```

---

## **✅ DONE! Your database is ready!**

---

## **🧪 Optional: Test the Table**

### Test Query 1: Check if table exists

```sql
SELECT * FROM aadhaar_verifications;
```

Expected result: Empty table (no rows yet)

### Test Query 2: Insert test data

```sql
INSERT INTO aadhaar_verifications (
  user_id,
  aadhaar_last_4,
  full_name,
  dob,
  gender,
  address
) VALUES (
  auth.uid(),
  '1234',
  'Test User',
  '1990-01-01',
  'M',
  '{"state": "Karnataka", "city": "Bangalore"}'::jsonb
);
```

### Test Query 3: Retrieve data

```sql
SELECT * FROM aadhaar_verifications WHERE user_id = auth.uid();
```

---

## **📊 What Each Column Stores**

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | UUID | Unique verification ID | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | Link to auth.users | (from Supabase Auth) |
| `aadhaar_last_4` | TEXT | Last 4 digits of Aadhaar | `"1234"` |
| `full_name` | TEXT | Name from UIDAI | `"John Doe"` |
| `dob` | DATE | Date of birth | `1990-01-01` |
| `gender` | TEXT | Gender | `"M"` or `"F"` |
| `address` | JSONB | Full address object | `{"state": "Karnataka", ...}` |
| `verified_at` | TIMESTAMP | When verified | `2026-01-11 19:30:00+00` |
| `verification_method` | TEXT | How verified | `"otp"` |
| `created_at` | TIMESTAMP | Record created | `2026-01-11 19:30:00+00` |

---

## **🔒 Security Features**

### ✅ What's Secure:

1. **No Full Aadhaar Stored**
   - Only last 4 digits saved
   - Complies with UIDAI guidelines

2. **Row Level Security (RLS)**
   - Users can only see their OWN verification
   - No user can see other users' data

3. **Foreign Key Constraint**
   - Automatically deletes verification if user is deleted
   - Data consistency maintained

4. **Index for Performance**
   - Fast lookups by user_id
   - Scales to millions of records

---

## **🚨 Common Errors & Fixes**

### Error: "permission denied for schema public"

**Fix:** You need to be the project owner. Check your role:

```sql
SELECT current_user, session_user;
```

### Error: "relation auth.users does not exist"

**Fix:** Supabase Auth is not enabled. Go to:
- Dashboard → Authentication → Enable it

### Error: "RLS enabled but no policies"

**Fix:** Run the policy creation SQL again:

```sql
CREATE POLICY "Users can view own verification"
ON aadhaar_verifications FOR SELECT
USING (auth.uid() = user_id);
```

---

## **📈 View Your Data**

### In Table Editor:

1. Go to: **Table Editor** → **aadhaar_verifications**
2. See all verifications in a spreadsheet view
3. Filter, sort, and search

### Using SQL:

```sql
-- Get all verifications (last 100)
SELECT * FROM aadhaar_verifications 
ORDER BY verified_at DESC 
LIMIT 100;

-- Count total verifications
SELECT COUNT(*) FROM aadhaar_verifications;

-- Verifications by gender
SELECT gender, COUNT(*) 
FROM aadhaar_verifications 
GROUP BY gender;

-- Recent verifications (last 24 hours)
SELECT * FROM aadhaar_verifications 
WHERE verified_at > NOW() - INTERVAL '24 hours';
```

---

## **🔄 Update Table (If Needed Later)**

### Add a new column:

```sql
ALTER TABLE aadhaar_verifications 
ADD COLUMN profile_image TEXT;
```

### Modify a column:

```sql
ALTER TABLE aadhaar_verifications 
ALTER COLUMN gender TYPE VARCHAR(10);
```

### Add a constraint:

```sql
ALTER TABLE aadhaar_verifications 
ADD CONSTRAINT check_gender 
CHECK (gender IN ('M', 'F', 'O'));
```

---

## **🗑️ Delete Table (Careful!)**

Only if you want to start fresh:

```sql
DROP TABLE IF EXISTS aadhaar_verifications CASCADE;
```

⚠️ **Warning:** This deletes ALL data permanently!

---

## **✅ Final Checklist**

Before going to production:

- [ ] Table created in Supabase
- [ ] RLS enabled
- [ ] Policies created (SELECT, INSERT)
- [ ] Index created on user_id
- [ ] Tested with sample data
- [ ] Verified users can only see their own data

---

## **🎉 You're All Set!**

Your database is now ready to store Aadhaar verifications!

**Next steps:**
1. ✅ Database setup complete
2. 🧪 Test signup flow with mock OTP (123456)
3. 🔑 Add Surepass token for real OTP (optional)
4. 🚀 Deploy to production

---

## **Need Help?**

- **Supabase Docs**: https://supabase.com/docs/guides/database
- **SQL Editor**: https://app.supabase.com/project/jarhsqdwssbpwjedykfz/sql
- **Table Editor**: https://app.supabase.com/project/jarhsqdwssbpwjedykfz/editor

**Quick Links:**
- Create Table SQL: `create_aadhaar_table.sql`
- Setup Guide: `AADHAAR_SETUP_GUIDE.md`
- Quick Start: `AADHAAR_QUICK_START.md`
