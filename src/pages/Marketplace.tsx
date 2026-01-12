import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Fuel, 
  Users, 
  Settings,
  MapPin,
  Calendar,
  X,
  ChevronDown,
  Car,
  Bike,
  Zap,
  ArrowUpDown
} from "lucide-react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("relevance");

  const vehicleTypes = [
    { id: "car", name: "Cars", icon: Car },
    { id: "bike", name: "Bikes", icon: Bike },
    { id: "scooter", name: "Scooters", icon: Zap },
  ];

  const fuelTypes = ["Petrol", "Diesel", "Electric", "CNG"];

  const allVehicles = [
    {
      id: 1,
      name: "Tesla Model 3",
      type: "car",
      category: "Electric Sedan",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 128,
      price: 2499,
      fuel: "Electric",
      seats: 5,
      transmission: "Automatic",
      location: "Bangalore",
      owner: "Raj Motors",
      mileage: "400 km range",
      features: ["Autopilot", "Premium Sound", "Heated Seats"],
    },
    {
      id: 2,
      name: "BMW M4 Competition",
      type: "car",
      category: "Sports Coupe",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 96,
      price: 4999,
      fuel: "Petrol",
      seats: 4,
      transmission: "Automatic",
      location: "Mumbai",
      owner: "Luxury Wheels",
      mileage: "10 kmpl",
      features: ["M Sport Package", "Carbon Fiber Trim", "Launch Control"],
    },
    {
      id: 3,
      name: "Mercedes-AMG GT",
      type: "car",
      category: "Sports Car",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 84,
      price: 6999,
      fuel: "Petrol",
      seats: 2,
      transmission: "Automatic",
      location: "Delhi",
      owner: "Premium Rentals",
      mileage: "8 kmpl",
      features: ["AMG Performance", "Burmester Sound", "Sport Exhaust"],
    },
    {
      id: 4,
      name: "Royal Enfield Classic 350",
      type: "bike",
      category: "Cruiser",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 156,
      price: 499,
      fuel: "Petrol",
      seats: 2,
      transmission: "Manual",
      location: "Bangalore",
      owner: "Retro Riders",
      mileage: "35 kmpl",
      features: ["Classic Design", "Comfortable Seat", "Chrome Finish"],
    },
    {
      id: 5,
      name: "Honda Activa 6G",
      type: "scooter",
      category: "Scooter",
      image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 312,
      price: 299,
      fuel: "Petrol",
      seats: 2,
      transmission: "Automatic",
      location: "Chennai",
      owner: "City Commute",
      mileage: "50 kmpl",
      features: ["LED Headlamp", "USB Charging", "Under Seat Storage"],
    },
    {
      id: 6,
      name: "Tesla Model S",
      type: "car",
      category: "Electric Sedan",
      image: "https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 89,
      price: 2999,
      fuel: "Electric",
      seats: 5,
      transmission: "Automatic",
      location: "Hyderabad",
      owner: "EV Hub",
      mileage: "560 km range",
      features: ["Enhanced Autopilot", "Glass Roof", "Premium Interior"],
    },
    {
      id: 7,
      name: "Audi R8 V10",
      type: "car",
      category: "Supercar",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      rating: 5.0,
      reviews: 45,
      price: 8999,
      fuel: "Petrol",
      seats: 2,
      transmission: "Automatic",
      location: "Mumbai",
      owner: "Elite Motors",
      mileage: "7 kmpl",
      features: ["V10 Engine", "Quattro AWD", "Virtual Cockpit"],
    },
    {
      id: 8,
      name: "Harley Davidson Street 750",
      type: "bike",
      category: "Cruiser",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 203,
      price: 899,
      fuel: "Petrol",
      seats: 2,
      transmission: "Manual",
      location: "Pune",
      owner: "Thunder Rides",
      mileage: "18 kmpl",
      features: ["Liquid-Cooled", "LED Lighting", "ABS"],
    },
    {
      id: 9,
      name: "Ather 450X",
      type: "scooter",
      category: "Electric Scooter",
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 267,
      price: 399,
      fuel: "Electric",
      seats: 2,
      transmission: "Automatic",
      location: "Bangalore",
      owner: "Tech Rides",
      mileage: "85 km range",
      features: ["Smart Dashboard", "Fast Charging", "Ride Modes"],
    },
  ];

  const filteredVehicles = allVehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || vehicle.type === selectedType;
    const matchesFuel = !selectedFuel || vehicle.fuel === selectedFuel;
    const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    
    return matchesSearch && matchesType && matchesFuel && matchesPrice;
  });

  // Sort vehicles
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedFuel(null);
    setPriceRange([0, 10000]);
    setSearchQuery("");
  };

  const activeFiltersCount = [
    selectedType, 
    selectedFuel, 
    priceRange[0] > 0 || priceRange[1] < 10000
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 pt-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Vehicle <span className="text-primary">Marketplace</span>
            </h1>
            <p className="text-muted-foreground text-lg font-body">
              Find the perfect ride from our collection of {allVehicles.length}+ verified vehicles
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by vehicle name, type, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-card border-border text-foreground rounded-xl font-body"
              />
            </div>

            {/* Location */}
            <div className="relative lg:w-64">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Location"
                className="pl-12 h-14 bg-card border-border text-foreground rounded-xl font-body"
              />
            </div>

            {/* Date */}
            <div className="relative lg:w-64">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="date"
                className="pl-12 h-14 bg-card border-border text-foreground rounded-xl font-body"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? "default" : "outline"}
              size="lg"
              className="gap-2 h-14 font-body"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="mb-8 border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-8">
                  {/* Vehicle Type */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 font-body">Vehicle Type</h4>
                    <div className="flex gap-2">
                      {vehicleTypes.map((type) => (
                        <Button
                          key={type.id}
                          variant={selectedType === type.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                          className="gap-2 font-body"
                        >
                          <type.icon className="w-4 h-4" />
                          {type.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 font-body">Fuel Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {fuelTypes.map((fuel) => (
                        <Button
                          key={fuel}
                          variant={selectedFuel === fuel ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFuel(selectedFuel === fuel ? null : fuel)}
                          className="font-body"
                        >
                          {fuel}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 font-body">Price Range (₹/day)</h4>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-24 h-9 bg-background border-border font-body"
                      />
                      <span className="text-muted-foreground font-body">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-24 h-9 bg-background border-border font-body"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <div className="flex items-end">
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2 text-destructive font-body">
                        <X className="w-4 h-4" />
                        Clear All
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Count & Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <p className="text-muted-foreground font-body">
              Showing <span className="text-foreground font-semibold">{sortedVehicles.length}</span> of <span className="text-foreground font-semibold">{allVehicles.length}</span> vehicles
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm text-muted-foreground font-body">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedVehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-border bg-card hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-medium text-foreground font-body">{vehicle.rating}</span>
                    <span className="text-xs text-muted-foreground font-body">({vehicle.reviews})</span>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-foreground font-body">{vehicle.location}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Category & Owner */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider font-body">
                      {vehicle.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-body">
                      by {vehicle.owner}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-foreground mb-4 font-display">
                    {vehicle.name}
                  </h3>

                  {/* Specs */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Fuel className="w-4 h-4" />
                      <span className="text-sm font-body">{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-body">{vehicle.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-body">{vehicle.transmission}</span>
                    </div>
                  </div>

                  {/* Mileage */}
                  <p className="text-sm text-muted-foreground mb-4 font-body">
                    Mileage: <span className="text-foreground font-medium">{vehicle.mileage}</span>
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-md bg-secondary text-foreground font-body"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-2xl font-bold text-foreground font-display">₹{vehicle.price.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm font-body">/day</span>
                    </div>
                    <Link to={`/vehicle/${vehicle.id}`}>
                      <Button variant="default" size="sm" className="font-body">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {sortedVehicles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2 font-display">No vehicles found</h3>
              <p className="text-muted-foreground mb-6 font-body">
                Try adjusting your filters or search query
              </p>
              <Button variant="default" onClick={clearFilters} className="font-body">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
