'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Button from '@/components/Button/Button';
import { useTranslations } from 'next-intl';
import { FaGamepad, FaGlobe, FaDiscord } from 'react-icons/fa';
import { motion, useReducedMotion } from 'framer-motion';
import Slider from '@/components/Slider/Slider';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Dynamically import the SVG components
const ServerKastGuy = dynamic(() => import('@/assets/svg/mainpage/server-kast-guy.svg'), {
  loading: () => <div className="w-full h-[300px] bg-[var(--color-bg-secondary)] animate-pulse rounded-lg" />,
  ssr: false
});

const ServerKastGuySmaller = dynamic(() => import('@/assets/svg/mainpage/server-kast-guy-smaller.svg'), {
  loading: () => <div className="w-full h-[200px] bg-[var(--color-bg-secondary)] animate-pulse rounded-lg" />,
  ssr: false
});

const HeroSection = () => {
  const t = useTranslations('gameHosting');
  const [animationReady, setAnimationReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    // Kortere delay op mobiel
    const timer = setTimeout(() => {
      setAnimationReady(true);
    }, isMobile ? 0 : 100);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

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
      icon: <FaGamepad />
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
      icon: <FaGlobe />
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
      icon: <FaDiscord />
    }
  ];

  // Transformeer de slides inhoud naar Slider-compatibele jsx elementen
  const slideContent = slides.map((slide, index) => (
    <div key={index} className="space-y-6">
      <motion.p 
        initial={{ opacity: 0 }}
        animate={animationReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }} 
        className="inline-block bg-[var(--color-quaternary)]/10 dark:bg-[var(--color-quaternary)]/30 text-[var(--color-quinary)] dark:text-[var(--color-quinary)] px-4 py-1 rounded-full text-sm font-medium"
      >
        {slide.tagline}
      </motion.p>
      <motion.div 
        className="space-y-1 min-h-[180px]"
        initial={{ opacity: 0, y: 20 }}
        animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          <span className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">{slide.heroTitle1} </span>
          <span className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)]">{slide.heroTitle2} </span>
          <span className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">{slide.heroTitle3}</span>
        </h1>
      </motion.div>
      <motion.p 
        className="text-[var(--color-text-subtle)] dark:text-[var(--color-text-subtle)] text-lg max-w-2xl"
        initial={{ opacity: 0 }}
        animate={animationReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {slide.description}
      </motion.p>
      <motion.div 
        className="pt-4 flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button 
          variant="primary" 
          href={slide.primaryButton.href}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{slide.icon}</span>
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

  // Simplified animations for mobile
  const getAnimationProps = useCallback(() => {
    if (isMobile || shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
      };
    }
    return {
      initial: { y: 30, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
    };
  }, [isMobile, shouldReduceMotion]);

  return (
    <AnimatedBackground variant="primary" className="absolute top-0 left-0 right-0 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 pt-20 md:pt-0 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left column - Text content that changes */}
          <div className="w-full md:w-1/2 space-y-6 relative">
            <Slider 
              slides={slideContent}
              autoPlayInterval={10000}
              showIndicators={true}
            />
          </div>
          
          {/* Right column - SVG with optimized loading */}
          <div className="w-full md:w-1/2 flex flex-col items-center mt-12 md:mt-0 max-w-full">
            <motion.div 
              className="relative w-full flex justify-center px-4"
              {...getAnimationProps()}
            >
              <div 
                className={`w-full h-auto ${isMobile ? 'max-w-[300px]' : 'max-w-[600px]'} ${animationReady && !isMobile ? 'animate-float' : ''}`}
              >
                {isMobile ? (
                  <>
                  </>
                ) : (
                  <ServerKastGuy 
                    aria-label={t('serverIllustrationAlt')}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default HeroSection;