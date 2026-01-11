-- ================================================
-- SUPABASE SQL SETUP FOR AADHAAR eKYC VERIFICATION
-- ================================================
-- Run this script in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste & Run
-- ================================================

-- Step 1: Create eKYC Verifications Table
-- ================================================
CREATE TABLE IF NOT EXISTS public.ekyc_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Security: Store only last 4 digits of Aadhaar
  aadhaar_last_4 TEXT NOT NULL CHECK (length(aadhaar_last_4) = 4),
  
  -- Verification status tracking
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed', 'expired')),
  verification_provider TEXT, -- surepass, signzy, digilocker, etc.
  verification_data JSONB, -- Encrypted verification response (name, DOB, address)
  
  -- Timestamps
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Audit fields
  ip_address INET,
  user_agent TEXT
);

-- Step 2: Create Indexes for Performance
-- ================================================
CREATE INDEX IF NOT EXISTS idx_ekyc_user_id 
  ON public.ekyc_verifications(user_id);

CREATE INDEX IF NOT EXISTS idx_ekyc_status 
  ON public.ekyc_verifications(verification_status);

CREATE INDEX IF NOT EXISTS idx_ekyc_created_at 
  ON public.ekyc_verifications(created_at DESC);

-- Step 3: Enable Row Level Security (RLS)
-- ================================================
ALTER TABLE public.ekyc_verifications ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS Policies
-- ================================================

-- Users can view their own verification records
CREATE POLICY "Users can view their own eKYC verification"
  ON public.ekyc_verifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own verification records
CREATE POLICY "Users can insert their own eKYC verification"
  ON public.ekyc_verifications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own verification records
CREATE POLICY "Users can update their own eKYC verification"
  ON public.ekyc_verifications
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Step 5: Create Profiles Table (if not exists)
-- ================================================
-- Skip this step if you already have a profiles table

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  user_type TEXT CHECK (user_type IN ('student', 'general')),
  avatar_url TEXT,
  
  -- KYC fields
  kyc_verified BOOLEAN DEFAULT FALSE,
  kyc_verified_at TIMESTAMPTZ,
  aadhaar_last_4 TEXT CHECK (length(aadhaar_last_4) = 4),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Step 6: Create Function to Auto-Update Profile on eKYC Verification
-- ================================================

CREATE OR REPLACE FUNCTION public.update_profile_on_kyc_verification()
RETURNS TRIGGER AS $$
BEGIN
  -- When eKYC verification status changes to 'verified'
  IF NEW.verification_status = 'verified' AND OLD.verification_status != 'verified' THEN
    UPDATE public.profiles
    SET 
      kyc_verified = TRUE,
      kyc_verified_at = NOW(),
      aadhaar_last_4 = NEW.aadhaar_last_4,
      updated_at = NOW()
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 7: Create Trigger for Auto-Update
-- ================================================

DROP TRIGGER IF EXISTS trigger_update_profile_on_kyc_verification ON public.ekyc_verifications;

CREATE TRIGGER trigger_update_profile_on_kyc_verification
  AFTER UPDATE ON public.ekyc_verifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_profile_on_kyc_verification();

-- Step 8: Create Function to Auto-Create Profile on Signup
-- ================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    phone, 
    user_type,
    kyc_verified,
    aadhaar_last_4
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'user_type',
    COALESCE((NEW.raw_user_meta_data->>'aadhaar_verified')::boolean, FALSE),
    NEW.raw_user_meta_data->>'aadhaar_last_4'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 9: Create Trigger for Auto-Create Profile
-- ================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 10: Create Function to Get User KYC Status
-- ================================================

CREATE OR REPLACE FUNCTION public.get_user_kyc_status(user_id_param UUID)
RETURNS TABLE (
  is_verified BOOLEAN,
  verified_at TIMESTAMPTZ,
  aadhaar_last_4 TEXT,
  verification_provider TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.kyc_verified,
    p.kyc_verified_at,
    p.aadhaar_last_4,
    e.verification_provider
  FROM public.profiles p
  LEFT JOIN public.ekyc_verifications e ON e.user_id = p.id
  WHERE p.id = user_id_param
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 11: Grant Necessary Permissions
-- ================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.ekyc_verifications TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT SELECT ON public.ekyc_verifications TO anon;
GRANT SELECT ON public.profiles TO anon;

-- ================================================
-- VERIFICATION & TESTING QUERIES
-- ================================================

-- Check if tables were created successfully
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('ekyc_verifications', 'profiles');

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('ekyc_verifications', 'profiles');

-- Check triggers
SELECT trigger_name, event_manipulation, event_object_table, action_statement
FROM information_schema.triggers
WHERE event_object_table IN ('ekyc_verifications', 'users');

-- ================================================
-- SAMPLE QUERIES FOR TESTING
-- ================================================

-- Get all eKYC verifications for current user
SELECT * FROM public.ekyc_verifications WHERE user_id = auth.uid();

-- Get current user's KYC status
SELECT * FROM public.get_user_kyc_status(auth.uid());

-- Count verified users
SELECT COUNT(*) as verified_users 
FROM public.profiles 
WHERE kyc_verified = TRUE;

-- Get recent verifications
SELECT 
  p.full_name,
  p.email,
  e.verification_status,
  e.verified_at,
  e.verification_provider
FROM public.ekyc_verifications e
JOIN public.profiles p ON p.id = e.user_id
ORDER BY e.created_at DESC
LIMIT 10;

-- ================================================
-- CLEANUP (ONLY IF YOU WANT TO START OVER)
-- ================================================
-- WARNING: This will delete all data!
-- Uncomment only if you need to reset everything

-- DROP TRIGGER IF EXISTS trigger_update_profile_on_kyc_verification ON public.ekyc_verifications;
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- DROP FUNCTION IF EXISTS public.update_profile_on_kyc_verification();
-- DROP FUNCTION IF EXISTS public.handle_new_user();
-- DROP FUNCTION IF EXISTS public.get_user_kyc_status(UUID);
-- DROP TABLE IF EXISTS public.ekyc_verifications CASCADE;
-- DROP TABLE IF EXISTS public.profiles CASCADE;

-- ================================================
-- SUCCESS! ✅
-- ================================================
-- Your Aadhaar eKYC verification database is now ready!
-- 
-- Next steps:
-- 1. Add Surepass credentials to .env.local
-- 2. Test the signup flow
-- 3. Monitor the ekyc_verifications table
--
-- Documentation: Check AADHAAR_EKYC_SETUP.md
-- ================================================
