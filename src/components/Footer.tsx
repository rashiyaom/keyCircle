import { Bike, Instagram, Twitter, Facebook, Mail } from "lucide-react";

const Footer = () => {
  const links = {
    company: ["About Us", "How it Works", "Blog", "Careers"],
    support: ["Help Center", "Safety Guidelines", "Trust & Safety", "Contact Us"],
    legal: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Insurance"],
  };

  return (
    <footer className="px-8 py-12 sm:py-16 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Bike className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-semibold">Chai Dew</span>
            </div>
            <p className="font-body text-sm text-primary-foreground/70 mb-6 max-w-xs">
              India's largest peer-to-peer bike rental platform. Rent bikes from your neighbors, or earn by sharing yours.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Mail].map((Icon, index) => (
                <button
                  key={index}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-primary-foreground/50">
            © 2026 Chai Dew. All rights reserved.
          </p>
          <p className="font-body text-sm text-primary-foreground/50">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
