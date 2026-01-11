import { ArrowUpRight, Wallet, Shield, Clock, Star, TrendingUp, ChevronRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import bikeHero from "@/assets/68ad479faa0c4d1a27bb8441e611cbef.jpg";

const ListYourBike = () => {
  const contentAnim = useScrollAnimation();
  const imageAnim = useScrollAnimation();
  const benefitsAnim = useScrollAnimation({ rootMargin: '0px 0px -50px 0px' });

  const benefits = [
    {
      icon: Wallet,
      title: "Earn Extra",
      description: "₹3,000/mo",
    },
    {
      icon: Shield,
      title: "Verified",
      description: "ID checked",
    },
    {
      icon: Clock,
      title: "Flexible",
      description: "Your hours",
    },
    {
      icon: Star,
      title: "Trusted",
      description: "Community",
    },
  ];

  const testimonial = {
    quote: "Now I earn ₹2,000 extra every month!",
    author: "Sneha R.",
    role: "3rd Year, CSE",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  };

  return (
    <section className="px-4 sm:px-8 pt-14 pb-8 sm:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        
        {/* Mobile Layout - Completely redesigned */}
        <div className="sm:hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3 text-accent" />
                <span className="font-body text-[10px] font-medium text-accent uppercase tracking-wider">Become a Host</span>
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Start <span className="text-accent">Earning</span>
              </h2>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-body text-[10px] font-medium">
              List Now
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Image - Clean with minimal overlay */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
            <img
              src={bikeHero}
              alt="List your bike"
              className="w-full h-[200px] object-cover"
            />
            
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            
            {/* Single clean stat badge - top right */}
            <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-accent" />
                <span className="font-display text-sm font-semibold text-foreground">₹2.5k</span>
                <span className="font-body text-[8px] text-muted-foreground">/mo</span>
              </div>
            </div>

            {/* Bottom testimonial - minimal */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
              <img src={testimonial.image} alt={testimonial.author} className="w-8 h-8 rounded-full object-cover border-2 border-white/50" />
              <div className="flex-1 min-w-0">
                <p className="font-body text-[10px] text-white/90 truncate">"{testimonial.quote}"</p>
                <span className="font-body text-[9px] text-white/60">{testimonial.author}</span>
              </div>
            </div>
          </div>

          {/* Mobile Benefits - Horizontal scroll pills */}
          <div className="-mx-4 px-4 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-card shadow-sm border border-border/30"
                >
                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                    <benefit.icon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-body text-[10px] font-semibold text-foreground leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-[9px] text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Description */}
          <p className="font-body text-xs text-muted-foreground text-center">
            Turn unused keys into shared freedom. Join verified students earning by sharing.
          </p>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Image Section - Cleaner */}
          <div 
            ref={imageAnim.ref}
            className={`relative order-last lg:order-first transition-all duration-1000 ease-out ${
              imageAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-badge">
              <img
                src={bikeHero}
                alt="List your bike"
                className="w-full h-[500px] object-cover"
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Single floating earnings card - cleaner design */}
              <div className="absolute top-6 right-6 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-badge animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">Avg. Earnings</span>
                    <div className="font-display text-2xl font-semibold text-foreground">₹2,500<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                  </div>
                </div>
              </div>

              {/* Bottom testimonial - cleaner */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <img src={testimonial.image} alt={testimonial.author} className="w-11 h-11 rounded-full object-cover ring-2 ring-accent/20" />
                    <div className="flex-1">
                      <p className="font-body text-sm text-foreground mb-1">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-1.5">
                        <span className="font-body text-xs font-medium text-foreground">{testimonial.author}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <span className="font-body text-xs text-muted-foreground">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div 
            ref={contentAnim.ref}
            className={`transition-all duration-1000 ease-out ${
              contentAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-body text-sm font-medium text-accent">Become a Host</span>
            </div>
            
            <h2 className="font-display text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
              List Your Vehicle & <br />
              <span className="text-accent">Start Earning</span>
            </h2>
            
            <p className="font-body text-lg text-muted-foreground mb-10 max-w-md">
              Turn your unused keys into shared freedom. Join verified students who earn by sharing their vehicles.
            </p>

            {/* Benefits Grid - Cleaner */}
            <div 
              ref={benefitsAnim.ref}
              className="grid grid-cols-2 gap-4 mb-10"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`group flex items-center gap-3 p-4 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-badge hover:-translate-y-1 transition-all duration-500 ${
                    benefitsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group px-7 py-4 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2 shadow-nav">
                List Your Bike
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button className="group px-7 py-4 rounded-full bg-card text-foreground font-body text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2 shadow-card border border-border">
                Learn More
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListYourBike;
