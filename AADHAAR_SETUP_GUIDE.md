# 🔐 Aadhaar eKYC Verification Setup Guide

## 🚀 Quick Start (For Real OTP to Work)

### Step 1: Get Surepass API Access

1. **Visit Surepass Website**
   - Go to: https://surepass.io/
   - Click "Start Free Trial" or "Get API Access"

2. **Sign Up / Login**
   - Create an account with your business email
   - Complete KYB (Know Your Business) verification
   - Provide company details and documents

3. **Get API Token**
   - After approval, go to Dashboard
   - Navigate to: **API Settings** or **Credentials**
   - Copy your **Authorization Token** (looks like: `Bearer eyJhbG...`)

4. **Choose Aadhaar Verification Plan**
   - Surepass offers:
     - **Sandbox/Test Mode**: ₹0 (limited calls, test data)
     - **Production Mode**: Pay per verification (₹2-5 per verification)
   - Enable "Aadhaar OTP Verification v2" service

---

## 📝 Step 2: Add API Token to Your Project

### Update `.env.local` file:

```bash
# Existing Supabase config...
VITE_SUPABASE_URL=https://jarhsqdwssbpwjedykfz.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe config...
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
STRIPE_SECRET_KEY=your_stripe_secret_here

# ADD THIS LINE (Surepass API Token)
VITE_SUREPASS_TOKEN=your_surepass_token_here
```

**Example:**
```bash
VITE_SUREPASS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMzk...
```

---

## 🔄 Step 3: Restart Your Dev Server

```bash
# Stop the current server (Ctrl + C)
# Then restart:
bun run dev
```

The server MUST be restarted for environment variables to load!

---

## ✅ Step 4: Test Aadhaar Verification

### Test Flow:

1. **Go to Signup Page**
   ```
   http://localhost:8080/signup/journey
   ```

2. **Complete Steps 1-2**
   - Enter name, email, phone
   - Choose user type

3. **Aadhaar Verification (Step 3)**
   - Enter a valid Aadhaar number (12 digits)
   - Click "Send OTP"
   - **Real OTP will be sent to Aadhaar-linked mobile number** 📱

4. **Enter OTP**
   - Check the mobile number linked with Aadhaar
   - Enter 6-digit OTP received
   - Click "Verify OTP"

5. **Success!**
   - Aadhaar details fetched and verified
   - Proceed to password creation

---

## 🧪 Testing in Development Mode

### Without API Token (Current State):

The system is in **MOCK MODE**:
- OTP is NOT sent to real mobile
- Any Aadhaar number is accepted (if format is valid)
- Test OTP: **123456** (hardcoded)
- Returns fake data for testing UI

### With API Token:

- **Real OTP sent** to Aadhaar-linked mobile 📱
- Actual Aadhaar details fetched from UIDAI
- Full KYC verification completed

---

## 🏢 Alternative Aadhaar Verification Providers

If Surepass doesn't work, try these alternatives:

### 1. **Digio** (Recommended)
   - Website: https://www.digio.in/
   - Pricing: ₹2-3 per verification
   - Easy integration
   - Good documentation

### 2. **SignDesk**
   - Website: https://signdesk.in/
   - Aadhaar eSign + OTP verification
   - ₹3-5 per verification

### 3. **Karza Technologies**
   - Website: https://karza.in/
   - Enterprise-grade KYC
   - Custom pricing

### 4. **IDfy (Authbridge)**
   - Website: https://idfy.com/
   - Comprehensive KYC suite
   - ₹5-10 per verification

---

## 🔧 Troubleshooting

### Issue: "OTP not received"

**Possible Causes:**
1. ❌ API token not configured → Add `VITE_SUREPASS_TOKEN` to `.env.local`
2. ❌ Server not restarted → Restart dev server
3. ❌ Invalid Aadhaar number → Check format (12 digits)
4. ❌ Mobile number not linked with Aadhaar → Update Aadhaar mobile
5. ❌ API quota exhausted → Check Surepass dashboard
6. ❌ Sandbox mode limits → Upgrade to production

### Issue: "Invalid Aadhaar number"

- Aadhaar must be exactly 12 digits
- Uses Verhoeff algorithm for validation
- Check last digit (checksum)

### Issue: "API Error"

```bash
# Check browser console for detailed error:
# Right-click → Inspect → Console tab
```

Common errors:
- `401 Unauthorized` → Wrong API token
- `403 Forbidden` → Service not enabled in Surepass
- `429 Too Many Requests` → Rate limit exceeded
- `500 Server Error` → Surepass API issue

---

## 📊 Database Setup (Supabase)

### Run this SQL in Supabase:

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

-- Create index for faster lookups
CREATE INDEX idx_aadhaar_verifications_user_id 
ON aadhaar_verifications(user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE aadhaar_verifications ENABLE ROW LEVEL SECURITY;

-- Users can only read their own verification
CREATE POLICY "Users can view own verification"
ON aadhaar_verifications FOR SELECT
USING (auth.uid() = user_id);

-- Service role can insert verifications
CREATE POLICY "Service can insert verifications"
ON aadhaar_verifications FOR INSERT
WITH CHECK (true);
```

---

## 🔒 Security Best Practices

### 1. Never Store Full Aadhaar Number
```typescript
// ✅ GOOD: Store only last 4 digits
aadhaar_last_4: "1234"

// ❌ BAD: Don't store full number
aadhaar_number: "1234 5678 9012"
```

### 2. Encrypt Sensitive Data
- Store Aadhaar data encrypted in Supabase
- Use Supabase's built-in encryption
- Never log full Aadhaar numbers

### 3. Compliance
- Follow UIDAI guidelines
- Get user consent before verification
- Display privacy policy
- Allow users to delete their data

### 4. Rate Limiting
- Limit OTP requests per user (max 3 per hour)
- Implement cooldown between requests
- Prevent abuse

---

## 💰 Pricing Estimate

For 1000 signups/month:
- **Surepass**: ₹2-5 × 1000 = ₹2,000-5,000/month
- **Digio**: ₹2-3 × 1000 = ₹2,000-3,000/month
- **IDfy**: ₹5-10 × 1000 = ₹5,000-10,000/month

**Tip:** Most providers offer:
- Free sandbox for testing
- Volume discounts for bulk
- First 100-500 verifications free

---

## 📞 Support

### Surepass Support:
- Email: support@surepass.io
- Phone: +91-XXXX-XXXXXX
- Documentation: https://docs.surepass.io/

### Need Help?
1. Check Surepass dashboard for API status
2. Review API logs in dashboard
3. Contact Surepass support with error codes
4. Check this project's console logs

---

## ✅ Production Checklist

Before going live:

- [ ] Surepass API token configured
- [ ] Tested with real Aadhaar numbers
- [ ] OTP delivery working
- [ ] Aadhaar data stored securely (last 4 digits only)
- [ ] Database table created in Supabase
- [ ] RLS policies enabled
- [ ] Error handling tested
- [ ] Rate limiting implemented
- [ ] Privacy policy updated
- [ ] User consent flow added
- [ ] UIDAI compliance checked

---

## 🎯 Current Status

**Your Current Setup:**
- ✅ Aadhaar verification UI created
- ✅ Validation logic implemented
- ✅ Mock mode working (test OTP: 123456)
- ⚠️ **API token NOT configured** (OTP won't be sent)
- ⚠️ **Database table NOT created yet**

**To Go Live:**
1. Add `VITE_SUREPASS_TOKEN` to `.env.local`
2. Restart dev server
3. Create database table in Supabase
4. Test with real Aadhaar number
5. Deploy to production

---

## 🚀 Quick Commands

```bash
# Install axios (already done)
bun add axios

# Restart dev server
bun run dev

# Check environment variables loaded
console.log(import.meta.env.VITE_SUREPASS_TOKEN)

# Test in browser console
localStorage.clear() # Clear any cached data
```

---

**Need the API token? → Sign up at https://surepass.io/ today!** 🎉
