import { useRef, useState, useEffect } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true 
  } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Animation class presets
export const animations = {
  fadeUp: (isVisible: boolean, delay: number = 0) => 
    `transition-all duration-700 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }` + (delay ? ` delay-[${delay}ms]` : ''),
  
  fadeIn: (isVisible: boolean) => 
    `transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`,
  
  fadeRight: (isVisible: boolean) => 
    `transition-all duration-700 ease-out ${
      isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-8'
    }`,
  
  fadeLeft: (isVisible: boolean) => 
    `transition-all duration-700 ease-out ${
      isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 -translate-x-8'
    }`,
  
  scaleUp: (isVisible: boolean) => 
    `transition-all duration-700 ease-out ${
      isVisible 
        ? 'opacity-100 scale-100' 
        : 'opacity-0 scale-95'
    }`,
};

export default useScrollAnimation;
