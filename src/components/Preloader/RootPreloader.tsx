'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function RootPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleLoad = () => {
      // Start fade out wanneer alles is geladen
      setOpacity(0);
      // Verwijder preloader na fade
      setTimeout(() => setIsLoading(false), 500);
    };

    // Check of de pagina al geladen is
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-[9999]"
      style={{ 
        opacity,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
        Loading...
      </h2>
      <div className="flex items-center gap-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              animation: `spin 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            <Image
              src="/svg/klavertjuh-logo.svg"
              alt={`Loading ${i + 1}`}
              width={40}
              height={40}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
} 