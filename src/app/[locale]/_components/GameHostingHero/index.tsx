'use client';

import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';

const GameHostingHero = () => {
  return (
    <div className="w-full min-w-full min-h-screen bg-[var(--color-primary)] dark:bg-[var(--color-primary)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default GameHostingHero; 