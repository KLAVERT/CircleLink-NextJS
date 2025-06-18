'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function RootPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';  
    };
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`fixed inset-0 bg-[var(--color-bg-primary)] flex items-center justify-center z-[9999] transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="w-[180px] h-[90px]">
          <svg 
            viewBox="0 0 120 60" 
            xmlns="http://www.w3.org/2000/svg"
            fill={resolvedTheme === 'dark' ? 'var(--color-senary)' : 'var(--color-quinary)'}
            className="w-full h-full"
          >
            <circle cx="30" cy="30" r="8">
              <animateTransform attributeName="transform" dur="1s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.1" />
            </circle>
            <circle cx="60" cy="30" r="8">
              <animateTransform attributeName="transform" dur="1s" type="translate" values="0 10 ; 0 -10; 0 10" repeatCount="indefinite" begin="0.2" />
            </circle>
            <circle cx="90" cy="30" r="8">
              <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3" />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
} 