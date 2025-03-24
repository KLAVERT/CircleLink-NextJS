'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button/Button';
import { FaCheck, FaServer, FaClock, FaShieldAlt } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const titleVariants = {
  hidden: { 
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const contentVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const HeroSection = () => {
  const t = useTranslations('palworld.hero');

  return (
    <section className="relative w-full">
      {/* Background with wallpaper and color tint */}
      <div 
        className="absolute inset-0 z-0 w-full h-full bg-[url('/images/webp/games/wallpapers/palworld-background.webp')] bg-cover bg-center bg-no-repeat bg-[var(--color-primary)] bg-blend-overlay"
      >
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-block bg-blue-600 text-[var(--color-button-text)] rounded-full px-4 py-1 mb-6 text-sm font-medium"
            variants={titleVariants}
          >
            {t('badge')}
          </motion.div>

          <motion.h1 
            className="mb-4 text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl lg:text-6xl" 
            variants={titleVariants}
          >
            {t('title')}
          </motion.h1>
          
          <motion.h2
            className="mb-6 text-2xl font-semibold text-[var(--color-quaternary)] md:text-3xl"
            variants={titleVariants}
          >
            {t('subtitle')}
          </motion.h2>
          
          <motion.p 
            className="mb-8 text-lg text-[var(--color-text-primary)] opacity-90 max-w-3xl mx-auto" 
            variants={contentVariants}
          >
            {t('description')}
          </motion.p>
          
          <motion.div 
            className="mb-10 flex flex-col items-center gap-3 text-[var(--color-text-primary)]"
            variants={contentVariants}
          >
            <div className="flex items-center gap-2"><FaCheck className="text-green-400" /> <span>{t('features.dedicatedServers')}</span></div>
            <div className="flex items-center gap-2"><FaCheck className="text-green-400" /> <span>{t('features.modInstallation')}</span></div>
            <div className="flex items-center gap-2"><FaCheck className="text-green-400" /> <span>{t('features.uptime')}</span></div>
            <div className="flex items-center gap-2"><FaCheck className="text-green-400" /> <span>{t('features.ddosProtection')}</span></div>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            variants={contentVariants}
          >
            <Button
              href="#get-started"
              variant="white"
            >
              {t('buttons.getStarted')}
            </Button>
            <Button
              href="#view-plans"
              variant="outline"
            >
              {t('buttons.viewPlans')}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom features */}
      <div className="relative z-10 bg-[rgba(0,0,0,0.7)] py-6 backdrop-blur-sm w-full">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center justify-center gap-3 text-[var(--color-text-primary)]">
            <FaShieldAlt className="text-blue-400 text-xl" /> 
            <span>{t('bottomFeatures.ddosProtection')}</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-[var(--color-text-primary)]">
            <FaServer className="text-blue-400 text-xl" /> 
            <span>{t('bottomFeatures.premiumHardware')}</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-[var(--color-text-primary)]">
            <FaClock className="text-blue-400 text-xl" /> 
            <span>{t('bottomFeatures.online')}</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-[var(--color-text-primary)]">
            <FaCheck className="text-blue-400 text-xl" /> 
            <span>{t('bottomFeatures.instantDelivery')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 