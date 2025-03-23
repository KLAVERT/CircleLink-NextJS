'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import InfoSection from './_components/InfoSection';
import PackagesSection from './_components/PackagesSection';
import FAQSection from './_components/FAQSection';

export default function DiscordPage() {
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
        <InfoSection />
        <PackagesSection />
        <FAQSection />
      </div>
    </main>
  );
} 