import { Search, MapPin, Calendar, Bike, ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HowItWorks = () => {
  const headerAnim = useScrollAnimation();
  const stepsAnim = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' });

  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Find a Ride",
      description: "Browse available vehicles in your hostel. Filter by scooty, bike, or cycle.",
      features: ["Hostel Wise", "Instant Search"],
    },
    {
      icon: Calendar,
      step: "02",
      title: "Book & Pay",
      description: "Reserve instantly with transparent hourly rates. Chat with the owner directly.",
      features: ["Hourly Rates", "Direct Chat"],
    },
    {
      icon: MapPin,
      step: "03",
      title: "Get the Key",
      description: "Meet your hostel mate and collect the keys. Quick verified handover.",
      features: ["Verified Students", "Easy Handover"],
    },
    {
      icon: Bike,
      step: "04",
      title: "Ride & Return",
      description: "Enjoy your ride! Return the vehicle on time and build your trust score.",
      features: ["Trust Score", "Rate & Review"],
    },
  ];

  return (
    <section className="px-4 sm:px-8 py-12 sm:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div 
          ref={headerAnim.ref}
          className={`text-center mb-10 sm:mb-20 transition-all duration-700 ease-out ${
            headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-card/80 backdrop-blur-sm shadow-badge border border-border/50 mb-4 sm:mb-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-xs sm:text-sm font-medium text-foreground">Simple Process</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium text-foreground mb-3 sm:mb-5">
            Rent a Ride in <br className="hidden sm:block" />
            <span className="text-accent">4 Easy Steps</span>
          </h2>
          <p className="font-body text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            A trust-first platform where verified students share vehicles safely within their hostel community.
          </p>
        </div>

        {/* Steps Grid */}
        <div 
          ref={stepsAnim.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4"
        >
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`group relative transition-all duration-700 ease-out ${
                stepsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Connector Arrow (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-16 -right-2 z-10 w-8 h-8 items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-card shadow-card border border-border flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              )}

              <div className="h-full bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-card border border-border/50 hover:shadow-badge hover:-translate-y-2 transition-all duration-500">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <step.icon className="w-5 h-5 sm:w-7 sm:h-7 text-foreground group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <span className="font-display text-2xl sm:text-4xl font-bold text-border group-hover:text-accent/30 transition-colors">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg sm:text-xl font-medium text-foreground mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">
                  {step.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {step.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-secondary/80 text-[10px] sm:text-xs font-body font-medium text-foreground"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
