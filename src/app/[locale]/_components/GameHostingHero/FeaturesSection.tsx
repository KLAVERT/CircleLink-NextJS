'use client';

import React, { useEffect, useRef, useState } from 'react';
import FeatureCard from './FeatureCard';
import { useTranslations } from 'next-intl';
import { motion, useInView, useAnimation } from 'framer-motion';

const FeaturesSection = () => {
  const t = useTranslations('features');
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  
  // Stel animaties uit om LCP te prioriteren
  useEffect(() => {
    // Wacht met animaties tot na LCP
    const timer = setTimeout(() => {
      setAnimationsEnabled(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Start animaties alleen als in view EN nadat de timer is voltooid
  useEffect(() => {
    if (isInView && animationsEnabled) {
      controls.start('visible');
    }
  }, [isInView, animationsEnabled, controls]);
  
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
      y: -20, // Verminderde y-waarde voor soepelere animatie
      filter: 'blur(5px)' // Minder blur voor betere prestaties
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5, // Kortere duur
        ease: "easeOut"
      }
    }
  };
  
  // Grid container animatie met verbeterde prestaties
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2, // Kortere vertraging
        staggerChildren: 0.08 // Snellere stagger
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 mt-8" ref={ref}>
      {/* Statische fallback tijdens laden voor betere LCP prestaties */}
      {!animationsEnabled && (
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">
            {t('sectionTitle.part1')} <span className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)]">{t('sectionTitle.part2')}</span>
          </h2>
        </div>
      )}
      
      {/* Section title met nieuwe animatie */}
      {animationsEnabled && (
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">
            {t('sectionTitle.part1')} <span className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)]">{t('sectionTitle.part2')}</span>
          </h2>
        </motion.div>
      )}
      
      {/* Features grid met verbeterde animaties */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {features.map((feature, index) => (
          <motion.div
            key={`${feature.title}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: {
                  duration: 0.3,
                  delay: index * 0.08,
                  ease: "easeOut"
                }
              }
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
      </motion.div>
    </div>
  );
};

export default FeaturesSection; 