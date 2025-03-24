'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import HeroSection from './_components/HeroSection';
import PackageSection from './_components/PackageSection';
import ReviewSection from './_components/ReviewSection';
import PelicanPanelSection from './_components/PelicanPanelSection';
import FAQSection from './_components/FAQSection';

export default function PalworldPage() {
  const [isLoading, setIsLoading] = useState(true);

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
    <main className="min-h-screen">
      {isLoading && <Preloader />}
      <div className={`w-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection />
        <PackageSection />
        <ReviewSection />
        <PelicanPanelSection />
        <FAQSection />
      </div>
    </main>
  );
} 