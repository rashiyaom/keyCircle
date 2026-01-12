import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, KeyRound, User, Mail, Phone, Lock, Check, Backpack, MapPin, Shield, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { 
  initiateAadhaarOTP, 
  verifyAadhaarOTP, 
  validateAadhaarNumber, 
  formatAadhaarNumber,
  maskAadhaarNumber,
  getAadhaarLast4,
  isVerificationAvailable
} from "@/lib/aadhaarVerification";

// Animated background particles
const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-accent/30 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          y: [null, Math.random() * window.innerHeight],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

type UserType = "student" | "general" | null;

interface SignUpData {
  userType: UserType;
  fullName: string;
  email: string;
  phone: string;
  aadhaarNumber: string;
  aadhaarVerified: boolean;
  aadhaarClientId: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

const SignUpJourney = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    userType: null,
    fullName: "",
    email: "",
    phone: "",
    aadhaarNumber: "",
    aadhaarVerified: false,
    aadhaarClientId: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [currentField, setCurrentField] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  
  // Aadhaar verification states
  const [aadhaarOTP, setAadhaarOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return "Phone number is required";
    // Remove spaces and special characters for validation
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    if (!/^[\+]?[0-9]{10,15}$/.test(cleanPhone)) {
      return "Please enter a valid phone number (10-15 digits)";
    }
    return "";
  };

  // Password strength calculator
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(signUpData.password);

  // Aadhaar verification handlers
  const handleSendOTP = async () => {
    setError("");
    
    if (!signUpData.aadhaarNumber) {
      setError("Please enter your Aadhaar number");
      return;
    }
    
    if (!validateAadhaarNumber(signUpData.aadhaarNumber)) {
      setError("Invalid Aadhaar number. Please check and try again.");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const response = await initiateAadhaarOTP(signUpData.aadhaarNumber);
      
      if (response.success && response.data) {
        setOtpSent(true);
        setSignUpData({
          ...signUpData,
          aadhaarClientId: response.data.client_id,
        });
        setError("");
      } else {
        setError(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    
    if (!aadhaarOTP || aadhaarOTP.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const response = await verifyAadhaarOTP(signUpData.aadhaarClientId, aadhaarOTP);
      
      if (response.success) {
        setVerificationSuccess(true);
        setSignUpData({
          ...signUpData,
          aadhaarVerified: true,
        });
        
        // Move to next level after 1.5 seconds
        setTimeout(() => {
          setCurrentLevel(3); // Move to password level
        }, 1500);
      } else {
        setError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Aadhaar verification is now MANDATORY - no skip option

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

      // OAuth redirect will happen automatically
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to sign in with Google";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  // Handle sign up submission
  const handleSignUp = async () => {
    setError("");
    
    // Validate all fields
    const nameError = validateName(signUpData.fullName);
    const emailError = validateEmail(signUpData.email);
    const phoneError = validatePhone(signUpData.phone);
    
    if (nameError || emailError || phoneError) {
      setFieldErrors({
        fullName: nameError,
        email: emailError,
        phone: phoneError,
      });
      setError("Please fix the errors in the form");
      return;
    }
    
    if (!signUpData.password) {
      setError("Password is required");
      return;
    }
    
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (passwordStrength < 2) {
      setError("Please create a stronger password (minimum 8 characters, mix of letters and numbers)");
      return;
    }
    
    if (!signUpData.agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        setError("Supabase is not configured. Please check your environment variables.");
        setIsLoading(false);
        return;
      }

      // Create user with Supabase Auth - email verification will be sent automatically
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: signUpData.fullName,
            phone: signUpData.phone,
            user_type: signUpData.userType,
            verification_status: "pending",
            aadhaar_verified: signUpData.aadhaarVerified,
            aadhaar_last_4: signUpData.aadhaarVerified ? getAadhaarLast4(signUpData.aadhaarNumber) : null,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Check if email confirmation is required
        if (authData.user.identities && authData.user.identities.length === 0) {
          setError("This email is already registered. Please sign in instead.");
          setIsLoading(false);
          return;
        }

        // Success! Show confirmation message
        setCurrentLevel(5);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Screens
  const screens = [
    // Screen 0: Welcome
    <motion.div
      key="welcome"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center space-y-8"
    >
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center backdrop-blur-sm border-2 border-accent/30 shadow-xl">
          <KeyRound className="w-16 h-16 text-accent drop-shadow-lg" />
        </div>
      </motion.div>

      <div className="space-y-4">
        <p className="text-sm text-accent font-semibold uppercase tracking-wider">Level 1 of 4</p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
          Welcome to<br />keyCircle
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Your trusted vehicle sharing platform with secure Aadhaar verification. Create your account to unlock the journey.
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        {/* Google Sign-In Button */}
        <motion.button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-border hover:border-accent rounded-2xl font-body font-semibold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-foreground group-hover:text-accent transition-colors">
            {isLoading ? "Connecting..." : "Continue with Google"}
          </span>
        </motion.button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-muted-foreground font-body">or</span>
          </div>
        </div>

        {/* Email Sign-Up Button */}
        <motion.button
          onClick={() => setCurrentLevel(1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative w-full px-12 py-4 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground rounded-2xl font-body font-semibold text-lg shadow-2xl hover:shadow-accent/50 transition-all duration-300"
        >
          <span className="flex items-center justify-center gap-3">
            <Mail className="w-6 h-6" />
            Sign Up with Email
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </span>
        </motion.button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-sm text-red-700 font-body max-w-md"
        >
          {error}
        </motion.div>
      )}

      <button
        onClick={() => navigate('/signin')}
        className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
      >
        Already have access? <span className="text-accent font-semibold hover:underline">Sign In</span>
      </button>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mt-12">
        <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
        <div className="w-3 h-3 rounded-full bg-border" />
        <div className="w-3 h-3 rounded-full bg-border" />
        <div className="w-3 h-3 rounded-full bg-border" />
      </div>
    </motion.div>,

    // Level 1: Choose User Type
    <motion.div
      key="usertype"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-8"
    >
      <div className="text-center space-y-3">
        <p className="text-sm text-accent font-semibold uppercase tracking-wider">Level 1 of 4</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Choose Your Path</h2>
        <p className="text-muted-foreground text-lg">Select the option that best describes you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Student Card */}
        <motion.button
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSignUpData({ ...signUpData, userType: "student" });
            setCurrentLevel(2);
          }}
          className="group relative p-8 rounded-3xl bg-gradient-to-br from-white to-stone-50 border-2 border-border hover:border-accent transition-all shadow-xl hover:shadow-2xl hover:shadow-accent/10 text-left overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.02)_25%,rgba(0,0,0,.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,.02)_75%,rgba(0,0,0,.02))] bg-[length:16px_16px] opacity-50" />
          
          <div className="relative space-y-6">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Backpack className="w-8 h-8 text-accent" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-border group-hover:border-accent transition-colors flex items-center justify-center">
                {signUpData.userType === "student" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-accent"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-semibold text-foreground">Student</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Access affordable rides and exclusive student discounts for your daily commute
              </p>
            </div>
          </div>
        </motion.button>

        {/* General User Card */}
        <motion.button
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSignUpData({ ...signUpData, userType: "general" });
            setCurrentLevel(2);
          }}
          className="group relative p-8 rounded-3xl bg-gradient-to-br from-white to-stone-50 border-2 border-border hover:border-accent transition-all shadow-xl hover:shadow-2xl hover:shadow-accent/10 text-left overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.02)_25%,rgba(0,0,0,.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,.02)_75%,rgba(0,0,0,.02))] bg-[length:16px_16px] opacity-50" />
          
          <div className="relative space-y-6">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-border group-hover:border-accent transition-colors flex items-center justify-center">
                {signUpData.userType === "general" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-accent"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-semibold text-foreground">General User</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Flexible vehicle sharing for work, leisure, or any destination you choose
              </p>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-8">
        <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
        <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
        <div className="w-3 h-3 rounded-full bg-border" />
        <div className="w-3 h-3 rounded-full bg-border" />
      </div>
    </motion.div>,

    // Level 2: Identity (Name, Email, Phone - one by one)
    <motion.div
      key="identity"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-8"
    >
      <div className="text-center space-y-3">
        <p className="text-sm text-accent font-semibold uppercase tracking-wider">Level 2 of 4</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Create Your Identity</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      <AnimatePresence mode="wait">
        {currentField === 0 && (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-muted-foreground mb-3 font-body">What should we call you?</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={signUpData.fullName}
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, fullName: e.target.value });
                    setFieldErrors({ ...fieldErrors, fullName: "" });
                  }}
                  onBlur={(e) => {
                    const error = validateName(e.target.value);
                    setFieldErrors({ ...fieldErrors, fullName: error });
                  }}
                  placeholder="Your full name"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-card border ${
                    fieldErrors.fullName ? "border-red-500" : "border-border focus:border-accent"
                  } outline-none transition-all font-body`}
                  autoFocus
                />
              </div>
              {fieldErrors.fullName && (
                <p className="text-red-500 text-sm mt-2 font-body">{fieldErrors.fullName}</p>
              )}
            </div>

            <button
              onClick={() => {
                const error = validateName(signUpData.fullName);
                if (error) {
                  setFieldErrors({ ...fieldErrors, fullName: error });
                } else {
                  setCurrentField(1);
                }
              }}
              className="w-full py-4 bg-accent text-accent-foreground rounded-2xl font-body font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </motion.div>
        )}

        {currentField === 1 && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-muted-foreground mb-3 font-body">This is how we'll recognize you</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={signUpData.email}
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, email: e.target.value });
                    setFieldErrors({ ...fieldErrors, email: "" });
                  }}
                  onBlur={(e) => {
                    const error = validateEmail(e.target.value);
                    setFieldErrors({ ...fieldErrors, email: error });
                  }}
                  placeholder="your.email@example.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-card border ${
                    fieldErrors.email ? "border-red-500" : "border-border focus:border-accent"
                  } outline-none transition-all font-body`}
                  autoFocus
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-2 font-body">{fieldErrors.email}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentField(0)}
                className="px-6 py-4 bg-secondary text-foreground rounded-2xl font-body font-medium hover:bg-secondary/80 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => {
                  const error = validateEmail(signUpData.email);
                  if (error) {
                    setFieldErrors({ ...fieldErrors, email: error });
                  } else {
                    setCurrentField(2);
                  }
                }}
                className="flex-1 py-4 bg-accent text-accent-foreground rounded-2xl font-body font-medium hover:shadow-lg transition-all"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {currentField === 2 && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-muted-foreground mb-3 font-body">For important updates only</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={signUpData.phone}
                  onChange={(e) => {
                    setSignUpData({ ...signUpData, phone: e.target.value });
                    setFieldErrors({ ...fieldErrors, phone: "" });
                  }}
                  onBlur={(e) => {
                    const error = validatePhone(e.target.value);
                    setFieldErrors({ ...fieldErrors, phone: error });
                  }}
                  placeholder="+91 98765 43210"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-card border ${
                    fieldErrors.phone ? "border-red-500" : "border-border focus:border-accent"
                  } outline-none transition-all font-body`}
                  autoFocus
                />
              </div>
              {fieldErrors.phone && (
                <p className="text-red-500 text-sm mt-2 font-body">{fieldErrors.phone}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentField(1)}
                className="px-6 py-4 bg-secondary text-foreground rounded-2xl font-body font-medium hover:bg-secondary/80 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => {
                  const error = validatePhone(signUpData.phone);
                  if (error) {
                    setFieldErrors({ ...fieldErrors, phone: error });
                  } else {
                    setCurrentField(0);
                    setCurrentLevel(3);
                  }
                }}
                className="flex-1 py-4 bg-accent text-accent-foreground rounded-2xl font-body font-medium hover:shadow-lg transition-all"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-12">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <div className="w-2 h-2 rounded-full bg-accent" />
        <div className="w-2 h-2 rounded-full bg-border" />
      </div>
    </motion.div>,

    // Level 3: Aadhaar Verification (MANDATORY - NO SKIP)
    <motion.div
      key="aadhaar"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-8"
    >
      <div className="text-center space-y-4">
        <p className="text-sm text-accent font-semibold uppercase tracking-wider">Level 3 of 4</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Verify Your Identity</h2>
        <p className="text-muted-foreground text-lg">Secure eKYC verification with Aadhaar</p>
        
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="inline-block mt-4"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center shadow-lg">
            <Shield className="w-10 h-10 text-accent" />
          </div>
        </motion.div>
      </div>

      {!verificationSuccess ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 rounded-2xl p-6 space-y-3">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div className="text-sm text-foreground font-body space-y-2">
                <p className="font-semibold text-base">Why Aadhaar verification is required?</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>Ensures authentic and verified community members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>Protects against fraud and unauthorized access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>Complies with government regulations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Aadhaar Number Input */}
          {!otpSent ? (
            <>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-foreground font-body">
                  Enter your 12-digit Aadhaar number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                  <input
                    type="text"
                    value={formatAadhaarNumber(signUpData.aadhaarNumber)}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[\s-]/g, '');
                      if (/^\d*$/.test(cleaned) && cleaned.length <= 12) {
                        setSignUpData({ ...signUpData, aadhaarNumber: cleaned });
                        setError("");
                      }
                    }}
                    placeholder="XXXX XXXX XXXX"
                    maxLength={14} // With spaces: 12 digits + 2 spaces
                    className="w-full pl-16 pr-5 py-5 rounded-2xl bg-white border-2 border-border focus:border-accent outline-none transition-all font-body text-xl tracking-[0.25em] font-semibold shadow-sm"
                    autoFocus
                  />
                </div>
                <p className="text-sm text-muted-foreground font-body flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  OTP will be sent to your Aadhaar-linked mobile number
                </p>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-sm text-red-700 font-body flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.button
                onClick={handleSendOTP}
                disabled={isVerifying || signUpData.aadhaarNumber.length !== 12}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground rounded-2xl font-body font-semibold text-lg hover:shadow-2xl hover:shadow-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                <Shield className="w-6 h-6" />
                {isVerifying ? "Sending OTP..." : "Send OTP to Verify"}
              </motion.button>
              
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-center space-y-1">
                <p className="text-sm font-semibold text-amber-900 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Aadhaar Verification is Mandatory
                </p>
                <p className="text-xs text-amber-700">Required for security and regulatory compliance</p>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
                <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
                <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
                <div className="w-3 h-3 rounded-full bg-border" />
              </div>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <label className="block text-sm font-semibold text-foreground font-body">
                    Enter 6-Digit OTP
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Sent to {maskAadhaarNumber(signUpData.aadhaarNumber)}
                  </p>
                </div>
                
                <input
                  type="text"
                  value={aadhaarOTP}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 6) {
                      setAadhaarOTP(value);
                      setError("");
                    }
                  }}
                  placeholder="● ● ● ● ● ●"
                  maxLength={6}
                  className="w-full px-6 py-6 rounded-2xl bg-white border-2 border-border focus:border-accent outline-none transition-all font-mono text-3xl md:text-4xl text-center tracking-[0.5em] font-bold shadow-sm"
                  autoFocus
                />
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground font-body">
                    Didn't receive OTP?{" "}
                    <button 
                      onClick={handleSendOTP} 
                      className="text-accent font-semibold hover:underline transition-all"
                      disabled={isVerifying}
                    >
                      Resend
                    </button>
                  </p>
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-sm text-red-700 font-body flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="flex gap-4">
                <motion.button
                  onClick={() => {
                    setOtpSent(false);
                    setAadhaarOTP("");
                    setError("");
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-border text-foreground rounded-2xl font-body font-semibold hover:shadow-lg hover:border-accent/50 transition-all"
                >
                  ← Back
                </motion.button>
                
                <motion.button
                  onClick={handleVerifyOTP}
                  disabled={isVerifying || aadhaarOTP.length !== 6}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-body font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  {isVerifying ? "Verifying..." : "Verify & Continue"}
                </motion.button>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
                <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
                <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-border" />
              </div>
            </>
          )}
        </div>
      ) : (
        // Verification Success Animation
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8 py-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut" 
            }}
            className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-green-100 to-green-50 shadow-2xl shadow-green-500/20"
          >
            <CheckCircle className="w-16 h-16 text-green-600" />
          </motion.div>
          
          <div className="space-y-3">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Identity Verified! ✓
            </h3>
            <p className="text-muted-foreground text-lg font-body">
              Your Aadhaar has been successfully verified
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-semibold">
              <Shield className="w-4 h-4" />
              Secure & Verified
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <div className="w-3 h-3 rounded-full bg-border" />
          </div>
        </motion.div>
      )}
    </motion.div>,

    // Level 4: Security (Password Setup)
    <motion.div
      key="security"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-8"
    >
      <div className="text-center space-y-3">
        <p className="text-sm text-accent font-semibold uppercase tracking-wider">Level 4 of 4</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Secure Your Account</h2>
        <p className="text-muted-foreground text-lg">Create a strong password to protect your account</p>
        
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mt-4"
        >
          <Shield className="w-16 h-16 text-accent opacity-20" />
        </motion.div>
      </div>

      <div className="space-y-6">
        {/* Password */}
        <div>
          <label className="block text-sm text-muted-foreground mb-3 font-body">Make it strong. Only you hold this key.</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="password"
              value={signUpData.password}
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
              placeholder="Create password"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-accent outline-none transition-all font-body"
            />
          </div>
          
          {/* Password Strength Meter */}
          {signUpData.password && (
            <div className="mt-3">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      i < passwordStrength
                        ? passwordStrength <= 1
                          ? "bg-red-500"
                          : passwordStrength === 2
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-body">
                {passwordStrength <= 1 && "Weak"}
                {passwordStrength === 2 && "Fair"}
                {passwordStrength === 3 && "Good"}
                {passwordStrength === 4 && "Strong"}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="password"
              value={signUpData.confirmPassword}
              onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
              placeholder="Confirm password"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-accent outline-none transition-all font-body"
            />
            {signUpData.confirmPassword && signUpData.password === signUpData.confirmPassword && (
              <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
          </div>
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={signUpData.agreedToTerms}
            onChange={(e) => setSignUpData({ ...signUpData, agreedToTerms: e.target.checked })}
            className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent"
          />
          <span className="text-sm text-muted-foreground font-body">
            I agree to the <span className="text-accent">Terms & Privacy Policy</span>
          </span>
        </label>

        {error && (
          <p className="text-sm text-red-500 text-center font-body">{error}</p>
        )}

        <button
          onClick={handleSignUp}
          disabled={isLoading || !signUpData.password || !signUpData.confirmPassword || !signUpData.agreedToTerms}
          className="w-full py-4 bg-accent text-accent-foreground rounded-2xl font-body font-medium hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          <span className="relative z-10">
            {isLoading ? "Creating your key..." : "Unlock keyCircle"}
          </span>
          <motion.div
            className="absolute inset-0 bg-accent-foreground/10"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </button>

        <button
          onClick={() => setCurrentLevel(2)}
          className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          Back
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-12">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <div className="w-2 h-2 rounded-full bg-accent" />
        <div className="w-2 h-2 rounded-full bg-accent" />
      </div>
    </motion.div>,

    // Success Screen
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center px-6"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center backdrop-blur-sm border border-green-500/30">
          <Mail className="w-12 h-12 text-green-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Check Your Email!
        </h1>
        <p className="text-muted-foreground max-w-md mb-4 font-body">
          We've sent a verification link to
        </p>
        <p className="text-accent font-semibold mb-8 font-body">
          {signUpData.email}
        </p>
        <p className="text-sm text-muted-foreground max-w-md mb-12 font-body">
          Click the link in the email to verify your account and complete your registration. 
          The email should arrive within a few minutes.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/signin')}
            className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-body font-medium text-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Go to Sign In
          </button>
          
          <p className="text-sm text-muted-foreground font-body">
            Didn't receive the email? Check your spam folder or{" "}
            <button 
              onClick={() => setCurrentLevel(0)}
              className="text-accent hover:underline"
            >
              try again
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-stone-100">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Glassmorphism Container */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 p-8 md:p-12 lg:p-16">
            <AnimatePresence mode="wait">
              {screens[currentLevel]}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-t from-accent/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default SignUpJourney;
