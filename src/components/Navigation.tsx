import { useState } from "react";
import { Menu, X, ShoppingCart, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = ["Home", "Product", "About", "Pricing"];

  return (
    <nav className="relative hidden sm:flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
      {/* Navigation Pills - Desktop (moved to left, replaces logo) */}
      <div className="hidden md:flex items-center gap-1 rounded-full bg-stone-200 p-1.5 shadow-nav">
        {navItems.map((item, index) => (
          <button
            key={item}
            className={`px-5 py-2.5 rounded-full text-sm font-medium font-body transition-all duration-300 ${
              index === 0
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Tablet Logo (only show on tablet) */}
      <span className="hidden sm:block md:hidden font-display text-lg font-semibold text-foreground">keyCircle</span>

      {/* Right Actions - Desktop: positioned separately over hero image */}
      {/* This is just a placeholder to maintain flex justify-between, actual buttons are in HeroSection */}
      <div className="hidden md:flex items-center gap-3">
        <button 
          onClick={() => navigate('/auth')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-body font-medium text-sm hover:bg-accent/90 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <LogIn className="w-4 h-4" />
          Sign In
        </button>
      </div>
      
      {/* Tablet Actions */}
      <div className="flex sm:flex md:hidden items-center gap-2 sm:gap-3">
        <button 
          onClick={() => navigate('/auth')}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-accent text-accent-foreground font-body font-medium text-xs hover:bg-accent/90 transition-all duration-300"
        >
          <LogIn className="w-3.5 h-3.5" />
          Sign In
        </button>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center transition-all duration-300"
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
                key={item}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium font-body transition-all duration-200 text-left ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item}
              </button>
            ))}
            <hr className="my-2 border-border/50" />
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
