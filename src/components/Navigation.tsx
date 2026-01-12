import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Market", path: "/marketplace" },
    { label: "About", path: "/" },
    { label: "Profile", path: isAuthenticated ? "/profile" : "/auth" }
  ];

  return (
    <nav className="relative hidden sm:flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
      {/* Navigation Pills - Desktop with Sign In button inside */}
      <div className="hidden md:flex items-center gap-1 rounded-full bg-stone-200 p-1.5 shadow-nav">
        {navItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium font-body transition-all duration-300 ${
              index === 0
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
        {/* Sign In button inside navbar */}
        <button 
          onClick={() => navigate('/auth')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-body font-medium text-sm hover:bg-accent/90 transition-all duration-300"
        >
          <LogIn className="w-4 h-4" />
          Sign In
        </button>
      </div>

      {/* Tablet Logo (only show on tablet) */}
      <span className="hidden sm:block md:hidden font-display text-lg font-semibold text-foreground">keyCircle</span>

      {/* Right Actions - Desktop: empty placeholder */}
      <div className="hidden md:block" />
      
      {/* Tablet Actions - Just menu button */}
      <div className="flex sm:flex md:hidden items-center gap-2 sm:gap-3">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center transition-all duration-300 hover:bg-secondary/80"
        >
          {isMenuOpen ? (
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          ) : (
            <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Tablet Menu */}
      <div className={`absolute top-full left-0 right-0 z-50 sm:block md:hidden transition-all duration-300 ease-out ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="mx-4 mt-2 p-4 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-xl">
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(item.path);
                }}
                className={`px-4 py-3 rounded-xl text-sm font-medium font-body transition-all duration-200 text-left ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
            <hr className="my-2 border-border/50" />
            {/* Sign In button in mobile menu */}
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/auth');
              }}
              className="px-4 py-3 rounded-xl text-sm font-medium font-body bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 text-left inline-flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium font-body text-foreground hover:bg-muted transition-all duration-200 text-left"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
