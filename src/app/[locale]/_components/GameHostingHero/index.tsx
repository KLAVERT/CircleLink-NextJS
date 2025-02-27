'use client';

import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import { motion } from 'framer-motion';

const GameHostingHero = () => {
  return (
    <motion.div 
      className="w-full min-w-full min-h-screen bg-[var(--color-primary)] dark:bg-[var(--color-primary)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <FeaturesSection />
    </motion.div>
  );
};

export default GameHostingHero; 