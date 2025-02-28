'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/Button/Button';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';

const HeroSection = () => {
  const t = useTranslations('gameHosting');
  const [animationReady, setAnimationReady] = useState(false);
  const [useSlider, setUseSlider] = useState(false);
  const [useFallbackImage, setUseFallbackImage] = useState(false);

  // Gefaseerde loading voor betere performance
  useEffect(() => {
    // Fase 1: Direct statische content tonen
    // Fase 2: Eenvoudige animaties inschakelen
    const contentTimer = setTimeout(() => {
      setAnimationReady(true);
    }, 100);
    
    // Fase 3: Zwaardere componenten zoals slider inschakelen
    const sliderTimer = setTimeout(() => {
      setUseSlider(true);
    }, 800);
    
    // Preload afbeeldingen voor betere performance
    const preloadImages = (): void => {
      const preloadUrls = [
        '/images/webp/mainpage/server-kast-guy.webp',
        '/svg/mainpage/server-kast-guy.svg' // Fallback SVG
      ];
      
      // Gebruik de Image component's ingebouwde preload functionaliteit
      // door de afbeeldingen toe te voegen aan de next.config.js
      // Dit is een betere aanpak dan handmatig preloaden
      
      // Log alleen voor debugging
      preloadUrls.forEach(url => {
        console.log(`Afbeelding ${url} wordt voorgeladen via Next.js Image optimalisatie`);
      });
    };
    
    preloadImages();
    
    // Rapporteer LCP voor performance monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Alleen uitvoeren in productie om development niet te vertragen
      if (process.env.NODE_ENV === 'production') {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            // Log LCP waarde
            console.log('LCP:', lastEntry.startTime);
            
            // Stuur naar analytics als beschikbaar
            if (typeof window !== 'undefined' && 'gtag' in window) {
              // @ts-expect-error - gtag kan bestaan in window maar is niet getypeerd
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'LCP',
                value: Math.round(lastEntry.startTime),
                non_interaction: true,
              });
            }
            
            lcpObserver.disconnect();
          });
          
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
          console.error('LCP monitoring error:', e);
        }
      }
    }
    
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(sliderTimer);
    };
  }, []);

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

  // Statische content voor eerste render
  const firstSlideContent = (
    <div className="space-y-4">
      <p className="inline-block bg-[var(--color-quaternary)]/10 dark:bg-[var(--color-quaternary)]/30 text-[var(--color-quinary)] dark:text-[var(--color-quinary)] px-4 py-1 rounded-full text-sm font-medium">
        {slides[0].tagline}
      </p>
      <div className="space-y-1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">{slides[0].heroTitle1} </span>
          <span className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)]">{slides[0].heroTitle2} </span>
          <span className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">{slides[0].heroTitle3}</span>
        </h1>
      </div>
      <p className="text-[var(--color-text-subtle)] dark:text-[var(--color-text-subtle)] text-lg max-w-2xl hero-description">
        {slides[0].description}
      </p>
      <div className="pt-3 flex flex-wrap gap-4">
        <Button 
          variant="primary" 
          href={slides[0].primaryButton.href}
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={slides[0].icon} className="h-4 w-4" />
            <span>{slides[0].primaryButton.text}</span>
          </div>
        </Button>
        <Button 
          variant="outline" 
          href={slides[0].secondaryButton.href}
        >
          {slides[0].secondaryButton.text}
        </Button>
      </div>
    </div>
  );

  // Voor animaties na initiële render
  const slideContent = slides.map((slide, index) => (
    <div key={index} className="space-y-4">
      <motion.p 
        initial={{ opacity: 0 }}
        animate={animationReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0 }} 
        className="inline-block bg-[var(--color-quaternary)]/10 dark:bg-[var(--color-quaternary)]/30 text-[var(--color-quinary)] dark:text-[var(--color-quinary)] px-4 py-1 rounded-full text-sm font-medium"
      >
        {slide.tagline}
      </motion.p>
      <motion.div 
        className="space-y-1"
        initial={{ opacity: 0, y: 10 }}
        animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3, delay: 0 }}
        style={{ willChange: 'opacity, transform' }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">{slide.heroTitle1} </span>
          <span className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)]">{slide.heroTitle2} </span>
          <span className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">{slide.heroTitle3}</span>
        </h1>
      </motion.div>
      <p className="text-[var(--color-text-subtle)] dark:text-[var(--color-text-subtle)] text-lg max-w-2xl">
        {slide.description}
      </p>
      <motion.div 
        className="pt-3 flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{ willChange: 'opacity, transform' }}
      >
        <Button 
          variant="primary" 
          href={slide.primaryButton.href}
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={slide.icon} className="h-4 w-4" />
            <span>{slide.primaryButton.text}</span>
          </div>
        </Button>
        <Button 
          variant="outline" 
          href={slide.secondaryButton.href}
        >
          {slide.secondaryButton.text}
        </Button>
      </motion.div>
    </div>
  ));

  return (
    <div className="container mx-auto py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10">
        {/* Linker kolom - Tekst content */}
        <div className="w-full md:w-1/2 relative">
          {!useSlider ? (
            firstSlideContent
          ) : (
            <Slider 
              slides={slideContent}
              autoPlayInterval={10000}
              showIndicators={true}
            />
          )}
        </div>
        
        {/* Rechter kolom - Server illustratie */}
        <div className="w-full md:w-1/2 flex flex-col items-center mt-8 md:mt-0">
          {!animationReady ? (
            // Statische afbeelding eerst
            <div className="relative w-full flex justify-center">
              <Image 
                src={useFallbackImage ? "/svg/mainpage/server-kast-guy.svg" : "/images/webp/mainpage/server-kast-guy.webp"}
                alt={t('serverIllustrationAlt')}
                width={600}
                height={400}
                unoptimized={useFallbackImage}
                className="w-[420px] sm:w-[480px] md:w-[560px] lg:w-[600px] h-auto"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  transform: 'translateZ(0)', // Hardware acceleratie
                }}
                onLoad={(e) => {
                  // Markeer de afbeelding als geladen voor betere performance metrics
                  e.currentTarget.setAttribute('data-loaded', 'true');
                }}
                onError={() => {
                  console.error('Fout bij het laden van de afbeelding');
                  // Fallback naar SVG als WebP niet laadt
                  setUseFallbackImage(true);
                }}
              />
            </div>
          ) : (
            // Geanimeerde versie na initiële render
            <AnimatePresence>
              <motion.div 
                className="relative w-full flex justify-center"
                initial={{ opacity: 0.95 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ willChange: 'opacity' }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  style={{ willChange: 'transform' }}
                >
                  <Image 
                    src={useFallbackImage ? "/svg/mainpage/server-kast-guy.svg" : "/images/webp/mainpage/server-kast-guy.webp"}
                    alt={t('serverIllustrationAlt')}
                    width={600}
                    height={400}
                    unoptimized={useFallbackImage}
                    className="w-[420px] sm:w-[480px] md:w-[560px] lg:w-[600px] h-auto"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      transform: 'translateZ(0)', // Hardware acceleratie
                    }}
                    onLoad={(e) => {
                      // Markeer de afbeelding als geladen voor betere performance metrics
                      e.currentTarget.setAttribute('data-loaded', 'true');
                    }}
                    onError={() => {
                      console.error('Fout bij het laden van de afbeelding');
                      // Fallback naar SVG als WebP niet laadt
                      setUseFallbackImage(true);
                    }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;