import { Star, ArrowUpRight, Heart, MapPin } from "lucide-react";
import bikeCity from "@/assets/bike-city.png";
import bikeMountain from "@/assets/bike-mountain.png";
import bikeElectric from "@/assets/bike-electric.png";

const FeaturedBikes = () => {
  const bikes = [
    {
      id: 1,
      name: "Urban Cruiser Pro",
      type: "City Bike",
      price: 99,
      rating: 4.9,
      reviews: 124,
      image: bikeCity,
      owner: "Rahul K.",
      ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      location: "Koramangala",
      available: true,
    },
    {
      id: 2,
      name: "Trail Master X500",
      type: "Mountain Bike",
      price: 199,
      rating: 4.8,
      reviews: 89,
      image: bikeMountain,
      owner: "Priya S.",
      ownerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      location: "Indiranagar",
      available: true,
    },
    {
      id: 3,
      name: "EcoDrive Electric",
      type: "Electric Bike",
      price: 149,
      rating: 4.9,
      reviews: 156,
      image: bikeElectric,
      owner: "Amit P.",
      ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      location: "HSR Layout",
      available: false,
    },
  ];

  return (
    <section className="px-8 py-20 sm:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card shadow-badge border border-border/50 mb-6">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="font-body text-sm font-medium text-foreground">Top Rated</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground">
              Popular Bikes <br className="hidden sm:block" />
              <span className="text-accent">Near You</span>
            </h2>
          </div>
          <button className="self-start lg:self-auto group px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2 shadow-nav">
            View All Bikes
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <div
              key={bike.id}
              className="group bg-card rounded-3xl overflow-hidden shadow-card border border-border/50 hover:shadow-badge hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Type badge */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm text-xs font-body font-medium text-foreground shadow-card">
                  {bike.type}
                </div>

                {/* Availability badge */}
                <div className={`absolute top-4 right-14 px-3 py-2 rounded-full backdrop-blur-sm text-xs font-body font-medium shadow-card ${
                  bike.available ? "bg-accent/90 text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {bike.available ? "Available" : "Booked"}
                </div>
                
                {/* Like button */}
                <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-card transition-colors">
                  <Heart className="w-4 h-4 text-foreground" />
                </button>

                {/* Owner avatar */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-card/90 backdrop-blur-sm shadow-card">
                  <img src={bike.ownerImage} alt={bike.owner} className="w-6 h-6 rounded-full object-cover" />
                  <span className="font-body text-xs font-medium text-foreground">{bike.owner}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating & Location */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-body text-sm font-semibold text-foreground">{bike.rating}</span>
                    <span className="font-body text-xs text-muted-foreground">({bike.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-body text-xs">{bike.location}</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-display text-xl font-medium text-foreground mb-4">
                  {bike.name}
                </h3>

                {/* Price & CTA */}
                <div className="flex items-end justify-between pt-4 border-t border-border">
                  <div>
                    <span className="font-display text-3xl font-semibold text-foreground">₹{bike.price}</span>
                    <span className="font-body text-sm text-muted-foreground">/day</span>
                  </div>
                  <button className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity shadow-card">
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
