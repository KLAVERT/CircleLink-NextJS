'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Start fade in
    const fadeIn = setTimeout(() => setOpacity(1), 100);

    return () => clearTimeout(fadeIn);
  }, []);

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-[100]">
      <div
        className="transition-all duration-1000 ease-in-out transform"
        style={{ 
          opacity,
          transform: `scale(${opacity === 0 ? 0.95 : 1})`
        }}
      >
        <Image
          src="/svg/klavertjuh-logo.svg"
          alt="Klavertjuh Logo"
          width={150}
          height={150}
          className="w-auto h-auto animate-pulse"
          priority
        />
      </div>
    </div>
  );
} 