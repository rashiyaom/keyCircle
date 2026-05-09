import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, MapPin, Fuel, Users, Settings, Car, Bike, Zap, X, ChevronDown, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("relevance");
  const [allVehicles, setAllVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch vehicles (mock data)
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call later
        const mockVehicles = [
          {
            id: 1,
            name: "Honda City",
            type: "car",
            category: "Car",
            image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop",
            rating: 4.8,
            reviews: 120,
            price: 1200,
            fuel: "Petrol",
            seats: 5,
            transmission: "Automatic",
            location: "Bangalore",
            owner: "Rajesh Kumar",
            mileage: "12 km/l",
            features: ["AC", "Power Steering", "ABS"],
          },
          {
            id: 2,
            name: "Royal Enfield Bullet",
            type: "bike",
            category: "Bike",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
            rating: 4.6,
            reviews: 95,
            price: 400,
            fuel: "Petrol",
            seats: 2,
            transmission: "Manual",
            location: "Bangalore",
            owner: "Arjun Singh",
            mileage: "35 km/l",
            features: ["Kickstart", "Classic Design"],
          },
          {
            id: 3,
            name: "Bajaj Pulsar",
            type: "bike",
            category: "Bike",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
            rating: 4.5,
            reviews: 85,
            price: 350,
            fuel: "Petrol",
            seats: 2,
            transmission: "Manual",
            location: "Bangalore",
            owner: "Vikram Patil",
            mileage: "40 km/l",
            features: ["Digital Display", "LED Lights"],
          },
          {
            id: 4,
            name: "Hyundai i20",
            type: "car",
            category: "Car",
            image: "https://images.unsplash.com/photo-1555109307-f7d9daaf91e1?w=800&h=600&fit=crop",
            rating: 4.7,
            reviews: 110,
            price: 1100,
            fuel: "Diesel",
            seats: 5,
            transmission: "Manual",
            location: "Bangalore",
            owner: "Priya Sharma",
            mileage: "15 km/l",
            features: ["AC", "Power Windows", "ABS"],
          },
          {
            id: 5,
            name: "Ather 450X",
            type: "scooter",
            category: "Scooter",
            image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
            rating: 4.9,
            reviews: 150,
            price: 300,
            fuel: "Electric",
            seats: 2,
            transmission: "Automatic",
            location: "Bangalore",
            owner: "Suresh Kumar",
            mileage: "100 km/charge",
            features: ["Fast Charging", "GPS Navigation"],
          },
          {
            id: 6,
            name: "TVS Jupiter",
            type: "scooter",
            category: "Scooter",
            image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
            rating: 4.4,
            reviews: 75,
            price: 250,
            fuel: "Petrol",
            seats: 2,
            transmission: "Automatic",
            location: "Bangalore",
            owner: "Meena Devi",
            mileage: "50 km/l",
            features: ["Fuel Efficient", "Comfortable"],
          },
        ];

        setAllVehicles(mockVehicles);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const vehicleTypes = [
    { id: "all", name: "All Vehicles", icon: Car },
    { id: "car", name: "Cars", icon: Car },
    { id: "bike", name: "Bikes", icon: Bike },
    { id: "scooter", name: "Scooters", icon: Zap },
  ];

  const fuelTypes = ["Petrol", "Diesel", "Electric", "CNG"];

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
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Loading vehicles...</p>
              </div>
            ) : sortedVehicles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">No vehicles found matching your criteria.</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              sortedVehicles.map((vehicle) => (
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
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
