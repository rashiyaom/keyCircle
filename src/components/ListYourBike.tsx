import { ArrowUpRight, Wallet, Shield, Clock, Star, TrendingUp, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import bikeHero from "@/assets/68ad479faa0c4d1a27bb8441e611cbef.jpg";

const ListYourBike = () => {
  const contentAnim = useScrollAnimation();
  const imageAnim = useScrollAnimation();
  const benefitsAnim = useScrollAnimation({ rootMargin: '0px 0px -50px 0px' });

  const benefits = [
    {
      icon: Wallet,
      title: "Earn Extra Cash",
      description: "Up to ₹3,000/month",
    },
    {
      icon: Shield,
      title: "Verified Renters",
      description: "ID verified students",
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "You set the hours",
    },
    {
      icon: Star,
      title: "Build Trust Score",
      description: "Community ratings",
    },
  ];

  const testimonial = {
    quote: "My scooty was just sitting in the parking. Now I earn ₹2,000 extra every month from hostel mates!",
    author: "Sneha R.",
    role: "3rd Year, CSE",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  };

  return (
    <section className="px-4 sm:px-8 py-12 sm:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Image Section */}
          <div 
            ref={imageAnim.ref}
            className={`relative order-last lg:order-first transition-all duration-1000 ease-out ${
              imageAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-badge">
              <img
                src={bikeHero}
                alt="List your bike"
                className="w-full h-[300px] sm:h-[500px] object-cover"
              />
              
              {/* Floating earnings card - Hidden on mobile */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-card/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-badge max-w-[160px] sm:max-w-[200px] animate-float hidden xs:block">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <span className="font-body text-[10px] sm:text-xs text-muted-foreground">Monthly Earnings</span>
                </div>
                <div className="font-display text-xl sm:text-3xl font-semibold text-foreground">₹2,500</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] sm:text-xs font-body text-accent">+18%</span>
                  <span className="text-[10px] sm:text-xs font-body text-muted-foreground">vs last month</span>
                </div>
              </div>

              {/* Testimonial card */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-card/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-badge" style={{ animationDelay: "1s" }}>
                <p className="font-body text-xs sm:text-sm text-foreground italic mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">"{testimonial.quote}"</p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <img src={testimonial.image} alt={testimonial.author} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-body text-xs sm:text-sm font-medium text-foreground">{testimonial.author}</div>
                    <div className="font-body text-[10px] sm:text-xs text-muted-foreground">{testimonial.role}</div>
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
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-4 sm:mb-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-body text-xs sm:text-sm font-medium text-accent">Become a Host</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium text-foreground mb-4 sm:mb-6 leading-tight">
              List Your Vehicle & <br />
              <span className="text-accent">Start Earning</span>
            </h2>
            
            <p className="font-body text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-10 max-w-md">
              Turn your unused keys into shared freedom. Join verified students who earn by sharing their vehicles.
            </p>

            {/* Benefits Grid */}
            <div 
              ref={benefitsAnim.ref}
              className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-10"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`group flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-badge hover:-translate-y-1 transition-all duration-500 ${
                    benefitsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-body text-xs sm:text-sm font-semibold text-foreground mb-0.5">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-[10px] sm:text-xs text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button className="group px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-body text-xs sm:text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2 shadow-nav">
                List Your Bike
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button className="group px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-card text-foreground font-body text-xs sm:text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2 shadow-card border border-border">
                Learn More
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListYourBike;
