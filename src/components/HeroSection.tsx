import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import vespaHero from "@/assets/vespa-hero.png";
import vespaClassic from "@/assets/vespa-classic.png";
import vespaRetro from "@/assets/vespa-retro.png";
import vespaManual from "@/assets/vespa-manual.png";

const HeroSection = () => {
  const categories = [
    { name: "Classic", image: vespaClassic },
    { name: "Retro", image: vespaRetro },
    { name: "Manual", image: vespaManual },
  ];

  const tags = ["Vespa", "Matic", "Retro", "Elegant", "Energy", "Speed"];

  return (
    <section className="px-8 pb-8">
      <div className="grid grid-cols-12 gap-8 min-h-[calc(100vh-120px)]">
        {/* Left Column */}
        <div className="col-span-5 flex flex-col justify-between py-4">
          {/* Hero Title */}
          <div>
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-foreground">
              Feel True{" "}
              <span className="inline-flex items-center gap-1 mx-2">
                <span className="w-10 h-10 rounded-full bg-olive overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="w-10 h-10 rounded-full bg-olive overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="w-10 h-10 rounded-full bg-olive overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </span>
              </span>
              <br />
              Comfort With
              <br />
              Vespa Matic -
              <br />
              Follow Elegant
            </h1>

            {/* Scroll Indicator */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <div className="w-4 h-8 rounded-full border-2 border-muted-foreground/50 flex flex-col items-center pt-1">
                  <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-6">
            {/* Description */}
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-olive rounded-sm mt-1" />
              <p className="text-xs font-body text-muted-foreground uppercase leading-relaxed tracking-wide max-w-[200px]">
                VESPA MATIC IS AN ENVIRONMENTALLY FRIENDLY CHOICE WITH AN ENGINE THAT IS EFFICIENT IN FUEL CONSUMPTION.
              </p>
            </div>

            {/* Category Cards */}
            <div className="flex gap-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative group cursor-pointer"
                >
                  <div className="w-32 h-28 rounded-2xl overflow-hidden shadow-card bg-card">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card shadow-badge flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-foreground" />
                  </div>
                  <p className="text-center mt-3 font-body text-sm font-medium text-foreground">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
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
            <div className="flex items-center justify-between text-muted-foreground/40 text-xs font-body pt-4">
              <span>+ + +</span>
              <span>+ +</span>
            </div>
          </div>
        </div>

        {/* Right Column - Hero Image */}
        <div className="col-span-7 relative">
          <div className="relative h-full rounded-3xl overflow-hidden">
            <img
              src={vespaHero}
              alt="Vespa Matic"
              className="w-full h-full object-cover"
            />

            {/* Vespa Matic Badge */}
            <div className="absolute top-6 left-6 bg-card/95 backdrop-blur-sm rounded-full px-4 py-3 shadow-badge flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-body uppercase tracking-[0.2em] text-foreground font-medium [writing-mode:vertical-rl] rotate-180">
                  VESPA MATIC
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-foreground" />
              </div>
            </div>

            {/* Soft Touch Badge */}
            <div className="absolute top-1/3 right-1/3 bg-card/95 backdrop-blur-sm rounded-full px-5 py-3 shadow-badge flex items-center gap-3 animate-float">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                </svg>
              </div>
              <span className="font-body text-sm">
                <span className="font-semibold">Soft</span>
                <span className="text-muted-foreground">/Touch</span>
              </span>
            </div>

            {/* Speed Badge */}
            <div className="absolute bottom-1/3 right-8 bg-card/95 backdrop-blur-sm rounded-full px-5 py-3 shadow-badge flex items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <span className="font-body text-sm">
                <span className="font-semibold">128km</span>
                <span className="text-muted-foreground">/Hour</span>
              </span>
            </div>

            {/* Tags */}
            <div className="absolute bottom-8 right-8 flex flex-wrap gap-2 max-w-[200px] justify-end">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm text-xs font-body font-medium text-foreground shadow-card"
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
