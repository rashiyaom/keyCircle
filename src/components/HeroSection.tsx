import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Clock, Shield } from "lucide-react";
import bikeHero from "@/assets/68ad479faa0c4d1a27bb8441e611cbef.jpg";
import bikeCity from "@/assets/bike-city.png";
import bikeMountain from "@/assets/bike-mountain.png";
import bikeElectric from "@/assets/bike-electric.png";

const HeroSection = () => {
  const categories = [
    { name: "City", image: bikeCity },
    { name: "Mountain", image: bikeMountain },
    { name: "Electric", image: bikeElectric },
  ];

  const tags = ["Rent", "Share", "Explore", "Connect", "Earn", "Ride"];

  return (
    <section className="px-8 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-120px)]">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between py-4">
          {/* Hero Title */}
          <div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-foreground">
              Rent Bikes{" "}
              <span className="inline-flex items-center gap-1 mx-2">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </span>
              </span>
              <br />
              From Your
              <br />
              Neighbors -
              <br />
              <span className="text-accent">Ride Together</span>
            </h1>

            {/* Scroll Indicator */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <div className="w-4 h-7 rounded-full border-2 border-muted-foreground/50 flex flex-col items-center pt-1">
                  <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                </div>
              </div>
              <span className="text-sm font-body text-muted-foreground hidden sm:block">Scroll to explore</span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-6 mt-8 lg:mt-0">
            {/* Description */}
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-accent rounded-sm mt-1 flex-shrink-0" />
              <p className="text-xs font-body text-muted-foreground uppercase leading-relaxed tracking-wide max-w-[220px]">
                CHAVI DEH IS A PEER-TO-PEER PLATFORM CONNECTING BIKE OWNERS WITH RIDERS IN YOUR COMMUNITY.
              </p>
            </div>

            {/* Category Cards */}
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative group cursor-pointer flex-shrink-0"
                >
                  <div className="w-28 sm:w-32 h-24 sm:h-28 rounded-2xl overflow-hidden shadow-card bg-card border border-border/50">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card shadow-badge flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-border">
                    <ArrowUpRight className="w-3.5 h-3.5 text-foreground" />
                  </div>
                  <p className="text-center mt-3 font-body text-sm font-medium text-foreground">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2">
              <div className="font-body text-lg">
                <span className="font-semibold text-foreground">2</span>
                <span className="text-muted-foreground">/15</span>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            {/* Footer Decorations */}
            <div className="flex items-center justify-between text-muted-foreground/40 text-xs font-body pt-2">
              <span>+ + +</span>
              <span>+ +</span>
            </div>
          </div>
        </div>

        {/* Right Column - Hero Image */}
        <div className="lg:col-span-7 relative order-first lg:order-last">
          <div className="relative h-[400px] sm:h-[500px] lg:h-full rounded-3xl overflow-hidden">
            <img
              src={bikeHero}
              alt="Chavi Deh Bike Rental"
              className="w-full h-full object-cover"
            />

            {/* Chavi Deh Badge - Circular Text */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                {/* Rotating circular text */}
                <svg 
                  className="w-full h-full animate-spin-slow" 
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                      fill="none"
                    />
                  </defs>
                  <text 
                    className="font-body font-semibold uppercase"
                    style={{ fontSize: '8.5px', letterSpacing: '0.15em' }}
                    fill="currentColor"
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      CHAVI DEH • BIKE RENTAL • CHAVI DEH • BIKE RENTAL •
                    </textPath>
                  </text>
                </svg>
                {/* Center arrow button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card shadow-badge flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Badge */}
            <div className="absolute top-1/4 sm:top-1/3 right-4 sm:right-1/4 bg-card/95 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2.5 sm:py-3 shadow-badge flex items-center gap-2 sm:gap-3 animate-float">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent flex items-center justify-center">
                <MapPin className="w-3 h-3 text-accent-foreground" />
              </div>
              <span className="font-body text-xs sm:text-sm">
                <span className="font-semibold">500+</span>
                <span className="text-muted-foreground">/Cities</span>
              </span>
            </div>

            {/* Hourly Rate Badge */}
            <div className="absolute bottom-1/3 right-4 sm:right-8 bg-card/95 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2.5 sm:py-3 shadow-badge flex items-center gap-2 sm:gap-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center">
                <Clock className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-body text-xs sm:text-sm">
                <span className="font-semibold">From ₹49</span>
                <span className="text-muted-foreground">/Hour</span>
              </span>
            </div>

            {/* Insurance Badge */}
            <div className="absolute top-1/2 left-4 sm:left-8 bg-card/95 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2.5 sm:py-3 shadow-badge flex items-center gap-2 sm:gap-3 animate-float" style={{ animationDelay: "2s" }}>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent flex items-center justify-center">
                <Shield className="w-3 h-3 text-accent-foreground" />
              </div>
              <span className="font-body text-xs sm:text-sm">
                <span className="font-semibold">Insured</span>
                <span className="text-muted-foreground">/Rides</span>
              </span>
            </div>

            {/* Tags */}
            <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex flex-wrap gap-2 max-w-[180px] sm:max-w-[200px] justify-end">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card/80 backdrop-blur-sm text-xs font-body font-medium text-foreground shadow-card"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
