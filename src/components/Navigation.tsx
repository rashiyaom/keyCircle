import { ShoppingCart } from "lucide-react";

const Navigation = () => {
  const navItems = ["Home", "Product", "About", "Pricing"];

  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <div className="flex items-center gap-2 rounded-full bg-secondary p-1.5 shadow-nav">
        {navItems.map((item, index) => (
          <button
            key={item}
            className={`px-6 py-2.5 rounded-full text-sm font-medium font-body transition-all duration-300 ${
              index === 0
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-nav hover:scale-105 transition-transform">
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button className="px-6 py-3 rounded-full bg-card text-foreground font-medium font-body text-sm shadow-nav hover:bg-secondary transition-colors">
          CONTACT US
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
