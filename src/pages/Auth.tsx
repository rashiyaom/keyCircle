import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Bike, ArrowRight, Sparkles } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-stone-100">
      {/* Elegant background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-accent/3 to-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Logo/Brand Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm border border-white/20 shadow-2xl mb-6 relative">
              <Bike className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
              <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-3 sm:mb-4 tracking-tight">
              Welcome to <span className="text-accent">keyCircle</span>
            </h1>
            <p className="font-body text-muted-foreground text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              Your premium vehicle sharing platform. Join thousands of verified users sharing rides seamlessly.
            </p>
          </div>

          {/* Auth Options Container - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* Sign In Card */}
            <div 
              onClick={() => navigate('/signin')}
              className="group relative overflow-hidden rounded-3xl sm:rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-accent/10 transition-all duration-500 cursor-pointer hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8 sm:p-10 lg:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-4">
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
                    Sign In
                  </h3>
                  <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Welcome back! Access your account and continue your journey with our community.
                  </p>
                  
                  {/* Feature badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      Instant Access
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Secure Login
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Up Card */}
            <div 
              onClick={() => navigate('/signup/journey')}
              className="group relative overflow-hidden rounded-3xl sm:rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8 sm:p-10 lg:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-4">
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
                    Sign Up
                  </h3>
                  <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                    New here? Create your account and join our trusted community of riders.
                  </p>
                  
                  {/* Feature badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Free Forever
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      2 Min Setup
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-12 sm:mt-16 space-y-4">
            <p className="text-xs sm:text-sm text-muted-foreground px-4">
              By continuing, you agree to our{" "}
              <button className="text-accent hover:underline font-medium">Terms of Service</button>
              {" "}and{" "}
              <button className="text-accent hover:underline font-medium">Privacy Policy</button>
            </p>
            
            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>5K+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
