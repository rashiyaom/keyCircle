import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import bikeHero from "@/assets/68ad479faa0c4d1a27bb8441e611cbef.jpg";
import vespaClassic from "@/assets/vespa-classic.png";
import vespaRetro from "@/assets/vespa-retro.png";
import vespaManual from "@/assets/vespa-manual.png";

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Scroll animations
  const titleAnim = useScrollAnimation();
  const imageAnim = useScrollAnimation();
  const sliderAnim = useScrollAnimation();

  // Auto-rotate categories
  useEffect(() => {
    if (isHovered || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, isPlaying]);

  const categories = [
    { 
      name: "Classic", 
      image: vespaClassic,
      heroImage: bikeHero,
      tags: ["Vespa", "Matic", "Retro", "Elegant", "Energy", "Speed"]
    },
    { 
      name: "Retro", 
      image: vespaRetro,
      heroImage: vespaRetro,
      tags: ["Retro", "Vintage", "Cool", "Stylish", "Unique", "Bold"]
    },
    { 
      name: "Manual", 
      image: vespaManual,
      heroImage: vespaManual,
      tags: ["Manual", "Control", "Power", "Sporty", "Dynamic", "Free"]
    },
  ];

  const currentCategory = categories[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-4 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2 sm:py-4 lg:py-6">
          {/* Hero Title */}
          <div 
            ref={titleAnim.ref}
            className={`transition-all duration-1000 ease-out ${
              titleAnim.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.05] tracking-tight text-foreground">
              Feel True
              <span className="inline-flex items-center mx-1.5 sm:mx-2 align-middle">
                <span className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-foreground/5 border border-foreground/10">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-body text-[10px] sm:text-xs font-medium text-muted-foreground">2.4k+</span>
                </span>
              </span>
              <br />
              Comfort With
              <br />
              Chaavi Deh -
              <br />
              Follow Elegant
            </h1>

            {/* Scroll Indicator - Hidden on mobile */}
            <div className="mt-4 sm:mt-8 hidden sm:block">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <div className="w-4 h-6 sm:w-5 sm:h-7 rounded-full border-2 border-muted-foreground/40 flex flex-col items-center justify-start pt-1.5">
                  <div className="w-1 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div 
            ref={sliderAnim.ref}
            className={`mt-4 sm:mt-8 lg:mt-0 transition-all duration-1000 delay-300 ease-out ${
              sliderAnim.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Description and Interactive Element Row */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 lg:gap-8">
              {/* Description Text - Hidden on small mobile */}
              <div className="hidden sm:block flex-shrink-0 max-w-[100px] sm:max-w-[120px]">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#a3b87c] rounded-sm mt-1 flex-shrink-0" />
                  <p className="text-[7px] sm:text-[9px] font-body text-muted-foreground uppercase leading-relaxed tracking-wide">
                    CHAAVI DEH IS YOUR TRUSTED PLATFORM FOR STUDENT VEHICLE SHARING.
                  </p>
                </div>
              </div>

              {/* Category Thumbnails with Slider */}
              <div 
                className="relative flex-1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Desktop Layout - Clean minimal thumbnails */}
                <div className="hidden sm:flex items-center gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={category.name}
                      onClick={() => setActiveIndex(index)}
                      className="relative group"
                    >
                      <div className={`relative w-16 h-20 rounded-lg overflow-hidden transition-all duration-300 ease-out ${
                        activeIndex === index 
                          ? 'ring-2 ring-foreground/20 ring-offset-2' 
                          : 'opacity-50 hover:opacity-80'
                      }`}>
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-body font-medium text-white/90">
                          {category.name}
                        </span>
                      </div>
                    </button>
                  ))}
                  
                  {/* Play/Pause Button - Desktop */}
                  <button 
                    onClick={togglePlay}
                    className="ml-2 w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground hover:text-background flex items-center justify-center transition-all duration-200"
                  >
                    {isPlaying ? (
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-2.5 bg-current rounded-full" />
                        <div className="w-0.5 h-2.5 bg-current rounded-full" />
                      </div>
                    ) : (
                      <div className="w-0 h-0 border-l-[6px] border-l-current border-y-[4px] border-y-transparent ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Mobile Layout - Compact and clean */}
                <div className="sm:hidden">
                  {/* Top row: Thumbnails */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {categories.map((category, index) => (
                      <button
                        key={category.name}
                        onClick={() => setActiveIndex(index)}
                        className="relative"
                      >
                        <div className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                          activeIndex === index 
                            ? 'ring-2 ring-foreground/20' 
                            : 'opacity-40'
                        }`}>
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </button>
                    ))}
                    
                    {/* Play Button - Mobile */}
                    <button 
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center ml-1"
                    >
                      {isPlaying ? (
                        <div className="flex gap-0.5">
                          <div className="w-0.5 h-2 bg-background rounded-full" />
                          <div className="w-0.5 h-2 bg-background rounded-full" />
                        </div>
                      ) : (
                        <div className="w-0 h-0 border-l-[5px] border-l-background border-y-[3px] border-y-transparent ml-0.5" />
                      )}
                    </button>
                  </div>
                  
                  {/* Bottom row: Category names in 2-column grid */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {categories.map((category, index) => (
                      <button
                        key={`btn-${category.name}`}
                        onClick={() => setActiveIndex(index)}
                        className={`py-1.5 px-2 rounded-lg text-[10px] font-body font-medium transition-all duration-200 ${
                          activeIndex === index 
                            ? 'bg-foreground text-background' 
                            : 'bg-foreground/5 text-foreground/60'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination - Desktop only */}
            <div className="hidden sm:flex items-center justify-between mt-3 sm:mt-4">
              <div className="font-body text-sm sm:text-lg">
                <span className="font-semibold text-foreground">{activeIndex + 1}</span>
                <span className="text-muted-foreground/50">/</span>
                <span className="text-muted-foreground/50 text-xs sm:text-sm">{categories.length}</span>
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                <button 
                  onClick={handlePrev}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-border/40 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-border/40 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Footer Decorations - Hidden on mobile */}
            <div className="hidden sm:flex items-center justify-between text-muted-foreground/30 text-[10px] font-body mt-4">
              <span>+ + +</span>
              <span>+ +</span>
            </div>
          </div>
        </div>

        {/* Right Column - Hero Image */}
        <div 
          ref={imageAnim.ref}
          className={`lg:col-span-7 relative order-first lg:order-last transition-all duration-1000 delay-200 ease-out ${
            imageAnim.isVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-8 scale-95'
          }`}
        >
          <div className="relative h-[280px] xs:h-[340px] sm:h-[480px] lg:h-[calc(100vh-140px)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
            {/* Main Hero Image */}
            <img
              key={activeIndex}
              src={currentCategory.heroImage}
              alt={`Chaavi Deh - ${currentCategory.name}`}
              className="w-full h-full object-cover object-center animate-fade-in"
            />

            {/* Chaavi Deh Badge - Circular Text */}
            <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-20">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
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
                    style={{ fontSize: '7.5px', letterSpacing: '0.12em' }}
                    fill="currentColor"
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      CHAAVI DEH • CHAAVI DEH • CHAAVI DEH • CHAAVI DEH •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tags - Compact minimal pills */}
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-20">
              <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-end max-w-[120px] sm:max-w-[160px]">
                {currentCategory.tags.slice(0, 4).map((tag) => (
                  <span
                    key={`${activeIndex}-${tag}`}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/80 text-[8px] sm:text-[10px] font-body font-medium text-stone-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
