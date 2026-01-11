import { Star, ArrowUpRight, Heart, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import vespaClassic from "@/assets/vespa-classic.png";
import vespaRetro from "@/assets/vespa-retro.png";
import vespaManual from "@/assets/vespa-manual.png";

const FeaturedBikes = () => {
  const headerAnim = useScrollAnimation();
  const cardsAnim = useScrollAnimation({ rootMargin: '0px 0px -50px 0px' });

  const bikes = [
    {
      id: 1,
      name: "Honda Activa 6G",
      type: "Scooty",
      price: 25,
      rating: 4.9,
      reviews: 42,
      image: vespaClassic,
      owner: "Rahul K.",
      ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      location: "Boys Hostel A",
      available: true,
    },
    {
      id: 2,
      name: "Royal Enfield Classic",
      type: "Bike",
      price: 40,
      rating: 4.8,
      reviews: 28,
      image: vespaRetro,
      owner: "Priya S.",
      ownerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      location: "Girls Hostel B",
      available: true,
    },
    {
      id: 3,
      name: "TVS Jupiter",
      type: "Scooty",
      price: 20,
      rating: 4.9,
      reviews: 56,
      image: vespaManual,
      owner: "Amit P.",
      ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      location: "Boys Hostel C",
      available: false,
    },
  ];

  return (
    <section className="px-4 sm:px-8 py-12 sm:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div 
          ref={headerAnim.ref}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16 transition-all duration-700 ease-out ${
            headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-card shadow-badge border border-border/50 mb-4 sm:mb-6">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent fill-accent" />
              <span className="font-body text-xs sm:text-sm font-medium text-foreground">Top Rated</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium text-foreground">
              Popular Rides <br className="hidden sm:block" />
              <span className="text-accent">In Your Hostel</span>
            </h2>
          </div>
          <button className="self-start lg:self-auto group px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-body text-xs sm:text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2 shadow-nav">
            View All
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bikes Grid */}
        <div 
          ref={cardsAnim.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {bikes.map((bike, index) => (
            <div
              key={bike.id}
              className={`group bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-card border border-border/50 hover:shadow-badge hover:-translate-y-2 transition-all duration-500 ${
                cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-44 sm:h-64 overflow-hidden">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Type badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card/90 backdrop-blur-sm text-[10px] sm:text-xs font-body font-medium text-foreground shadow-card">
                  {bike.type}
                </div>

                {/* Availability badge */}
                <div className={`absolute top-3 sm:top-4 right-10 sm:right-14 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full backdrop-blur-sm text-[10px] sm:text-xs font-body font-medium shadow-card ${
                  bike.available ? "bg-accent/90 text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {bike.available ? "Available" : "Booked"}
                </div>
                
                {/* Like button */}
                <button className="absolute top-3 sm:top-4 right-3 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-card transition-colors">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                </button>

                {/* Owner avatar */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-card/90 backdrop-blur-sm shadow-card">
                  <img src={bike.ownerImage} alt={bike.owner} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover" />
                  <span className="font-body text-[10px] sm:text-xs font-medium text-foreground">{bike.owner}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Rating & Location */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                    <span className="font-body text-xs sm:text-sm font-semibold text-foreground">{bike.rating}</span>
                    <span className="font-body text-[10px] sm:text-xs text-muted-foreground">({bike.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="font-body text-[10px] sm:text-xs">{bike.location}</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-display text-lg sm:text-xl font-medium text-foreground mb-3 sm:mb-4">
                  {bike.name}
                </h3>

                {/* Price & CTA */}
                <div className="flex items-end justify-between pt-3 sm:pt-4 border-t border-border">
                  <div>
                    <span className="font-display text-xl sm:text-3xl font-semibold text-foreground">₹{bike.price}</span>
                    <span className="font-body text-xs sm:text-sm text-muted-foreground">/day</span>
                  </div>
                  <button className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent text-accent-foreground font-body text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity shadow-card">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBikes;
