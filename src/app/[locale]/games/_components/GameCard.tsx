'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

interface GameCardProps {
  id?: string;
  name: string;
  edition?: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  backgroundImage?: string;
  backgroundWidth?: string;
}

const GameCard = ({ 
  name, 
  edition, 
  description, 
  price, 
  image, 
  slug, 
  backgroundImage = "", 
  backgroundWidth = "w-1/2" 
}: GameCardProps) => {
  const t = useTranslations('games');
  
  // Default to minecraft wallpaper for Minecraft cards if no backgroundImage is provided
  const isMinecraft = name.toLowerCase() === 'minecraft';
  const cardBackgroundImage = backgroundImage || (isMinecraft ? "/images/webp/games/backgrounds/minecraft-wallpaper.jpeg" : "");
  const hasBackground = !!cardBackgroundImage;

  return (
    <motion.div 
      className="relative w-full rounded-xl overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-tertiary)] p-0.5 rounded-xl">
        <div className={`bg-[var(--color-bg-primary)] rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden`}>
          {/* Background Wallpaper with Fade */}
          {hasBackground && (
            <div className={`absolute top-0 bottom-0 right-0 ${backgroundWidth} z-0 overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--color-bg-primary)] z-10"></div>
              <div className="absolute inset-0 opacity-30">
                <Image 
                  src={cardBackgroundImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'center right' }}
                />
              </div>
            </div>
          )}
          
          {/* Game Logo */}
          <div className="flex-shrink-0 z-10">
            <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg">
              <Image 
                src={image}
                alt={name}
                fill
                priority={name.toLowerCase() === 'rust'}
                sizes="(max-width: 768px) 80px, 96px"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 w-full h-full"
              />
            </div>
          </div>
          
          {/* Game Details */}
          <div className="flex-1 space-y-2 text-center md:text-left z-10">
            <div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] uppercase">
                {name} {edition && <span>SERVER: {edition}</span>}
              </h3>
              <div className="flex items-baseline gap-2 mt-1 justify-center md:justify-start">
                <span className="text-lg font-semibold">{t('gameCard.from')}</span>
                <span className="text-2xl font-bold text-[var(--color-quinary)]">€{price.toFixed(2)}</span>
                <span className="text-lg">p/m</span>
              </div>
            </div>
            
            <p className="text-[var(--color-text-subtle)] max-w-3xl">
              {description}
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mt-4">
              <div className="flex items-center gap-2">
                <FaCheck className="text-[var(--color-success)]" />
                <span className="text-sm text-[var(--color-text-primary)]">12/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-[var(--color-success)]" />
                <span className="text-sm text-[var(--color-text-primary)]">{t('gameCard.unlimitedSlots')}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-[var(--color-success)]" />
                <span className="text-sm text-[var(--color-text-primary)]">DDoS {t('gameCard.protection')}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-[var(--color-success)]" />
                <span className="text-sm text-[var(--color-text-primary)]">Pelican {t('gameCard.panel')}</span>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex-shrink-0 flex items-center mt-4 md:mt-0 z-10">
            <Link href={slug} className="bg-[var(--color-quinary)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] rounded-lg px-6 py-3 font-semibold transition-colors duration-300 whitespace-nowrap uppercase">
              {t('gameCard.viewPackages')}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard; 