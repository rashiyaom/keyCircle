# 🚀 QUICK START: Aadhaar Verification Testing

## ✅ **WORKS RIGHT NOW (No Setup Needed)**

Your Aadhaar verification is in **MOCK MODE** - perfect for testing!

### **Test Flow:**

```bash
1. Go to: http://localhost:8080/signup/journey

2. Complete Step 1 (Identity):
   - Name: John Doe
   - Email: test@example.com
   - Phone: +91 98765 43210

3. Complete Step 2 (User Type):
   - Select: Student / Bike Owner

4. Step 3 (Aadhaar Verification):
   - Enter any valid Aadhaar: 1234 5678 9012
   - Click "Send OTP"
   - See message: "OTP sent successfully"
   
5. Enter Test OTP: 123456
   - Click "Verify OTP"
   - Success! ✅
   
6. Complete Step 4 (Security):
   - Set password
   - Done!
```

---

## 🔑 **Mock Mode Details**

### What Works:
✅ Aadhaar format validation (12 digits + checksum)
✅ UI flow (send OTP → enter OTP → verify)
✅ Success/error messages
✅ Auto-fill name from verification
✅ Hardcoded test OTP: **123456**

### What Doesn't Work:
❌ Real OTP sent to mobile (mock response instead)
❌ Actual UIDAI data fetching
❌ Real phone number verification

### Mock Data Returned:
```json
{
  "full_name": "Test User",
  "aadhaar_number": "XXXX XXXX 1234",
  "dob": "01-01-1990",
  "gender": "M",
  "address": {
    "state": "Test State",
    "dist": "Test District"
  }
}
```

---

## 📱 **To Enable REAL OTP (Production)**

### 1. Get Surepass API Token

**Sign up here:** https://surepass.io/

**Steps:**
1. Create account (business email)
2. Complete KYB verification
3. Enable "Aadhaar OTP v2" service
4. Copy your Authorization Token

**Cost:** ₹2-5 per verification (free sandbox available)

### 2. Add Token to `.env.local`

Open `.env.local` and add:

```bash
# Existing config...
VITE_SUPABASE_URL=https://jarhsqdwssbpwjedykfz.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here

# ADD THIS LINE:
VITE_SUREPASS_TOKEN=your_surepass_token_here
```

### 3. Restart Dev Server

```bash
# Stop server (Ctrl + C)
bun run dev
```

### 4. Test with Real Aadhaar

Now:
- Enter YOUR real Aadhaar number
- **Real OTP sent to your Aadhaar-linked mobile** 📱
- Enter the OTP you receive via SMS
- Real data fetched from UIDAI

---

## 🧪 **Valid Test Aadhaar Numbers (Mock Mode)**

These are format-valid Aadhaar numbers for testing (not real):

```
✅ 1234 5678 9012
✅ 2345 6789 0123
✅ 3456 7890 1234
✅ 4567 8901 2345
```

All will:
- Pass format validation
- Show "OTP sent" message
- Accept test OTP: `123456`

---

## ❌ **Invalid Aadhaar Examples**

These will show validation errors:

```
❌ 123456 (too short)
❌ 12345678901234 (too long)
❌ abcd efgh ijkl (letters not allowed)
❌ 1234 5678 9013 (invalid checksum)
```

---

## 🔍 **How to Check Mode**

Open browser console (F12) when sending OTP:

### Mock Mode:
```
⚠️ Surepass API token not configured. Using mock mode.
```

### Real Mode:
```
✅ Calling Surepass API...
📱 OTP sent to mobile: XXXXXX1234
```

---

## 🎯 **Next Steps**

### For Development (Now):
1. ✅ Test signup flow with mock OTP
2. ✅ Build other features
3. ✅ Test UI/UX
4. ✅ Demo to stakeholders

### For Production (Before Launch):
1. 📝 Sign up for Surepass
2. 🔑 Add API token
3. 🧪 Test with real Aadhaar
4. 💾 Create database table (see AADHAAR_SETUP_GUIDE.md)
5. 🚀 Deploy

---

## 💡 **Pro Tips**

### Tip 1: Check Console Logs
```javascript
// In browser console (F12):
localStorage.clear() // Clear any cached data
console.log(import.meta.env.VITE_SUREPASS_TOKEN) // Check if token loaded
```

### Tip 2: Skip Aadhaar (Optional)
If you want to make Aadhaar optional:

```typescript
// In SignUpJourney.tsx, add a "Skip" button:
<Button variant="outline" onClick={() => setCurrentLevel(4)}>
  Skip Aadhaar Verification
</Button>
```

### Tip 3: Test Error Cases
```
1. Enter invalid Aadhaar → See validation error
2. Enter valid Aadhaar → Send OTP
3. Enter wrong OTP (not 123456) → See error message
4. Enter correct OTP (123456) → Success!
```

---

## 🆘 **Troubleshooting**

### Issue: "Invalid Aadhaar number"
**Solution:** Use valid format (12 digits). Try: `1234 5678 9012`

### Issue: "Invalid OTP"
**Solution:** In mock mode, use: `123456`

### Issue: "OTP not sent"
**Solution:** This is EXPECTED in mock mode. Real OTP requires API token.

### Issue: Can't proceed after OTP
**Solution:** Check browser console (F12) for errors

---

## ✅ **Current Status**

```
✅ Aadhaar UI: Working
✅ Validation: Working
✅ Mock OTP: Working (use 123456)
⚠️ Real OTP: Not configured (need API token)
⚠️ Database: Not created (see AADHAAR_SETUP_GUIDE.md)
```

---

## 📚 **Documentation**

- **Full Setup Guide**: `AADHAAR_SETUP_GUIDE.md`
- **SQL Scripts**: `create_aadhaar_table.sql`
- **Supabase Docs**: https://supabase.com/docs

---

**🎉 Your system is ready for testing! Use OTP: 123456**
