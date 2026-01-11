import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-background px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
            <Bike className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
            Welcome to keyCircle
          </h1>
          <p className="font-body text-muted-foreground text-sm">
            Your trusted vehicle sharing platform
          </p>
        </div>

        {/* Auth Options Container */}
        <div className="bg-card rounded-3xl shadow-badge border border-border/50 p-8 space-y-4">
          {/* Sign In Card */}
          <div 
            onClick={() => navigate('/signin')}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background hover:bg-accent/5 transition-all duration-300 cursor-pointer hover:shadow-card hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <LogIn className="w-5 h-5 text-accent" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                Sign In
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Already have an account? Continue your journey
              </p>
            </div>
          </div>

          {/* Sign Up Card */}
          <div 
            onClick={() => navigate('/signup')}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background hover:bg-accent/5 transition-all duration-300 cursor-pointer hover:shadow-card hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <UserPlus className="w-5 h-5 text-accent" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                Sign Up
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                New here? Create your account and get started
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
