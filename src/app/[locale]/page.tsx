'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader/Preloader';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('common');

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
    <>
      {isLoading && <Preloader />}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Components */}
      </div>
    </>
  );
} 