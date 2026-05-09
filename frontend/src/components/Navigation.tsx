import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Track scroll position for navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Market", path: "/marketplace" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Profile", path: isAuthenticated ? "/profile" : "/auth" }
  ];

  // Check if a nav item is active based on current location
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = async () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Desktop Navigation - Transitions from top-left to center on scroll */}
      <nav className={`hidden lg:flex fixed z-50 items-center gap-3 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'top-4 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/50 rounded-full px-2 py-2' 
          : 'top-6 left-6 translate-x-0'
      }`}>
        {/* Horizontal Nav Pills */}
        <div className={`flex items-center gap-1 rounded-full p-1 transition-all duration-300 ${
          isScrolled 
            ? 'bg-transparent' 
            : 'bg-stone-100/80 backdrop-blur-sm shadow-lg border border-stone-200/50'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-full text-sm font-medium font-body transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-stone-800 text-white"
                  : "text-foreground hover:bg-stone-200/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Auth Button */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-900">{user.name}</span>
              </div>
            )}
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-body font-medium text-sm hover:bg-red-100 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/auth')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800 text-white font-body font-medium text-sm hover:bg-stone-900 transition-all duration-300"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
        )}
      </nav>

      {/* Tablet Top Navigation */}
      <nav className="hidden sm:flex lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/50">
        <div className="w-full px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="font-display text-lg font-bold text-foreground hover:text-accent transition-colors"
            >
              keyCircle
            </button>

            {/* Center Navigation */}
            <div className="flex items-center gap-1 rounded-full bg-stone-100 p-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-body transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-stone-800 text-white"
                      : "text-foreground hover:bg-stone-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Auth Button */}
            {isAuthenticated ? (
              <button 
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 font-body font-medium text-xs hover:bg-red-100 transition-all duration-300"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => navigate('/auth')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-body font-medium text-xs hover:bg-accent/90 transition-all duration-300"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button - Only shown on mobile, mobile nav is in HeroSection */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-stone-200/50 flex items-center justify-center transition-all duration-300 hover:bg-stone-100"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden fixed top-16 left-4 right-4 z-50 bg-white/95 backdrop-blur-xl rounded-2xl border border-stone-200 shadow-xl">
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(item.path);
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-sm font-medium font-body transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-stone-800 text-white"
                    : "text-foreground hover:bg-stone-100"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <hr className="my-3 border-stone-200" />
            
            {/* Auth Button - Mobile */}
            {isAuthenticated ? (
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full px-4 py-3 rounded-xl text-left text-sm font-medium font-body bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/auth');
                }}
                className="w-full px-4 py-3 rounded-xl text-left text-sm font-medium font-body bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
