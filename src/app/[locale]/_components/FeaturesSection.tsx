'use client';

import React, { useEffect, useRef } from 'react';
import FeatureCard from './FeatureCard';
import { useTranslations } from 'next-intl';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import Grid from '@/components/Grid';

const FeaturesSection = () => {
  const t = useTranslations('features');
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  // Feature data with translation keys and categories
  const features = [
    {
      title: t('instantSetup.title'),
      description: t('instantSetup.description'),
      category: 'setup',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
      )
    },
    {
      title: t('ddosProtection.title'),
      description: t('ddosProtection.description'),
      category: 'security',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      )
    },
    {
      title: t('easyManagement.title'),
      description: t('easyManagement.description'),
      category: 'management',
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      )
    },
    {
      title: t('premiumHardware.title'),
      description: t('premiumHardware.description'),
      category: 'hardware',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      )
    },
    {
      title: t('modSupport.title'),
      description: t('modSupport.description'),
      category: 'plugins',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      )
    },
    {
      title: t('support.title'),
      description: t('support.description'),
      category: 'support',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      )
    }
  ];
  
  // Title animatie variants
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -30,
      scale: 0.95,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <AnimatedBackground variant="secondary" className="min-h-[100vh] md:h-screen flex items-center justify-center py-24 md:py-0">
      <Grid container maxWidth="xl" className="flex flex-col items-center">
        <div ref={ref}>
          {/* Section title met nieuwe animatie */}
          <motion.div 
            className="text-center mb-16 max-w-3xl"
            variants={titleVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] mb-4">
              {t('sectionTitle.part1')} <span className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)]">{t('sectionTitle.part2')}</span>
            </h2>
          </motion.div>
          
          {/* Features grid met nieuwe animaties */}
          <Grid columns={1} mdColumns={2} lgColumns={3} spacing="lg" className="w-full max-w-6xl">
            <AnimatePresence>
              {features.map((feature, index) => (
                <motion.div
                  key={`${feature.title}-${index}`}
                  className="h-full p-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                >
                  <FeatureCard 
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </Grid>
        </div>
      </Grid>
    </AnimatedBackground>
  );
};

export default FeaturesSection; 