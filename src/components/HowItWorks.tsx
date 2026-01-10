import { Search, MapPin, Calendar, Bike } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Find a Bike",
      description: "Browse available bikes near you. Filter by type, price, and availability.",
    },
    {
      icon: Calendar,
      step: "02",
      title: "Book & Pay",
      description: "Reserve your bike instantly with secure payment. Message the owner directly.",
    },
    {
      icon: MapPin,
      step: "03",
      title: "Pick Up",
      description: "Meet the owner at the agreed location and get your bike with a quick handover.",
    },
    {
      icon: Bike,
      step: "04",
      title: "Ride & Return",
      description: "Enjoy your ride! Return the bike when done and leave a review.",
    },
  ];

  return (
    <section className="px-8 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-4">
            How it works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Rent a Bike in <span className="text-accent">4 Easy Steps</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Our peer-to-peer platform makes renting bikes simple, affordable, and community-driven.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group relative bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-badge transition-shadow duration-300"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-accent text-accent-foreground font-display text-sm font-semibold flex items-center justify-center">
                {step.step}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <step.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-medium text-foreground mb-2">
                {step.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
