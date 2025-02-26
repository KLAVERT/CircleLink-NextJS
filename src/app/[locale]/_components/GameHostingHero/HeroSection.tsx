'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left column - Text content */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)] font-medium text-sm md:text-base mb-1">
            #1 Game Server Hosting
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] leading-tight">
              Professionele 
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-quinary)] dark:text-[var(--color-quinary)] leading-tight">
              Game Hosting
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] leading-tight">
              voor jouw server
            </h1>
          </div>
          <p className="text-[var(--color-text-subtle)] dark:text-[var(--color-text-subtle)] text-lg md:text-xl max-w-xl">
            Betrouwbare, snelle en betaalbare game server hosting met 24/7 support en eenvoudige configuratie. Start binnen enkele minuten jouw eigen gameserver!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/hosting/pricing" className="px-8 py-4 bg-[var(--color-quinary)] dark:bg-[var(--color-quinary)] text-white font-bold rounded-lg hover:bg-[var(--color-senary)] dark:hover:bg-[var(--color-senary)] transition-all flex items-center justify-center">
              Bekijk Prijzen
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="/hosting/games" className="px-8 py-4 border border-[var(--color-quinary)] dark:border-[var(--color-quinary)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] font-bold rounded-lg hover:bg-[var(--color-quinary)]/10 dark:hover:bg-[var(--color-quinary)]/10 transition-all flex items-center justify-center">
              Ondersteunde Games
            </Link>
          </div>
        </div>
        
        {/* Right column - Only SVG and stats */}
        <div className="w-full md:w-1/2 flex flex-col items-center mt-12 md:mt-0">
          <div className="relative w-full flex justify-center">
            <Image 
              src="/svg/mainpage/server-kast-guy.svg"
              alt="Server Hosting Illustration"
              width={420}
              height={420}
              className="w-[340px] sm:w-[380px] md:w-[420px] h-auto animate-sideToSide"
              priority
            />
            
            {/* Stats bar overlapping with the bottom of the SVG */}
            <div className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 grid grid-cols-3 gap-2 sm:gap-3 px-2 sm:px-4 md:px-8">
              <div className="bg-[var(--color-bg-surface)] dark:bg-[var(--color-text-primary)] rounded-lg text-center shadow-md border-t-2 border-[var(--color-quinary)] dark:border-[var(--color-quinary)] p-2 sm:p-3 md:p-4">
                <p className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)] font-bold text-base sm:text-lg md:text-xl">99.9%</p>
                <p className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)] text-xs sm:text-sm">Uptime</p>
              </div>
              <div className="bg-[var(--color-bg-surface)] dark:bg-[var(--color-text-primary)] rounded-lg text-center shadow-md border-t-2 border-[var(--color-quinary)] dark:border-[var(--color-quinary)] p-2 sm:p-3 md:p-4">
                <p className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)] font-bold text-base sm:text-lg md:text-xl">24/7</p>
                <p className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)] text-xs sm:text-sm">Support</p>
              </div>
              <div className="bg-[var(--color-bg-surface)] dark:bg-[var(--color-text-primary)] rounded-lg text-center shadow-md border-t-2 border-[var(--color-quinary)] dark:border-[var(--color-quinary)] p-2 sm:p-3 md:p-4">
                <p className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)] font-bold text-base sm:text-lg md:text-xl">100+</p>
                <p className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)] text-xs sm:text-sm">Game Mods</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 