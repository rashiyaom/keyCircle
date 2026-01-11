import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, KeyRound, User, Mail, Phone, Lock, Check, Backpack, MapPin, Shield } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [currentField, setCurrentField] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    
    // Validation
    if (!signUpData.fullName || !signUpData.email || !signUpData.phone || !signUpData.password) {
      setError("Please fill all fields");
      return;
    }
    
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (passwordStrength < 2) {
      setError("Please create a stronger password");
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
        console.warn("Supabase not configured. Using demo mode.");
        // Demo mode - just show success
        setTimeout(() => {
          setCurrentLevel(4);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            full_name: signUpData.fullName,
            phone: signUpData.phone,
            user_type: signUpData.userType,
            verification_status: "pending",
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Success! Move to final screen
        setCurrentLevel(4);
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center text-center px-6"
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
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center backdrop-blur-sm border border-accent/30">
          <KeyRound className="w-12 h-12 text-accent" />
        </div>
      </motion.div>

      <p className="text-sm text-muted-foreground mb-2 font-body">Every journey begins with a key</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
        Welcome to keyCircle
      </h1>
      <p className="text-muted-foreground max-w-md mb-12 font-body">
        Your trusted vehicle sharing platform. Create your key to unlock the journey.
      </p>

      <button
        onClick={() => setCurrentLevel(1)}
        className="group relative px-8 py-4 bg-accent text-accent-foreground rounded-full font-body font-medium text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        Begin Your Journey
        <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <button
        onClick={() => navigate('/signin')}
        className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
      >
        Already have access? <span className="text-accent font-medium">Sign In</span>
      </button>
    </motion.div>,

    // Level 1: Choose User Type
    <motion.div
      key="usertype"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full max-w-2xl px-6"
    >
      <div className="text-center mb-8">
        <p className="text-sm text-accent font-semibold mb-2 font-body">Level 1 of 3</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Who are you?</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Student Card */}
        <motion.button
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSignUpData({ ...signUpData, userType: "student" });
            setTimeout(() => setCurrentLevel(2), 300);
          }}
          className={`relative overflow-hidden rounded-3xl p-8 border-2 transition-all duration-300 ${
            signUpData.userType === "student"
              ? "border-accent bg-accent/10 shadow-xl"
              : "border-border/50 bg-card hover:border-accent/50 hover:shadow-lg"
          }`}
        >
          <div className="absolute top-4 right-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              signUpData.userType === "student" ? "bg-accent" : "bg-secondary"
            }`}>
              <Backpack className={`w-5 h-5 ${
                signUpData.userType === "student" ? "text-accent-foreground" : "text-muted-foreground"
              }`} />
            </div>
          </div>

          <div className="text-left mt-8">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Hostel Student</h3>
            <p className="text-sm text-muted-foreground font-body">Living on campus</p>
          </div>
        </motion.button>

        {/* General User Card */}
        <motion.button
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSignUpData({ ...signUpData, userType: "general" });
            setTimeout(() => setCurrentLevel(2), 300);
          }}
          className={`relative overflow-hidden rounded-3xl p-8 border-2 transition-all duration-300 ${
            signUpData.userType === "general"
              ? "border-accent bg-accent/10 shadow-xl"
              : "border-border/50 bg-card hover:border-accent/50 hover:shadow-lg"
          }`}
        >
          <div className="absolute top-4 right-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              signUpData.userType === "general" ? "bg-accent" : "bg-secondary"
            }`}>
              <MapPin className={`w-5 h-5 ${
                signUpData.userType === "general" ? "text-accent-foreground" : "text-muted-foreground"
              }`} />
            </div>
          </div>

          <div className="text-left mt-8">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">General User</h3>
            <p className="text-sm text-muted-foreground font-body">Anywhere, anytime</p>
          </div>
        </motion.button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-12">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <div className="w-2 h-2 rounded-full bg-border" />
        <div className="w-2 h-2 rounded-full bg-border" />
      </div>
    </motion.div>,

    // Level 2: Identity (Name, Email, Phone - one by one)
    <motion.div
      key="identity"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full max-w-md px-6"
    >
      <div className="text-center mb-8">
        <p className="text-sm text-accent font-semibold mb-2 font-body">Level 2 of 3</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Create Your Identity</h2>
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
                  onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                  placeholder="Your full name"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-accent outline-none transition-all font-body"
                  autoFocus
                />
              </div>
            </div>

            <button
              onClick={() => signUpData.fullName && setCurrentField(1)}
              disabled={!signUpData.fullName}
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
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-accent outline-none transition-all font-body"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentField(0)}
                className="px-6 py-4 bg-secondary text-foreground rounded-2xl font-body font-medium hover:bg-secondary/80 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => signUpData.email && setCurrentField(2)}
                disabled={!signUpData.email}
                className="flex-1 py-4 bg-accent text-accent-foreground rounded-2xl font-body font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                  onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-accent outline-none transition-all font-body"
                  autoFocus
                />
              </div>
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
                  if (signUpData.phone) {
                    setCurrentField(0);
                    setCurrentLevel(3);
                  }
                }}
                disabled={!signUpData.phone}
                className="flex-1 py-4 bg-accent text-accent-foreground rounded-2xl font-body font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

    // Level 3: Security
    <motion.div
      key="security"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full max-w-md px-6"
    >
      <div className="text-center mb-8">
        <p className="text-sm text-accent font-semibold mb-2 font-body">Level 3 of 3</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Secure Your Key</h2>
        
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
          <Check className="w-12 h-12 text-green-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Your Key is Created
        </h1>
        <p className="text-muted-foreground max-w-md mb-12 font-body">
          Verification is the next step. We'll guide you through the process.
        </p>

        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-body font-medium text-lg hover:shadow-xl transition-all hover:scale-105"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-background flex items-center justify-center">
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {screens[currentLevel]}
        </AnimatePresence>
      </div>

      {/* Glassmorphism overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />
    </div>
  );
};

export default SignUpJourney;
