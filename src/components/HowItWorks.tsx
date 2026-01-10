import { Search, MapPin, Calendar, Bike, ArrowRight, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Find a Bike",
      description: "Browse available bikes near you. Filter by type, price, and availability.",
      features: ["GPS Location", "Instant Search"],
    },
    {
      icon: Calendar,
      step: "02",
      title: "Book & Pay",
      description: "Reserve your bike instantly with secure payment. Message the owner directly.",
      features: ["Secure Payment", "Direct Chat"],
    },
    {
      icon: MapPin,
      step: "03",
      title: "Pick Up",
      description: "Meet the owner at the agreed location and get your bike with a quick handover.",
      features: ["Verified Owners", "Easy Handover"],
    },
    {
      icon: Bike,
      step: "04",
      title: "Ride & Return",
      description: "Enjoy your ride! Return the bike when done and leave a review.",
      features: ["24/7 Support", "Rate & Review"],
    },
  ];

  return (
    <section className="px-8 py-20 sm:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-sm shadow-badge border border-border/50 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-sm font-medium text-foreground">Simple Process</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground mb-5">
            Rent a Bike in <br className="hidden sm:block" />
            <span className="text-accent">4 Easy Steps</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Our peer-to-peer platform makes renting bikes simple, affordable, and community-driven.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group relative"
            >
              {/* Connector Arrow (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-16 -right-2 z-10 w-8 h-8 items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-card shadow-card border border-border flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              )}

              <div className="h-full bg-card rounded-3xl p-6 sm:p-7 shadow-card border border-border/50 hover:shadow-badge hover:-translate-y-2 transition-all duration-500">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <step.icon className="w-7 h-7 text-foreground group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <span className="font-display text-4xl font-bold text-border group-hover:text-accent/30 transition-colors">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-medium text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                  {step.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {step.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 text-xs font-body font-medium text-foreground"
                    >
                      <CheckCircle2 className="w-3 h-3 text-accent" />
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
