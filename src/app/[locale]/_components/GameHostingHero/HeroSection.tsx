'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const HeroSection = () => {
  const t = useTranslations('gameHosting');
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);
  
  // Functie om naar volgende slide te gaan met useCallback
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('right');
    
    setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
      setTimeout(() => setIsAnimating(false), 500);
    }, 300);
  }, [isAnimating]);

  // Functie om naar vorige slide te gaan met useCallback
  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('left');
    
    setTimeout(() => {
      setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }, 300);
  }, [isAnimating]);

  // Ga direct naar specifieke slide met useCallback
  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === activeSlide) return;
    setIsAnimating(true);
    setSlideDirection(index > activeSlide ? 'right' : 'left');
    
    setTimeout(() => {
      setActiveSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }, 300);
  }, [isAnimating, activeSlide]);

  // Automatisch elke 10 seconden naar volgende slide met correcte dependencies
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

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

  // Content voor elk type hosting
  const slides = [
    {
      type: 'game',
      tagline: t('tagline'),
      heroTitle1: t('heroTitle1'),
      heroTitle2: t('heroTitle2'),
      heroTitle3: t('heroTitle3'),
      description: t('heroDescription'),
      primaryButton: {
        text: t('viewPricing'),
        href: '/hosting/pricing/game'
      },
      secondaryButton: {
        text: t('supportedGames'),
        href: '/hosting/games'
      },
      icon: faGamepad
    },
    {
      type: 'web',
      tagline: t('web.tagline'),
      heroTitle1: t('web.heroTitle1'),
      heroTitle2: t('web.heroTitle2'),
      heroTitle3: t('web.heroTitle3'),
      description: t('web.heroDescription'),
      primaryButton: {
        text: t('web.viewPricing'),
        href: '/hosting/pricing/web'
      },
      secondaryButton: {
        text: t('web.features'),
        href: '/hosting/web-features'
      },
      icon: faGlobe
    },
    {
      type: 'discord',
      tagline: t('discord.tagline'),
      heroTitle1: t('discord.heroTitle1'),
      heroTitle2: t('discord.heroTitle2'),
      heroTitle3: t('discord.heroTitle3'),
      description: t('discord.heroDescription'),
      primaryButton: {
        text: t('discord.viewPricing'),
        href: '/hosting/pricing/discord'
      },
      secondaryButton: {
        text: t('discord.features'),
        href: '/hosting/discord-features'
      },
      icon: faDiscord
    }
  ];

  const currentSlide = slides[activeSlide];
  
  return (
    <div className="w-full min-h-screen px-4 py-16 md:py-24 flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left column - Text content that changes */}
        <div 
          className="w-full md:w-1/2 space-y-6 relative overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ userSelect: 'none' }}
        >
          <div 
            ref={contentRef}
            className={`transition-all duration-500 ease-in-out ${
              isAnimating 
                ? slideDirection === 'right' 
                  ? 'transform -translate-x-10 opacity-0' 
                  : 'transform translate-x-10 opacity-0'
                : 'transform translate-x-0 opacity-100'
            }`}
          >
            <div className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)] font-medium text-sm md:text-base mb-1 flex items-center gap-2">
              <FontAwesomeIcon icon={currentSlide.icon} className="text-lg" />
              {currentSlide.tagline}
            </div>
            <div className="space-y-2 min-h-[200px]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] leading-tight">
                {currentSlide.heroTitle1}
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-quinary)] dark:text-[var(--color-quinary)] leading-tight">
                {currentSlide.heroTitle2}
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] leading-tight">
                {currentSlide.heroTitle3}
              </h1>
            </div>
            <p className="text-[var(--color-text-subtle)] dark:text-[var(--color-text-subtle)] text-lg md:text-xl max-w-xl min-h-[80px]">
              {currentSlide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 min-h-[80px]">
              <Button 
                href={currentSlide.primaryButton.href} 
                variant="blue" 
                className="px-8 py-4 font-bold rounded-lg"
              >
                {currentSlide.primaryButton.text}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
              <Button 
                href={currentSlide.secondaryButton.href} 
                variant="outline" 
                className="px-8 py-4 font-bold rounded-lg"
              >
                {currentSlide.secondaryButton.text}
              </Button>
            </div>
          </div>
          
          {/* Alleen navigatie bolletjes, geen pijltjes */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? 'bg-[var(--color-quinary)] w-12' 
                      : 'bg-[var(--color-divider)] hover:bg-[var(--color-tertiary)] w-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - SVG remains the same */}
        <div className="w-full md:w-1/2 flex flex-col items-center mt-12 md:mt-0">
          <div className="relative w-full flex justify-center">
            <Image 
              src="/svg/mainpage/server-kast-guy.svg"
              alt={t('serverIllustrationAlt')}
              width={600}
              height={600}
              className="w-[420px] sm:w-[480px] md:w-[560px] lg:w-[600px] h-auto transition-transform duration-300 hover:scale-105 server-illustration"
              loading="eager"
              priority
              fetchPriority="high"
              style={{
                contentVisibility: 'auto',
              }}
              onLoad={() => {
                // Voeg de animatie toe nadat de afbeelding is geladen om de LCP te verbeteren
                const img = document.querySelector('.server-illustration') as HTMLElement;
                if (img) {
                  img.classList.add('animate-sideToSide');
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 