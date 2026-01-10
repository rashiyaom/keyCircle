import { Bike, Instagram, Twitter, Facebook, Mail, ArrowUpRight, MapPin } from "lucide-react";

const Footer = () => {
  const links = {
    company: ["About Us", "How it Works", "Blog", "Careers"],
    support: ["Help Center", "Safety Guidelines", "Trust & Safety", "Contact Us"],
    legal: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Insurance"],
  };

  const cities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune"];

  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="px-8 py-16 sm:py-20 bg-accent relative">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent-foreground blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent-foreground blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-accent-foreground mb-5">
            Ready to Ride?
          </h2>
          <p className="font-body text-lg text-accent-foreground/80 mb-8 max-w-xl mx-auto">
            Join our community of riders and bike owners. Start renting or earning today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group px-7 py-4 rounded-full bg-card text-foreground font-body text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2 shadow-badge">
              Find a Bike
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="px-7 py-4 rounded-full bg-accent-foreground/10 text-accent-foreground font-body text-sm font-medium hover:bg-accent-foreground/20 transition-colors border border-accent-foreground/20">
              List Your Bike
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-8 py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                  <Bike className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="font-display text-2xl font-semibold">Chavi Deh</span>
              </div>
              <p className="font-body text-sm text-primary-foreground/60 mb-6 max-w-xs leading-relaxed">
                India's largest peer-to-peer bike rental platform. Rent bikes from your neighbors, or earn by sharing yours.
              </p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Facebook, Mail].map((Icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-xl bg-primary-foreground/5 flex items-center justify-center hover:bg-primary-foreground/10 hover:scale-110 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-5">Company</h4>
              <ul className="space-y-3">
                {links.company.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1 group">
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-5">Support</h4>
              <ul className="space-y-3">
                {links.support.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1 group">
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-5">Legal</h4>
              <ul className="space-y-3">
                {links.legal.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1 group">
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-5">Top Cities</h4>
              <ul className="space-y-3">
                {cities.map((city) => (
                  <li key={city}>
                    <a href="#" className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1.5 group">
                      <MapPin className="w-3 h-3" />
                      {city}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-primary-foreground/40">
              © 2026 Chavi Deh. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-primary-foreground/40">Made with</span>
              <span className="text-accent">❤️</span>
              <span className="font-body text-sm text-primary-foreground/40">in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
