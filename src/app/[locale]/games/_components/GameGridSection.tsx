'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import GameCard from './GameCard';
import GameFilter, { GameCategory } from './GameFilter';

interface Game {
  id: string;
  name: string;
  edition?: string;
  category: GameCategory[];
  image: string;
  slug: string;
  popularity: number; // 1-10
  description: string;
  price: number;
  backgroundImage?: string;
  backgroundWidth?: string;
}

const GameGridSection = () => {
  const t = useTranslations('games');
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<GameCategory>('all');
  
  // Sample game data with descriptions and pricing
  const games: Game[] = [
    {
      id: 'minecraft',
      name: 'Minecraft',
      category: ['sandbox', 'survival'],
      image: '/images/webp/games/logos/minecraft.webp',
      slug: '/games/minecraft',
      popularity: 10,
      description: t('gameDescriptions.minecraft'),
      price: 0.80,
      backgroundImage: '/images/webp/games/backgrounds/minecraft-wallpaper.webp',
      backgroundWidth: 'w-2/3'
    },
    {
      id: 'rust',
      name: 'Rust',
      category: ['survival', 'fpsRpg'],
      image: '/images/webp/games/logos/rust.webp',
      slug: '/games/rust',
      popularity: 9,
      description: t('gameDescriptions.rust'),
      price: 7.50,
      backgroundImage: '/images/webp/games/backgrounds/rust-wallpaper.webp',
      backgroundWidth: 'w-2/3'
    },
    {
      id: 'ark',
      name: 'ARK',
      edition: 'Survival Evolved',
      category: ['survival', 'sandbox'],
      image: '/images/webp/games/logos/ark.webp',
      slug: '/games/ark',
      popularity: 8,
      description: t('gameDescriptions.ark'),
      price: 10.00,
      backgroundImage: '/images/webp/games/backgrounds/ark-wallpaper.webp',
      backgroundWidth: 'w-2/3'
    },
    {
      id: 'palworld',
      name: 'Palworld',
      category: ['survival', 'sandbox'],
      image: '/images/webp/games/logos/palworld.webp',
      slug: '/games/palworld',
      popularity: 9,
      description: t('gameDescriptions.palworld'),
      price: 15.00,
      backgroundImage: '/images/webp/games/backgrounds/palworld-wallpaper.webp',
      backgroundWidth: 'w-2/3'
    },
    {
      id: 'satisfactory',
      name: 'Satisfactory',
      category: ['simulation', 'sandbox'],
      image: '/images/webp/games/logos/satisfactory.webp',
      slug: '/games/satisfactory',
      popularity: 7,
      description: t('gameDescriptions.satisfactory'),
      price: 6.50,
      backgroundImage: '/images/webp/games/backgrounds/satisfactory-wallpaper.webp',
      backgroundWidth: 'w-2/3'
    },
    {
      id: 'sotf',
      name: 'Sons of the Forest',
      category: ['survival', 'fpsRpg'],
      image: '/images/webp/games/logos/sotf.webp',
      slug: '/games/sotf',
      popularity: 7,
      description: t('gameDescriptions.sotf'),
      price: 7.00,
      backgroundImage: '/images/webp/games/backgrounds/sotf-wallpaper.webp',
      backgroundWidth: 'w-2/3'
    },
    {
      id: 'fivem',
      name: 'FiveM',
      category: ['fpsRpg', 'simulation'],
      image: '/images/webp/games/logos/fivem.webp',
      slug: '/games/fivem',
      popularity: 8,
      description: t('gameDescriptions.fivem'),
      price: 9.50,
      backgroundImage: '/images/webp/games/backgrounds/fivem-wallpaper.webp',
      backgroundWidth: 'w-2/3'
    },
    {
      id: 'gmod',
      name: 'Garry\'s Mod',
      category: ['sandbox', 'fpsRpg'],
      image: '/images/webp/games/logos/gmod.webp',
      slug: '/games/gmod',
      popularity: 7,
      description: t('gameDescriptions.gmod'),
      price: 4.50,
      backgroundImage: '/images/webp/games/backgrounds/gmod-wallpaper.webp',
      backgroundWidth: 'w-2/3'
    },
    {
      id: 'theforest',
      name: 'The Forest',
      category: ['survival', 'fpsRpg'],
      image: '/images/webp/games/logos/theforest.webp',
      slug: '/games/theforest',
      popularity: 6,
      description: t('gameDescriptions.theforest'),
      price: 5.50,
      backgroundImage: '/images/webp/games/backgrounds/theforest-wallpaper.webp',
      backgroundWidth: 'w-2/3'
    }
  ];

  // Filter categories
  const categories = [
    { id: 'all', label: t('gameGrid.filters.all') || 'All Games' },
    { id: 'survival', label: t('gameGrid.filters.survival') || 'Survival' },
    { id: 'simulation', label: t('gameGrid.filters.simulation') || 'Simulation' },
    { id: 'sandbox', label: t('gameGrid.filters.sandbox') || 'Sandbox' },
    { id: 'fpsRpg', label: t('gameGrid.filters.fpsRpg') || 'FPS/RPG' }
  ];

  // Filter games based on search and category
  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'all' || game.category.includes(activeFilter);
    return matchesSearch && matchesCategory;
  });

  // Handle filter change with logging
  const handleFilterChange = (category: GameCategory) => {
    console.log('Filter changing from', activeFilter, 'to', category);
    setActiveFilter(category);
  };

  useEffect(() => {
    setIsLoaded(true);
    
    // Log every time activeFilter changes
    console.log('Active filter changed to:', activeFilter);
  }, [activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section id="game-list" className="bg-[var(--color-tertiary)] py-16 md:py-24 border-t border-[var(--color-border)] relative">
      {/* Explicit background styling to override any grid pattern */}
      <div
        className="absolute inset-0 z-0" 
        style={{
          background: 'var(--color-tertiary)',
          backgroundImage: 'none' // Explicitly override any grid pattern
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 pointer-events-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
              {t('gameGrid.title') || 'All Available Game Servers'}
            </h2>
            <p className="text-[var(--color-text-subtle)] max-w-3xl mx-auto">
              {t('gameGrid.description') || 'Browse our selection of game servers. We support a wide range of popular games with customizable hosting options.'}
            </p>
          </div>

          {/* Search and filter with improved pointer-events */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 relative z-30 pointer-events-auto">
            <div className="relative w-full md:w-96 pointer-events-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-[var(--color-text-subtle)]" />
              </div>
              <input
                type="text"
                placeholder={t('gameGrid.searchPlaceholder') || "Search for a game..."}
                className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg py-2 pl-10 pr-4 w-full text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-quinary)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Using the new GameFilter component with improved pointer-events */}
            <div className="w-full md:w-auto relative z-50 pointer-events-auto">
              <GameFilter 
                activeFilter={activeFilter}
                setActiveFilter={handleFilterChange}
                categories={categories}
              />
            </div>
          </div>

          {/* Game list with lower z-index to prevent overlap with filters */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-6 relative z-10"
          >
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  name={game.name}
                  edition={game.edition}
                  description={game.description}
                  price={game.price}
                  image={game.image}
                  slug={game.slug}
                  backgroundImage={game.backgroundImage}
                  backgroundWidth={game.backgroundWidth}
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-[var(--color-text-subtle)] text-lg">
                  {t('gameGrid.noResults') || 'No games found matching your search criteria.'}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GameGridSection; 