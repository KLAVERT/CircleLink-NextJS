'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaGamepad, FaServer, FaCogs } from 'react-icons/fa';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import Grid, { GridItem } from '@/components/Grid';

const GameHeroSection = () => {
  const t = useTranslations('games');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Popular games showcase
  const featuredGames = [
    {
      name: 'Minecraft',
      image: '/images/jpg/games/featured-logos/minecraft.jpg',
      slug: '/games/minecraft'
    },
    {
      name: 'Rust',
      image: '/images/jpg/games/featured-logos/rust.jpg',
      slug: '/games/rust'
    },
    {
      name: 'ARK',
      image: '/images/jpg/games/featured-logos/ark.jpg',
      slug: '/games/ark'
    },
    {
      name: 'Palworld',
      image: '/images/jpg/games/featured-logos/palworld.jpg',
      slug: '/games/palworld'
    }
  ];

  return (
    <section className="bg-[var(--color-primary)] pt-24 pb-16 md:pt-32 md:pb-24 relative">
      {/* Background with gradient only */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(88, 101, 242, 0.15) 0%, rgba(88, 101, 242, 0) 70%)',
            mixBlendMode: 'screen'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Hero content */}
          <div className="flex flex-col items-center text-center mb-16">
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-quinary)] text-sm font-semibold mb-4"
            >
              <FaGamepad className="w-4 h-4" />
              {t('heroSection.badge') || 'GAME HOSTING'}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-text-primary)]"
            >
              {t('heroSection.title1') || 'Game Servers'} <span className="text-[var(--color-quinary)]">{t('heroSection.title2') || 'Made Simple'}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--color-text-subtle)] max-w-3xl mx-auto mb-8"
            >
              {t('heroSection.description') || 'Host your favorite game server with CircleLink. Easy setup, powerful hardware, and full control over your gaming experience.'}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button 
                variant="primary" 
                href="/games/pelican"
              >
                <div className="flex items-center gap-2">
                  <FaServer className="w-4 h-4" />
                  <span>{t('heroSection.primaryButton') || 'See Panel'}</span>
                </div>
              </Button>
              <Button 
                variant="outline" 
                href="#game-list"
              >
                <div className="flex items-center gap-2">
                  <FaCogs className="w-4 h-4" />
                  <span>{t('heroSection.secondaryButton') || 'View All Games'}</span>
                </div>
              </Button>
            </motion.div>
          </div>

          {/* Featured games - visible on all devices */}
          <motion.div
            variants={itemVariants}
            className="mt-8 mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[var(--color-text-primary)]">
              {t('heroSection.featuredTitle') || 'Popular Game Servers'}
            </h2>
            <Grid columns={2} mdColumns={4} spacing="md">
              {featuredGames.map((game, index) => (
                <GridItem key={index}>
                  <motion.a
                    href={game.slug}
                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 block h-full"
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative h-48 md:h-64 w-full rounded-xl overflow-hidden">
                      <Image
                        src={game.image}
                        alt={game.name}
                        fill
                        priority={game.name === 'Rust' || index < 2}
                        sizes="(max-width: 768px) 50vw, 25vw"
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white">{game.name}</h3>
                        <p className="text-white/80 text-sm mt-1">
                          {t('heroSection.viewDetails') || 'View details'}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                </GridItem>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GameHeroSection; 