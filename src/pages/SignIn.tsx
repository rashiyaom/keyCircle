import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Bike, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleGoogleSignIn = async () => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (oauthError) throw oauthError;

      // OAuth redirect will happen automatically
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to sign in with Google";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!isSupabaseConfigured()) {
      setError("Authentication service is not configured. Please contact support.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (signInError) {
        // Handle specific error cases
        if (signInError.message.includes("Email not confirmed")) {
          setError("Please verify your email before signing in. Check your inbox for the verification link.");
        } else if (signInError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(signInError.message);
        }
        return;
      }

      if (data.user) {
        setSuccessMessage("Welcome back! Redirecting...");
        
        // Redirect to dashboard after successful sign in
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    if (!isSupabaseConfigured()) {
      setError("Authentication service is not configured.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) throw resetError;

      setSuccessMessage("Password reset link sent! Check your email.");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send reset email";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-stone-100">
      {/* Elegant background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/auth')}
            className="mb-8 hover:bg-white/50 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Sign In Form Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-2xl border border-white/20 p-8 sm:p-10 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 mb-2">
                <Bike className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
                Welcome Back
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                Sign in to access your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Error/Success Messages */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-body">{error}</p>
                </div>
              )}
              
              {successMessage && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700 font-body">{successMessage}</p>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground font-body">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-body"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground font-body">
                    Password
                  </label>
                  <button 
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-accent hover:underline font-medium"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-border/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-body"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-border/50 text-accent focus:ring-accent/20"
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground font-body cursor-pointer">
                  Keep me signed in
                </label>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white/80 backdrop-blur-sm text-muted-foreground font-body">or continue with</span>
                </div>
              </div>

              {/* Google Sign-In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-border/50 hover:border-accent rounded-xl font-body font-medium text-sm shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-foreground group-hover:text-accent transition-colors">
                  Sign in with Google
                </span>
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground font-body">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate('/signup/journey')}
                  className="text-accent hover:underline font-semibold"
                >
                  Sign up for free
                </button>
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground font-body">
                256-bit SSL Encrypted
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
