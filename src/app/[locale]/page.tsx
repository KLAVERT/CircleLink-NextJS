'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import HeroSection from './_components/HeroSection';
import FeaturesSection from './_components/FeaturesSection';
import PelicanPanelSection from './_components/PelicanPanelSection';
import FAQSection from './_components/FAQSection';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wacht tot de pagina volledig is geladen
    const handleLoad = () => {
      // Extra timeout voor een soepele overgang
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // Als de pagina al geladen is
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <main>
      {isLoading && <Preloader />}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection />
        <FeaturesSection />
        <PelicanPanelSection />
        <FAQSection />
      </div>
    </main>
  );
} 