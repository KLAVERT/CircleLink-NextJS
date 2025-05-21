'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Button from '@/components/Button/Button';
import { useTranslations } from 'next-intl';
import { FaGamepad, FaGlobe, FaDiscord } from 'react-icons/fa';
import { motion, useReducedMotion } from 'framer-motion';
import Slider from '@/components/Slider/Slider';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Grid, { GridItem } from '@/components/Grid';

const HeroSection = () => {
  const t = useTranslations('gameHosting');
  const [animationReady, setAnimationReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [shouldRenderImage, setShouldRenderImage] = useState(false);

  useEffect(() => {
    // Set animation ready immediately
    setAnimationReady(true);
    
    // Only render image non-mobile devices
    if (!isMobile) {
      setShouldRenderImage(true);
    } else {
      setShouldRenderImage(false);
    }
  }, [isMobile]);

  // Content for every hosting option we offer
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
      <div className="space-y-1 min-h-[180px]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          <span className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">{slide.heroTitle1} </span>
          <span className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)]">{slide.heroTitle2} </span>
          <span className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">{slide.heroTitle3}</span>
        </h1>
      </div>
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

  // Simplified animations for performance (mobile and desktop)
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
    <AnimatedBackground variant="primary" className="min-h-screen w-full py-20 md:py-32">
      <Grid container maxWidth="xl" className="h-full">
        <Grid columns={1} mdColumns={2} spacing="lg" className="items-center">
          <GridItem className="space-y-6 relative px-4 sm:px-6 lg:px-8">
            <Slider 
              slides={slideContent}
              autoPlayInterval={10000}
              showIndicators={true}
            />
          </GridItem>
          
          <GridItem className="flex flex-col items-start mt-12 md:mt-0 max-w-full self-start">
            <motion.div 
              className="relative flex justify-start"
              {...getAnimationProps()}
            >
              {shouldRenderImage && (
                <Image
                  src="/images/webp/mainpage/server-kast-guy.webp"
                  alt={t('serverIllustrationAlt')}
                  width={600}
                  height={600}
                  className={`w-full h-auto ${animationReady && !isMobile ? 'animate-float' : ''}`}
                />
              )}
            </motion.div>
          </GridItem>
        </Grid>
      </Grid>
    </AnimatedBackground>
  );
};

export default HeroSection;