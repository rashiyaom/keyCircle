import { ArrowUpRight, Wallet, Shield, Clock, Star, TrendingUp, ChevronRight } from "lucide-react";
import bikeHero from "@/assets/bike-hero.png";

const ListYourBike = () => {
  const benefits = [
    {
      icon: Wallet,
      title: "Earn Extra Income",
      description: "Up to ₹15,000/month",
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Complete coverage",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "You're in control",
    },
    {
      icon: Star,
      title: "Verified Riders",
      description: "Safe community",
    },
  ];

  const testimonial = {
    quote: "I've earned over ₹50,000 in the last 3 months just by listing my bike when I'm not using it!",
    author: "Vikram M.",
    role: "Bike Owner, Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  };

  return (
    <section className="px-8 py-20 sm:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image Section */}
          <div className="relative order-last lg:order-first">
            <div className="relative rounded-3xl overflow-hidden shadow-badge">
              <img
                src={bikeHero}
                alt="List your bike"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              
              {/* Floating earnings card */}
              <div className="absolute top-6 right-6 bg-card/95 backdrop-blur-sm rounded-2xl p-5 shadow-badge max-w-[200px] animate-float">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-body text-xs text-muted-foreground">Monthly Earnings</span>
                </div>
                <div className="font-display text-3xl font-semibold text-foreground">₹12,500</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-body text-accent">+23%</span>
                  <span className="text-xs font-body text-muted-foreground">vs last month</span>
                </div>
              </div>

              {/* Testimonial card */}
              <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-2xl p-5 shadow-badge" style={{ animationDelay: "1s" }}>
                <p className="font-body text-sm text-foreground italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-body text-sm font-medium text-foreground">{testimonial.author}</div>
                    <div className="font-body text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-body text-sm font-medium text-accent">Become a Host</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
              List Your Bike & <br />
              <span className="text-accent">Start Earning</span>
            </h2>
            
            <p className="font-body text-lg text-muted-foreground mb-10 max-w-md">
              Join thousands of bike owners who are earning passive income by sharing their bikes with the Chai Dew community.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 p-4 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-badge hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-foreground mb-0.5">
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
                List Your Bike Free
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
