import { Users, Bike, MapPin, Shield } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Riders",
    },
    {
      icon: Bike,
      value: "12K+",
      label: "Bikes Listed",
    },
    {
      icon: MapPin,
      value: "500+",
      label: "Cities Covered",
    },
    {
      icon: Shield,
      value: "100%",
      label: "Insured Rides",
    },
  ];

  return (
    <section className="px-8 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-card shadow-card border border-border/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <div className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="font-body text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
