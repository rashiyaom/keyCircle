import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, ShoppingCart, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bikeHero from "@/assets/68ad479faa0c4d1a27bb8441e611cbef.jpg";

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
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [displayedCards, setDisplayedCards] = useState([0, 1, 2]);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Scroll animations
  const titleAnim = useScrollAnimation();
  const imageAnim = useScrollAnimation();
  const sliderAnim = useScrollAnimation();

  // Track scroll position for navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileNavItems = ["Home", "Product", "About", "Pricing"];

  // 15 categories with web images
  const categories = [
    { 
      name: "Classic", 
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      heroImage: bikeHero,
    },
    { 
      name: "Retro", 
      image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&h=800&fit=crop",
    },
    { 
      name: "Manual", 
      image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop",
    },
    { 
      name: "Sport", 
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop",
    },
    { 
      name: "Cruiser", 
      image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=1200&h=800&fit=crop",
    },
    { 
      name: "Electric", 
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=400&fit=crop", // Electric scooter
      heroImage: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop",
    },
    { 
      name: "Vintage", 
      image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?w=400&h=400&fit=crop", // Vintage motorcycle
      heroImage: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?w=1200&h=800&fit=crop",
    },
    { 
      name: "Urban", 
      image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=400&h=400&fit=crop", // Urban bike
      heroImage: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=1200&h=800&fit=crop",
    },
    { 
      name: "Adventure", 
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&h=800&fit=crop",
    },
    { 
      name: "Touring", 
      image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1200&h=800&fit=crop",
    },
    { 
      name: "Cafe", 
      image: "https://images.unsplash.com/photo-1558980664-2506fca6bfc2?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1558980664-2506fca6bfc2?w=1200&h=800&fit=crop",
    },
    { 
      name: "Scrambler", 
      image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=1200&h=800&fit=crop",
    },
    { 
      name: "Naked", 
      image: "https://images.unsplash.com/photo-1558980664-ce6960be307d?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1558980664-ce6960be307d?w=1200&h=800&fit=crop",
    },
    { 
      name: "Chopper", 
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&h=800&fit=crop",
    },
    { 
      name: "Bobber", 
      image: "https://images.unsplash.com/photo-1558980664-1db506751c6c?w=400&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1558980664-1db506751c6c?w=1200&h=800&fit=crop",
    },
  ];

  const currentCategory = categories[activeIndex];

  // Update displayed cards when active index changes
  useEffect(() => {
    const total = categories.length;
    const prev = (activeIndex - 1 + total) % total;
    const next = (activeIndex + 1) % total;
    setDisplayedCards([prev, activeIndex, next]);
  }, [activeIndex, categories.length]);

  // Auto-rotate categories
  useEffect(() => {
    if (isHovered || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, isPlaying, categories.length]);

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
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-0 pt-16 sm:pt-6 lg:pb-6">
      <div className={`sm:hidden fixed z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'top-3 left-3 right-3 bg-white/70 backdrop-blur-xl shadow-lg shadow-black/10 border border-white/60 rounded-2xl px-4 py-2.5' 
          : 'top-0 left-0 right-0 bg-background/95 backdrop-blur-sm shadow-sm border-b border-stone-100 px-4 py-3'
      }`}>
        <div className="flex items-center justify-between gap-2">
          {/* Logo - Left side */}
          <span className="font-display text-base font-semibold text-foreground whitespace-nowrap">keyCircle</span>
          
          {/* Navigation Pills - Center */}
          <div className={`flex items-center gap-0.5 rounded-full p-1 transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/50 backdrop-blur-sm shadow-inner border border-white/40' 
              : 'bg-stone-200 shadow-sm'
          }`}>
            {mobileNavItems.map((item, index) => (
              <button
                key={item}
                className={`px-2.5 py-1.5 rounded-full text-[10px] font-medium font-body transition-all duration-300 ${
                  index === 0
                    ? "bg-stone-800 text-white"
                    : "text-stone-700 hover:bg-stone-300/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1.5">
            {/* Sign In Button */}
            <button 
              onClick={() => navigate('/auth')}
              className="w-8 h-8 rounded-full bg-accent flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Sign In"
            >
              <LogIn className="w-3.5 h-3.5 text-accent-foreground" />
            </button>
            
            {/* Cart Button */}
            <button className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center active:scale-95 transition-transform">
              <ShoppingCart className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Bottom Panel - Description + Cards in same container */}
      <div className="hidden lg:flex absolute bottom-[10%] left-8 z-40" style={{ width: '63%' }}>
        {/* Single Container for Description + Cards + Count/Arrows - Blends with website background */}
        <div className="bg-background rounded-[24px] p-5 flex items-center gap-8 w-full">
          {/* Description Text - Inside container on the left */}
          <div className="flex items-start gap-2.5 max-w-[180px] border-r border-stone-300/50 pr-8">
            <div className="w-2.5 h-2.5 bg-[#a3b87c] rounded-sm mt-1 flex-shrink-0" />
            <p className="text-[11px] font-body text-stone-800 uppercase leading-[1.7] tracking-wide font-semibold">
              keyCircle is the trusted platform for verified student vehicle sharing—secure, convenient, and community-driven.
            </p>
          </div>

          {/* Interactive Middle Element - Fills the gap */}
          <div className="flex flex-col items-center justify-center gap-3 px-6">
            {/* Rotating ring with play button */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-stone-300/60 animate-spin-slow" />
              <button 
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-900 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105"
              >
                {isPlaying ? (
                  <div className="flex gap-1">
                    <div className="w-0.5 h-3 bg-white rounded-full" />
                    <div className="w-0.5 h-3 bg-white rounded-full" />
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[5px] border-y-transparent ml-1" />
                )}
              </button>
            </div>
            {/* Label */}
            <span className="text-[9px] font-body text-stone-500 uppercase tracking-widest">Auto Play</span>
          </div>
          
          {/* Cards + Count/Arrows Section - Expands to fill remaining space */}
          <div className="flex-1">
            {/* Cards Row - Shows 3 cards that cycle through 15 categories */}
            <div className="flex items-center gap-10 justify-end">
              {displayedCards.map((cardIndex, i) => (
                <button
                  key={`card-${cardIndex}-${i}`}
                  onClick={() => setActiveIndex(cardIndex)}
                  className="relative group"
                >
                  {/* Card - Larger square with more spacing */}
                  <div className={`relative w-[140px] h-[140px] rounded-2xl overflow-hidden transition-all duration-500 ease-out ${
                    cardIndex === activeIndex 
                      ? 'ring-[3px] ring-[#c9b896] scale-100' 
                      : 'ring-1 ring-stone-200/60 opacity-70 hover:opacity-100 scale-95'
                  }`}>
                    {/* Small icon top-right */}
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center z-10">
                      <ArrowUpRight className="w-2.5 h-2.5 text-stone-600" />
                    </div>
                    <img 
                      src={categories[cardIndex].image} 
                      alt={categories[cardIndex].name}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    {/* Label at bottom-center of card with background pill - BIGGER */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                      <span className={`px-5 py-2 rounded-full text-[14px] font-body tracking-wide backdrop-blur-md transition-all whitespace-nowrap ${
                        cardIndex === activeIndex 
                          ? 'bg-white text-stone-900 font-bold shadow-md' 
                          : 'bg-white/90 text-stone-700 font-semibold'
                      }`}>
                        {categories[cardIndex].name}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Count + Arrows Row */}
            <div className="flex items-center justify-between mt-3">
              {/* Count Display */}
              <div className="flex items-baseline">
                <span className="text-xl font-body font-medium text-foreground">{activeIndex + 1}</span>
                <span className="text-base text-stone-400 font-light">/</span>
                <span className="text-sm text-stone-400 font-body">15</span>
              </div>
              
              {/* Simple Arrow Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrev}
                  className="text-stone-500 hover:text-foreground transition-colors"
                >
                  <span className="text-lg">←</span>
                </button>
                <button 
                  onClick={handleNext}
                  className="text-stone-500 hover:text-foreground transition-colors"
                >
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Title and Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between px-0 sm:px-0 lg:px-8 py-2 sm:py-4 lg:py-6 pt-4 sm:pt-16 lg:pt-20 relative order-2 sm:order-first lg:order-first">
          {/* Hero Title */}
          <div 
            ref={titleAnim.ref}
            className={`transition-all duration-1000 ease-out ${
              titleAnim.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Mobile: Title + Cards side by side */}
            <div className="sm:hidden flex items-start gap-4">
              {/* Title - Left side */}
              <div className="flex-1">
                <h1 className="font-display text-[28px] font-normal leading-[1.1] tracking-tight text-foreground">
                  rideCircle – <span className="text-primary">share, earn and ride vehicles</span>
                </h1>
              </div>

              {/* Horizontal Cards - Right side */}
              <div className="flex-1 flex flex-col items-center">
                {/* Cards Row */}
                <div className="flex gap-2 items-center">
                  {displayedCards.map((cardIndex) => (
                    <button
                      key={`mobile-compact-${cardIndex}`}
                      onClick={() => setActiveIndex(cardIndex)}
                      className="relative flex-shrink-0"
                    >
                      <div className={`relative overflow-hidden transition-all duration-300 shadow-lg ${
                        cardIndex === activeIndex 
                          ? 'w-[58px] h-[58px] rounded-xl ring-2 ring-[#c9b896] ring-offset-1 ring-offset-background' 
                          : 'w-[46px] h-[46px] rounded-lg opacity-55'
                      }`}>
                        <img 
                          src={categories[cardIndex].image} 
                          alt={categories[cardIndex].name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                      </div>
                      {cardIndex === activeIndex && (
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-stone-800 text-[6px] font-body font-semibold text-white whitespace-nowrap shadow-sm">
                          {categories[cardIndex].name}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Controls - centered below cards */}
                <div className="flex items-center justify-center gap-3 mt-5">
                  <button 
                    onClick={handlePrev}
                    className="p-1 active:scale-90 transition-transform"
                  >
                    <ChevronLeft className="w-4 h-4 text-stone-500" />
                  </button>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[10px] font-body font-semibold text-stone-800">{String(activeIndex + 1).padStart(2, '0')}</span>
                    <span className="text-[9px] text-stone-400">/</span>
                    <span className="text-[9px] font-body text-stone-400">{categories.length}</span>
                  </div>
                  <button 
                    onClick={handleNext}
                    className="p-1 active:scale-90 transition-transform"
                  >
                    <ChevronRight className="w-4 h-4 text-stone-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tablet & Desktop Title */}
            <h1 className="hidden sm:block font-display text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight text-foreground text-center">
              rideCircle – <span className="text-primary">share, earn and ride vehicles</span>
            </h1>

            {/* Scroll Indicator - Hidden on mobile */}
            <div className="mt-4 sm:mt-8 hidden sm:block w-full">
              <div className="flex items-center justify-center w-full">
                <div className="flex-1 h-px border-t border-dashed border-stone-300" />
                <div className="mx-4 flex items-center justify-center">
                  <div className="w-20 h-12 rounded-full border-4 border-dashed border-stone-300 flex items-center justify-center bg-white">
                    {/* Mouse icon */}
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="9" y="4" width="20" height="30" rx="10" stroke="#A8A29E" strokeWidth="2.5"/>
                      <rect x="17.5" y="10" width="3" height="8" rx="1.5" fill="#A8A29E"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 h-px border-t border-dashed border-stone-300" />
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
              {/* Description Text - Shown on tablet only (desktop is in the absolute panel) */}
              <div className="hidden sm:block lg:hidden flex-shrink-0 max-w-[140px]">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-[#a3b87c] rounded-sm mt-1.5 flex-shrink-0" />
                  <p className="text-[10px] font-body text-muted-foreground uppercase leading-relaxed tracking-wide">
                    KEYCIRCLE IS YOUR TRUSTED PLATFORM FOR STUDENT VEHICLE SHARING.
                  </p>
                </div>
              </div>

              {/* Category Thumbnails with Slider - Hidden on desktop and mobile (shown on image instead) */}
              <div 
                className="relative flex-1 hidden sm:block lg:hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Tablet Layout - Clean minimal thumbnails */}
                <div className="flex items-center gap-2">
                  {displayedCards.map((cardIndex) => (
                    <button
                      key={`tablet-${cardIndex}`}
                      onClick={() => setActiveIndex(cardIndex)}
                      className="relative group"
                    >
                      <div className={`relative w-16 h-20 rounded-lg overflow-hidden transition-all duration-300 ease-out ${
                        cardIndex === activeIndex 
                          ? 'ring-2 ring-foreground/20 ring-offset-2' 
                          : 'opacity-50 hover:opacity-80'
                      }`}>
                        <img 
                          src={categories[cardIndex].image} 
                          alt={categories[cardIndex].name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-body font-medium text-white/90">
                          {categories[cardIndex].name}
                        </span>
                      </div>
                    </button>
                  ))}
                  
                  {/* Play/Pause Button - Tablet */}
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
              </div>
            </div>

            {/* Pagination - Tablet only (desktop has it in the card panel) */}
            <div className="hidden sm:flex lg:hidden items-center justify-between mt-3 sm:mt-4">
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

            {/* Footer Decorations - Tablet only */}
            <div className="hidden sm:flex lg:hidden items-center justify-between text-muted-foreground/30 text-[10px] font-body mt-4">
              <span>+ + +</span>
              <span>+ +</span>
            </div>
          </div>
        </div>

        {/* Right Column - Hero Image */}
        <div 
          ref={imageAnim.ref}
          className={`lg:col-span-7 relative order-1 sm:order-last lg:order-last transition-all duration-1000 delay-200 ease-out pr-0 lg:pr-6 mt-2 sm:mt-0 ${
            imageAnim.isVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-8 scale-95'
          }`}
        >
          {/* Contact/Cart section - positioned at top right corner of image */}
          <div className="hidden lg:flex absolute top-0 right-6 z-30 items-center gap-2 bg-background rounded-bl-[28px] pl-5 pb-4 pt-1 pr-1">
            <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button className="px-5 py-2.5 rounded-full bg-background text-foreground font-medium font-body text-sm hover:bg-secondary transition-colors border border-border">
              CONTACT US
            </button>
          </div>
          
          <div className="relative h-[280px] xs:h-[340px] sm:h-[480px] lg:h-[calc(100vh-48px)] rounded-2xl sm:rounded-3xl lg:rounded-tr-none lg:rounded-bl-[40px] overflow-hidden shadow-xl">
            {/* Main Hero Image - Simple fade transition */}
            <img
              key={activeIndex}
              src={currentCategory.heroImage}
              alt={`keyCircle - ${currentCategory.name}`}
              className="w-full h-full object-cover object-center transition-opacity duration-300"
            />

            {/* keyCircle Badge - Circular Text */}
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
                      KEYCIRCLE • KEYCIRCLE • KEYCIRCLE • KEYCIRCLE •
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

            {/* Tags - Dynamic based on current category */}
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-20">
              <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-end max-w-[120px] sm:max-w-[160px]">
                {['Style', currentCategory.name, 'Premium', 'Ride'].map((tag) => (
                  <span
                    key={`${activeIndex}-${tag}`}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/80 text-[8px] sm:text-[10px] font-body font-medium text-stone-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Intricate Bottom Decorative Line */}
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-10">
              {/* Decorative pattern line */}
              <div className="flex items-end justify-between px-6 pb-4">
                {/* Left decorative elements */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/40 text-[10px] font-body tracking-[0.3em]">+ + +</span>
                  </div>
                  <div className="w-16 h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
                </div>

                {/* Center decorative pattern */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <div className="w-8 h-[1px] bg-white/20" />
                </div>

                {/* Right decorative elements */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-[1px] bg-gradient-to-l from-white/30 to-transparent" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/40 text-[10px] font-body tracking-[0.3em]">+ + +</span>
                  </div>
                </div>
              </div>

              {/* Subtle bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
