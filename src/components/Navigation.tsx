import { Bike, Menu } from "lucide-react";

const Navigation = () => {
  const navItems = ["Home", "Rent a Bike", "List Your Bike", "How it Works"];

  return (
    <nav className="flex items-center justify-between px-8 py-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <Bike className="w-5 h-5 text-accent-foreground" />
        </div>
        <span className="font-display text-xl font-semibold text-foreground">Chavi Deh</span>
      </div>

      {/* Navigation Pills */}
      <div className="hidden md:flex items-center gap-2 rounded-full bg-secondary p-1.5 shadow-nav">
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

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="hidden sm:block px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-medium font-body text-sm shadow-nav hover:opacity-90 transition-opacity">
          List Your Bike
        </button>
        <button className="px-5 py-2.5 rounded-full bg-card text-foreground font-medium font-body text-sm shadow-nav hover:bg-secondary transition-colors border border-border">
          Sign In
        </button>
        <button className="md:hidden w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
