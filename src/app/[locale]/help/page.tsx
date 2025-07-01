'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import HelpHeroSection from './_components/HelpHeroSection';
import HelpVideoSection from './_components/HelpVideoSection';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HelpPage() {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('help');

  useEffect(() => {
    // Wait until the page is fully loaded
    const handleLoad = () => {
      // Extra timeout for a smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // If the page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {isLoading && <Preloader />}
      <HelpHeroSection
        badge={t('badge')}
        titleMain={t('titleMain')}
        titleAccent={t('titleAccent')}
        subtitle={t('subtitle')}
        description={t('description')}
        buttonText={t('buttonContact')}
        buttonHref="/contact"
        secondaryButtonText={t('buttonVideos')}
        secondaryButtonHref="#videos"
      />
      <HelpVideoSection />
    </main>
  );
} 