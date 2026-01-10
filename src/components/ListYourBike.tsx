import { ArrowUpRight, Wallet, Shield, Clock, Star } from "lucide-react";

const ListYourBike = () => {
  const benefits = [
    {
      icon: Wallet,
      title: "Earn Extra Income",
      description: "Turn your idle bike into a money-making machine. Earn up to ₹15,000/month.",
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Every rental is covered by our comprehensive insurance policy.",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "You control when your bike is available. Block dates anytime.",
    },
    {
      icon: Star,
      title: "Verified Riders",
      description: "All riders are verified with ID and have ratings from previous rentals.",
    },
  ];

  return (
    <section className="px-8 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-xs font-body font-medium text-accent uppercase tracking-wider mb-4">
              Become a Host
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6">
              List Your Bike & <br /><span className="text-accent">Start Earning</span>
            </h2>
            <p className="font-body text-muted-foreground mb-8 max-w-md">
              Join thousands of bike owners who are earning passive income by sharing their bikes with the Chai Dew community.
            </p>

            <button className="px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-nav">
              List Your Bike Free
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right - Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-badge transition-shadow duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListYourBike;
