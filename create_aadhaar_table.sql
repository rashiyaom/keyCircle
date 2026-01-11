-- ============================================
-- Aadhaar Verification Database Schema
-- ============================================
-- Run this in Supabase SQL Editor
-- Dashboard: https://app.supabase.com/project/jarhsqdwssbpwjedykfz/sql
-- ============================================

-- Step 1: Create aadhaar_verifications table
CREATE TABLE IF NOT EXISTS aadhaar_verifications (
  -- Primary key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- User reference (links to auth.users)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Aadhaar info (NEVER store full Aadhaar number!)
  aadhaar_last_4 TEXT NOT NULL, -- Only last 4 digits for security
  
  -- User details from UIDAI
  full_name TEXT NOT NULL,
  dob DATE, -- Date of birth
  gender TEXT CHECK (gender IN ('M', 'F', 'O')), -- Male, Female, Other
  
  -- Address (stored as JSONB for flexibility)
  address JSONB,
  -- Example structure:
  -- {
  --   "country": "India",
  --   "state": "Karnataka",
  --   "dist": "Bangalore",
  --   "subdist": "Bangalore Urban",
  --   "vtc": "Bangalore",
  --   "po": "Bangalore",
  --   "loc": "Koramangala",
  --   "street": "5th Block",
  --   "house": "123",
  --   "landmark": "Near Park"
  -- }
  
  -- Verification metadata
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  verification_method TEXT DEFAULT 'otp' CHECK (verification_method IN ('otp', 'offline', 'biometric')),
  verification_provider TEXT DEFAULT 'surepass', -- API provider used
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Step 2: Create indexes for performance
-- ============================================

-- Index on user_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_aadhaar_verifications_user_id 
ON aadhaar_verifications(user_id);

-- Index on verified_at for analytics
CREATE INDEX IF NOT EXISTS idx_aadhaar_verifications_verified_at 
ON aadhaar_verifications(verified_at DESC);

-- Index on aadhaar_last_4 for duplicate detection
CREATE INDEX IF NOT EXISTS idx_aadhaar_verifications_last_4 
ON aadhaar_verifications(aadhaar_last_4);

-- ============================================
-- Step 3: Add unique constraint (optional)
-- ============================================

-- Ensure one Aadhaar verification per user
ALTER TABLE aadhaar_verifications 
ADD CONSTRAINT unique_user_aadhaar 
UNIQUE (user_id);

-- ============================================
-- Step 4: Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE aadhaar_verifications ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own verification
CREATE POLICY "Users can view own Aadhaar verification"
ON aadhaar_verifications FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own verification
CREATE POLICY "Users can insert own Aadhaar verification"
ON aadhaar_verifications FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Service role can do everything (for admin/backend)
CREATE POLICY "Service role can manage all Aadhaar verifications"
ON aadhaar_verifications FOR ALL
USING (auth.jwt()->>'role' = 'service_role')
WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- Step 5: Create updated_at trigger
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_aadhaar_verifications_updated_at
BEFORE UPDATE ON aadhaar_verifications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Step 6: Add verification_status to profiles
-- ============================================

-- If you have a profiles table, add Aadhaar verification status
-- Run this ONLY if you have a profiles table:

-- ALTER TABLE profiles 
-- ADD COLUMN IF NOT EXISTS aadhaar_verified BOOLEAN DEFAULT FALSE;

-- ALTER TABLE profiles 
-- ADD COLUMN IF NOT EXISTS aadhaar_verified_at TIMESTAMPTZ;

-- CREATE INDEX IF NOT EXISTS idx_profiles_aadhaar_verified 
-- ON profiles(aadhaar_verified);

-- ============================================
-- Step 7: Create view for easy queries
-- ============================================

-- Create a view that joins user data with Aadhaar verification
CREATE OR REPLACE VIEW user_verifications AS
SELECT 
  u.id as user_id,
  u.email,
  u.created_at as user_created_at,
  av.id as verification_id,
  av.aadhaar_last_4,
  av.full_name,
  av.dob,
  av.gender,
  av.address,
  av.verified_at,
  av.verification_method,
  av.verification_provider
FROM auth.users u
LEFT JOIN aadhaar_verifications av ON u.id = av.user_id;

-- Grant access to the view
GRANT SELECT ON user_verifications TO authenticated;

-- ============================================
-- Step 8: Sample queries for testing
-- ============================================

-- Query 1: Get user's Aadhaar verification
-- SELECT * FROM aadhaar_verifications WHERE user_id = auth.uid();

-- Query 2: Check if user is Aadhaar verified
-- SELECT EXISTS(SELECT 1 FROM aadhaar_verifications WHERE user_id = auth.uid()) as is_verified;

-- Query 3: Get all verifications (admin only)
-- SELECT * FROM aadhaar_verifications ORDER BY verified_at DESC LIMIT 100;

-- Query 4: Count verifications by month
-- SELECT 
--   DATE_TRUNC('month', verified_at) as month,
--   COUNT(*) as verification_count
-- FROM aadhaar_verifications
-- GROUP BY month
-- ORDER BY month DESC;

-- Query 5: Get user verification with email
-- SELECT * FROM user_verifications WHERE user_id = auth.uid();

-- ============================================
-- Step 9: Cleanup (optional - for testing)
-- ============================================

-- Drop table and start fresh (CAREFUL: This deletes ALL data!)
-- DROP TABLE IF EXISTS aadhaar_verifications CASCADE;

-- Drop policies
-- DROP POLICY IF EXISTS "Users can view own Aadhaar verification" ON aadhaar_verifications;
-- DROP POLICY IF EXISTS "Users can insert own Aadhaar verification" ON aadhaar_verifications;
-- DROP POLICY IF EXISTS "Service role can manage all Aadhaar verifications" ON aadhaar_verifications;

-- Drop view
-- DROP VIEW IF EXISTS user_verifications;

-- ============================================
-- ✅ SETUP COMPLETE!
-- ============================================

-- Test the setup with:
-- SELECT * FROM aadhaar_verifications;

-- Verify RLS is enabled:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'aadhaar_verifications';
