import { Users, Bike, MapPin, Shield, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Stats = () => {
  const headerAnim = useScrollAnimation();
  const cardsAnim = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' });

  const stats = [
    {
      icon: Users,
      value: "2K+",
      label: "Verified Students",
      accent: true,
    },
    {
      icon: Bike,
      value: "500+",
      label: "Vehicles Listed",
      accent: false,
    },
    {
      icon: MapPin,
      value: "50+",
      label: "Hostels Covered",
      accent: false,
    },
    {
      icon: Shield,
      value: "100%",
      label: "ID Verified",
      accent: true,
    },
  ];

  return (
    <section className="px-4 sm:px-8 py-12 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Floating label */}
        <div 
          ref={headerAnim.ref}
          className={`flex justify-center mb-8 sm:mb-10 transition-all duration-700 ease-out ${
            headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-card/80 backdrop-blur-sm shadow-badge border border-border/50">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            <span className="font-body text-xs sm:text-sm font-medium text-foreground">Trusted by students</span>
          </div>
        </div>

        <div 
          ref={cardsAnim.ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative group text-center p-4 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                stat.accent 
                  ? "bg-accent text-accent-foreground shadow-badge" 
                  : "bg-card shadow-card border border-border/50 hover:shadow-badge"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Decorative corner */}
              <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${stat.accent ? "bg-accent-foreground/20" : "bg-accent/30"}`} />
              
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-5 ${
                stat.accent ? "bg-accent-foreground/10" : "bg-accent/10"
              }`}>
                <stat.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${stat.accent ? "text-accent-foreground" : "text-accent"}`} />
              </div>
              <div className="font-display text-2xl sm:text-5xl font-semibold mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className={`font-body text-[10px] sm:text-sm ${stat.accent ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
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
