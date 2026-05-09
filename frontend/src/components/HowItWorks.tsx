import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Bike, ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HowItWorks = () => {
  const headerAnim = useScrollAnimation();
  const stepsAnim = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' });
  const [activeStep, setActiveStep] = useState(0);

  // Auto-rotate steps on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Find",
      subtitle: "a Ride",
      description: "Browse available vehicles in your hostel. Filter by scooty, bike, or cycle.",
      features: ["Hostel Wise", "Instant Search"],
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-500",
      lightBg: "bg-amber-50",
    },
    {
      icon: Calendar,
      step: "02",
      title: "Book",
      subtitle: "& Pay",
      description: "Reserve instantly with transparent hourly rates. Chat with the owner directly.",
      features: ["Hourly Rates", "Direct Chat"],
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-500",
      lightBg: "bg-emerald-50",
    },
    {
      icon: MapPin,
      step: "03",
      title: "Get",
      subtitle: "the Key",
      description: "Meet your hostel mate and collect the keys. Quick verified handover.",
      features: ["Verified Students", "Easy Handover"],
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50",
    },
    {
      icon: Bike,
      step: "04",
      title: "Ride",
      subtitle: "& Return",
      description: "Enjoy your ride! Return the vehicle on time and build your trust score.",
      features: ["Trust Score", "Rate & Review"],
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-500",
      lightBg: "bg-purple-50",
    },
  ];

  return (
    <section className="px-4 sm:px-8 py-10 sm:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Mobile: Ultra Compact Visual Design */}
        <div className="sm:hidden">
          {/* Minimal Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[10px] font-body font-medium text-accent uppercase tracking-widest">How it works</span>
              <h2 className="font-display text-xl font-semibold text-foreground mt-0.5">4 Easy Steps</h2>
            </div>
            <div className="flex items-center gap-1">
              {steps.map((_, i) => (
                <div 
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeStep ? 'w-6 bg-accent' : 'w-1.5 bg-border'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Visual Steps Row - All 4 visible */}
          <div className="flex items-end justify-between gap-2 mb-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === activeStep;
              
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(index)}
                  className={`relative flex-1 transition-all duration-500 ease-out ${
                    isActive ? 'scale-100' : 'scale-90 opacity-60'
                  }`}
                >
                  {/* Card */}
                  <div className={`relative rounded-2xl p-3 transition-all duration-500 ${
                    isActive 
                      ? `bg-gradient-to-br ${step.color} shadow-lg` 
                      : 'bg-card border border-border/50'
                  }`}>
                    {/* Icon */}
                    <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-white/25 backdrop-blur-sm' : step.lightBg
                    }`}>
                      <IconComponent className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-white' : 'text-foreground'
                      }`} />
                    </div>
                    
                    {/* Step Number */}
                    <div className={`mt-2 text-center font-display text-lg font-bold transition-colors ${
                      isActive ? 'text-white/90' : 'text-border'
                    }`}>
                      {step.step}
                    </div>
                  </div>

                  {/* Active Title Below */}
                  {isActive && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-[10px] font-body font-semibold text-foreground">
                        {step.title}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Connecting Line */}
          <div className="relative h-0.5 mx-6 mb-8 mt-8">
            <div className="absolute inset-0 bg-border rounded-full" />
            <div 
              className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
            />
            {/* Dots on line */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                  i <= activeStep ? 'bg-accent scale-100' : 'bg-border scale-75'
                }`}
                style={{ left: `${i * 33.33}%` }}
              />
            ))}
          </div>

          {/* Active Step Detail - Minimal */}
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-4">
            {/* Decorative gradient blob */}
            <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${steps[activeStep].color} opacity-20 blur-2xl transition-all duration-500`} />
            
            <div className="relative flex items-start gap-3">
              {/* Large Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${steps[activeStep].color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                {(() => {
                  const IconComponent = steps[activeStep].icon;
                  return <IconComponent className="w-6 h-6 text-white" />;
                })()}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {steps[activeStep].title} <span className="text-muted-foreground font-normal">{steps[activeStep].subtitle}</span>
                  </h3>
                </div>
                
                {/* Features as inline pills */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {steps[activeStep].features.map((feature) => (
                    <span
                      key={feature}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-body font-medium ${steps[activeStep].lightBg} text-foreground`}
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-accent" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Header */}
        <div 
          ref={headerAnim.ref}
          className={`hidden sm:block text-center mb-10 sm:mb-20 transition-all duration-700 ease-out ${
            headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-card/80 backdrop-blur-sm shadow-badge border border-border/50 mb-3 sm:mb-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-[10px] sm:text-sm font-medium text-foreground">Simple Process</span>
          </div>
          <h2 className="font-display text-2xl sm:text-5xl lg:text-6xl font-medium text-foreground mb-2 sm:mb-5">
            Rent a Ride in <br className="hidden sm:block" />
            <span className="text-accent">4 Easy Steps</span>
          </h2>
          <p className="font-body text-xs sm:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            A trust-first platform where verified students share vehicles safely within their hostel community.
          </p>
        </div>

        {/* Desktop/Tablet: Original Grid */}
        <div 
          ref={stepsAnim.ref}
          className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4"
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
                  {step.title} {step.subtitle}
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
