'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from '@/components/Slider/Slider';
import AnimatedBackground from './AnimatedBackground';

const HeroSection = () => {
  const t = useTranslations('gameHosting');
  const [animationReady, setAnimationReady] = useState(false);

  // Wacht tot na de preloader voordat animaties beginnen
  useEffect(() => {
    // Korte vertraging om te zorgen dat animaties starten ná preloader
    const timer = setTimeout(() => {
      setAnimationReady(true);
    }, 300);
    
    return () => clearTimeout(timer);
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
        className="space-y-1"
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
    <AnimatedBackground variant="primary" className="py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left column - Text content that changes */}
          <div className="w-full md:w-1/2 space-y-6 relative">
            <Slider 
              slides={slideContent}
              autoPlayInterval={10000}
              showIndicators={true}
            />
          </div>
          
          {/* Right column - SVG remains the same but with animation */}
          <div className="w-full md:w-1/2 flex flex-col items-center mt-12 md:mt-0">
            <AnimatePresence>
              {animationReady && (
                <motion.div 
                  className="relative w-full flex justify-center"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  <Image 
                    src="/svg/mainpage/server-kast-guy.svg"
                    alt={t('serverIllustrationAlt')}
                    width={600}
                    height={600}
                    className="w-[420px] sm:w-[480px] md:w-[560px] lg:w-[600px] h-auto animate-float"
                    loading="eager"
                    priority
                    fetchPriority="high"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default HeroSection;