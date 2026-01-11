import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="space-y-5">
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
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-body"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground font-body">
                    Password
                  </label>
                  <button className="text-xs text-accent hover:underline font-medium">
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-border/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-body"
                  />
                  <button
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
                  Remember me for 30 days
                </label>
              </div>

              {/* Sign In Button */}
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-accent to-accent/90 text-white font-semibold font-body text-sm shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5">
                Sign In to Your Account
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white/80 text-muted-foreground font-body">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border/50 bg-white/50 hover:bg-white transition-all duration-300 hover:-translate-y-0.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium font-body">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border/50 bg-white/50 hover:bg-white transition-all duration-300 hover:-translate-y-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm font-medium font-body">GitHub</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground font-body">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate('/signup')}
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
