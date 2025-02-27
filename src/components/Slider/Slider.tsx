'use client';

import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SliderProps {
  slides: ReactNode[];
  autoPlayInterval?: number;
  showIndicators?: boolean;
  className?: string;
  slideClassName?: string;
  indicatorsClassName?: string;
  indicatorClassName?: string;
  activeIndicatorClassName?: string;
  renderIndicator?: (index: number, isActive: boolean, onClick: () => void) => ReactNode;
}

const Slider: React.FC<SliderProps> = ({
  slides,
  autoPlayInterval = 10000,
  showIndicators = true,
  className = '',
  slideClassName = '',
  indicatorsClassName = 'flex justify-center mt-8',
  indicatorClassName = 'h-3 rounded-full transition-all duration-300 bg-[var(--color-divider)] hover:bg-[var(--color-tertiary)] w-3',
  activeIndicatorClassName = 'bg-[var(--color-quinary)] w-12',
  renderIndicator,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);
  
  // Bepaalt het totaal aantal slides
  const totalSlides = slides.length;
  
  // Helperfunctie die de slide-update en animatie-afhandeling centraliseert
  const changeSlide = useCallback((newSlide: number, direction: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection(direction);
    setTimeout(() => {
      setActiveSlide(newSlide);
      setTimeout(() => setIsAnimating(false), 500);
    }, 300);
  }, [isAnimating]);
  
  const nextSlide = useCallback(() => {
    changeSlide((activeSlide + 1) % totalSlides, 'right');
  }, [activeSlide, totalSlides, changeSlide]);
  
  const prevSlide = useCallback(() => {
    changeSlide(activeSlide === 0 ? totalSlides - 1 : activeSlide - 1, 'left');
  }, [activeSlide, totalSlides, changeSlide]);
  
  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === activeSlide) return;
    changeSlide(index, index > activeSlide ? 'right' : 'left');
  }, [activeSlide, isAnimating, changeSlide]);

  // Automatisch naar volgende slide met correcte dependencies
  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval]);

  // Touch events voor swipen
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    // Detecteer swipe als het meer dan 50px is
    if (swipeDistance > 50) {
      nextSlide(); // swipe links
    } else if (swipeDistance < -50) {
      prevSlide(); // swipe rechts
    }
    
    // Reset waardes
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Muis events voor drag/swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    
    const swipeDistance = mouseStartX.current - touchEndX.current;
    
    // Detecteer swipe als het meer dan 50px is
    if (swipeDistance > 50) {
      nextSlide(); // swipe links
    } else if (swipeDistance < -50) {
      prevSlide(); // swipe rechts
    }
    
    // Reset waardes
    isDragging.current = false;
    mouseStartX.current = 0;
    touchEndX.current = 0;
  };

  // Framer Motion variants
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <div className={className}>
      <div 
        className="relative overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ userSelect: 'none' }}
      >
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={activeSlide}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={slideClassName}
          >
            {slides[activeSlide]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {showIndicators && (
        <div className={indicatorsClassName}>
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              renderIndicator ? (
                renderIndicator(index, activeSlide === index, () => goToSlide(index))
              ) : (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? `${activeIndicatorClassName}` 
                      : `${indicatorClassName}`
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider; 