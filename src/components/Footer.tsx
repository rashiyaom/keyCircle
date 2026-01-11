import { Bike, Instagram, Twitter, Facebook, Mail, ArrowUpRight, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Footer = () => {
  const ctaAnim = useScrollAnimation();
  const footerAnim = useScrollAnimation();

  const links = {
    company: ["About Us", "How it Works", "Trust & Safety", "Contact Us"],
    support: ["Help Center", "Verification", "Community Guidelines", "FAQs"],
    legal: ["Terms of Service", "Privacy Policy", "Student Policy", "Refund Policy"],
  };

  const hostels = ["Boys Hostel A", "Boys Hostel B", "Girls Hostel A", "Girls Hostel B", "PG Block 1", "PG Block 2"];

  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section */}
      <div 
        ref={ctaAnim.ref}
        className={`px-4 sm:px-8 py-12 sm:py-20 bg-accent relative transition-all duration-1000 ease-out ${
          ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent-foreground blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent-foreground blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium text-accent-foreground mb-3 sm:mb-5">
            Ready to Ride?
          </h2>
          <p className="font-body text-sm sm:text-lg text-accent-foreground/80 mb-6 sm:mb-8 max-w-xl mx-auto px-4">
            Join our trusted student community. Rent a ride or share yours today!
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button className="group px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-card text-foreground font-body text-xs sm:text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2 shadow-badge">
              Find a Ride
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-accent-foreground/10 text-accent-foreground font-body text-xs sm:text-sm font-medium hover:bg-accent-foreground/20 transition-colors border border-accent-foreground/20">
              List Your Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div 
        ref={footerAnim.ref}
        className={`px-4 sm:px-8 py-12 sm:py-20 bg-primary text-primary-foreground transition-all duration-1000 ease-out ${
          footerAnim.isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-10 mb-10 sm:mb-16">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-accent flex items-center justify-center">
                  <Bike className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
                </div>
                <span className="font-display text-xl sm:text-2xl font-semibold">keyCircle</span>
              </div>
              <p className="font-body text-xs sm:text-sm text-primary-foreground/60 mb-4 sm:mb-6 max-w-xs leading-relaxed">
                A student community vehicle sharing platform. Turn unused keys into shared freedom.
              </p>
              <div className="flex gap-2 sm:gap-3">
                {[Instagram, Twitter, Facebook, Mail].map((Icon, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary-foreground/5 flex items-center justify-center hover:bg-primary-foreground/10 hover:scale-110 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-body text-[10px] sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-5">Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.company.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-xs sm:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1 group">
                      {link}
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-[10px] sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-5">Support</h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.support.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-xs sm:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1 group">
                      {link}
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden sm:block">
              <h4 className="font-body text-[10px] sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-5">Legal</h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.legal.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-xs sm:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1 group">
                      {link}
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block">
              <h4 className="font-body text-[10px] sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-5">Hostels</h4>
              <ul className="space-y-2 sm:space-y-3">
                {hostels.map((hostel) => (
                  <li key={hostel}>
                    <a href="#" className="font-body text-xs sm:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1.5 group">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {hostel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-6 sm:pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="font-body text-[10px] sm:text-sm text-primary-foreground/40">
              © 2026 keyCircle. All rights reserved.
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
