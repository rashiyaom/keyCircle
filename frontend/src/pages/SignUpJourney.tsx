import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, KeyRound, User, Mail, Phone, Lock, Check, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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

interface SignUpData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

const SignUpJourney = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    fullName: "",
    email: "",
    phone: "",
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
      // Sign up user
      signup(signUpData.email, signUpData.fullName);
      
      // Redirect to profile page
      setTimeout(() => {
        navigate('/profile', { replace: true });
      }, 500);
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
        <p className="text-sm text-accent font-semibold uppercase tracking-wider">Join keyCircle</p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
          Welcome to<br />keyCircle
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Your trusted vehicle sharing platform. Create your account to unlock the journey.
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <motion.button
          onClick={() => setCurrentLevel(1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative w-full px-12 py-4 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground rounded-2xl font-body font-semibold text-lg shadow-2xl hover:shadow-accent/50 transition-all duration-300"
        >
          <span className="flex items-center justify-center gap-3">
            <Mail className="w-6 h-6" />
            Create Account
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
        Already have an account? <span className="text-accent font-semibold hover:underline">Sign In</span>
      </button>

      <div className="flex justify-center gap-2 mt-12">
        <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
        <div className="w-3 h-3 rounded-full bg-border" />
      </div>
    </motion.div>,

    // Level 1: Identity
    <motion.div
      key="identity"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-8"
    >
      <div className="text-center space-y-2 sm:space-y-3">
        <p className="text-xs sm:text-sm text-accent font-semibold uppercase tracking-wider">Step 1 of 2</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground px-2">Create Your Profile</h2>
        <p className="text-sm sm:text-base text-muted-foreground px-4">Tell us about yourself</p>
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
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-body px-1">What should we call you?</label>
              <div className="relative">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
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
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-card border ${
                    fieldErrors.fullName ? "border-red-500" : "border-border focus:border-accent"
                  } outline-none transition-all font-body`}
                  autoFocus
                />
              </div>
              {fieldErrors.fullName && (
                <p className="text-red-500 text-xs sm:text-sm mt-2 font-body px-1">{fieldErrors.fullName}</p>
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
              className="w-full py-3 sm:py-4 text-sm sm:text-base bg-accent text-accent-foreground rounded-xl sm:rounded-2xl font-body font-medium hover:shadow-lg transition-all"
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
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-body px-1">Your email address</label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
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
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-card border ${
                    fieldErrors.email ? "border-red-500" : "border-border focus:border-accent"
                  } outline-none transition-all font-body`}
                  autoFocus
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-2 font-body px-1">{fieldErrors.email}</p>
              )}
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setCurrentField(0)}
                className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-secondary text-foreground rounded-xl sm:rounded-2xl font-body font-medium hover:bg-secondary/80 transition-all"
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
                className="flex-1 py-3 sm:py-4 text-sm sm:text-base bg-accent text-accent-foreground rounded-xl sm:rounded-2xl font-body font-medium hover:shadow-lg transition-all"
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
              <label className="block text-sm text-muted-foreground mb-3 font-body">Your phone number</label>
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
                    setCurrentLevel(2);
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

      <div className="flex justify-center gap-2 mt-12">
        <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
        <div className="w-3 h-3 rounded-full bg-border" />
      </div>
    </motion.div>,

    // Level 2: Security
    <motion.div
      key="security"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-8"
    >
      <div className="text-center space-y-3">
        <p className="text-sm text-accent font-semibold uppercase tracking-wider">Step 2 of 2</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Secure Your Account</h2>
        <p className="text-muted-foreground text-lg">Create a strong password</p>
      </div>

      <div className="space-y-6">
        {/* Password */}
        <div>
          <label className="block text-sm text-muted-foreground mb-3 font-body">Password</label>
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
            {isLoading ? "Creating your account..." : "Create Account & Sign In"}
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
          onClick={() => setCurrentLevel(1)}
          className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          Back
        </button>
      </div>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <ParticleBackground />
      
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 p-8 md:p-12 lg:p-16">
            <AnimatePresence mode="wait">
              {screens[currentLevel]}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 bg-gradient-to-t from-accent/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default SignUpJourney;
