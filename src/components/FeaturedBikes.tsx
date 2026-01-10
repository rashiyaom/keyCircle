import { Star, ArrowUpRight } from "lucide-react";
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
      location: "Koramangala, Bangalore",
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
      location: "Indiranagar, Bangalore",
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
      location: "HSR Layout, Bangalore",
    },
  ];

  return (
    <section className="px-8 py-16 sm:py-24 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-card text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-4 shadow-card">
              Featured Bikes
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground">
              Popular Near <span className="text-accent">You</span>
            </h2>
          </div>
          <button className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            View All Bikes
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <div
              key={bike.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:shadow-badge transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-body font-medium text-foreground">
                  {bike.type}
                </div>
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-body text-sm font-medium text-foreground">{bike.rating}</span>
                  <span className="font-body text-xs text-muted-foreground">({bike.reviews} reviews)</span>
                </div>

                {/* Name & Owner */}
                <h3 className="font-display text-lg font-medium text-foreground mb-1">
                  {bike.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  by {bike.owner} • {bike.location}
                </p>

                {/* Price */}
                <div className="flex items-end justify-between pt-3 border-t border-border">
                  <div>
                    <span className="font-display text-2xl font-semibold text-foreground">₹{bike.price}</span>
                    <span className="font-body text-sm text-muted-foreground">/day</span>
                  </div>
                  <button className="px-4 py-2 rounded-full bg-accent text-accent-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity">
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
