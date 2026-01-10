import { Users, Bike, MapPin, Shield, Sparkles } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Riders",
      accent: true,
    },
    {
      icon: Bike,
      value: "12K+",
      label: "Bikes Listed",
      accent: false,
    },
    {
      icon: MapPin,
      value: "500+",
      label: "Cities Covered",
      accent: false,
    },
    {
      icon: Shield,
      value: "100%",
      label: "Insured Rides",
      accent: true,
    },
  ];

  return (
    <section className="px-8 py-16 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Floating label */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-sm shadow-badge border border-border/50">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-body text-sm font-medium text-foreground">Trusted by thousands</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative group text-center p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                stat.accent 
                  ? "bg-accent text-accent-foreground shadow-badge" 
                  : "bg-card shadow-card border border-border/50 hover:shadow-badge"
              }`}
            >
              {/* Decorative corner */}
              <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${stat.accent ? "bg-accent-foreground/20" : "bg-accent/30"}`} />
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
                stat.accent ? "bg-accent-foreground/10" : "bg-accent/10"
              }`}>
                <stat.icon className={`w-7 h-7 ${stat.accent ? "text-accent-foreground" : "text-accent"}`} />
              </div>
              <div className="font-display text-4xl sm:text-5xl font-semibold mb-2">
                {stat.value}
              </div>
              <div className={`font-body text-sm ${stat.accent ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
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
