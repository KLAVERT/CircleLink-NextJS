'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import GameCard from './GameCard';

type GameCategory = 'all' | 'survival' | 'simulation' | 'sandbox' | 'fpsRpg';

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
      edition: 'Java Edition',
      category: ['sandbox', 'survival'],
      image: '/images/jpg/games/minecraft.jpg',
      slug: '/games/minecraft',
      popularity: 10,
      description: 'De creativiteit uitwerken op een minecraft server, alleen of met vrienden? Start je server vandaag bij CircleLink!',
      price: 0.80
    },
    {
      id: 'rust',
      name: 'Rust',
      category: ['survival', 'fpsRpg'],
      image: '/images/jpg/games/rust.jpg',
      slug: '/games/rust',
      popularity: 9,
      description: 'Overleef in de harde wereld van Rust, waar elke speler een potentiële vijand is. Bouw je basis, vorm allianties en vecht om te overleven.',
      price: 8.00
    },
    {
      id: 'ark',
      name: 'ARK',
      edition: 'Survival Evolved',
      category: ['survival', 'sandbox'],
      image: '/images/jpg/games/ark.jpg',
      slug: '/games/ark',
      popularity: 8,
      description: 'Strijd om te overleven in een wereld vol dinosaurussen en prehistorische wezens. Tem dino\'s, bouw bases en verken een enorm eiland.',
      price: 7.50
    },
    {
      id: 'palworld',
      name: 'Palworld',
      category: ['survival', 'sandbox'],
      image: '/images/jpg/games/palworld.jpg',
      slug: '/games/palworld',
      popularity: 9,
      description: 'Duik in Palworld, de grensverleggende game die avonturiers meeneemt naar een wereld waar overleven, bouwen en het vangen van Pals centraal staan.',
      price: 6.00
    },
    {
      id: 'satisfactory',
      name: 'Satisfactory',
      category: ['simulation', 'sandbox'],
      image: '/images/jpg/games/satisfactory.jpg',
      slug: '/games/satisfactory',
      popularity: 7,
      description: 'Bouw enorme fabrieken, automatiseer productielijnen en verken een mysterieuze buitenaardse planeet in deze first-person factory-building game.',
      price: 6.50
    },
    {
      id: 'factorio',
      name: 'Factorio',
      category: ['simulation', 'sandbox'],
      image: '/images/jpg/games/factorio.jpg',
      slug: '/games/factorio',
      popularity: 8,
      description: 'Creëer complexe automatiseringssystemen en bouw een gigantische fabriek in deze verslavende simulatiegame waar efficiëntie alles is.',
      price: 5.00
    },
    {
      id: 'sotf',
      name: 'Sons of the Forest',
      category: ['survival', 'fpsRpg'],
      image: '/images/jpg/games/sotf.jpg',
      slug: '/games/sotf',
      popularity: 7,
      description: 'Overleef de gruwelen van een mysterieus eiland vol kannibalistische mutanten. Bouw, vecht en verken in deze angstaanjagende survival horror game.',
      price: 7.00
    },
    {
      id: 'fivem',
      name: 'FiveM',
      category: ['fpsRpg', 'simulation'],
      image: '/images/jpg/games/fivem.jpg',
      slug: '/games/fivem',
      popularity: 8,
      description: 'Creëer je eigen GTA-ervaring met FiveM, het platform dat het mogelijk maakt om aangepaste rollenspel-servers te draaien in de wereld van GTA V.',
      price: 9.50
    },
    {
      id: 'gmod',
      name: 'Garry\'s Mod',
      category: ['sandbox', 'fpsRpg'],
      image: '/images/jpg/games/gmod.jpg',
      slug: '/games/gmod',
      popularity: 7,
      description: 'Een zandbak-game met eindeloze mogelijkheden. Creëer je eigen speltypen, bouw constructies en experimenteer met de natuurkundige eigenschappen.',
      price: 4.50
    },
    {
      id: 'theforest',
      name: 'The Forest',
      category: ['survival', 'fpsRpg'],
      image: '/images/jpg/games/theforest.jpg',
      slug: '/games/theforest',
      popularity: 6,
      description: 'Overleef na een vliegtuigcrash op een beboste schiereiland vol kannibalistische stammen. Bouw, verken en verdedig jezelf tegen de gevaren van het woud.',
      price: 5.50
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section id="game-list" className="py-16 md:py-24 bg-[var(--color-bg-primary)]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
              {t('gameGrid.title') || 'All Available Game Servers'}
            </h2>
            <p className="text-[var(--color-text-subtle)] max-w-3xl mx-auto">
              {t('gameGrid.description') || 'Browse our selection of game servers. We support a wide range of popular games with customizable hosting options.'}
            </p>
          </div>

          {/* Search and filter */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full md:w-96">
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

            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <FaFilter className="text-[var(--color-text-subtle)] mr-2 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeFilter === category.id
                      ? 'bg-[var(--color-quinary)] text-white'
                      : 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                  }`}
                  onClick={() => setActiveFilter(category.id as GameCategory)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Game list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-6"
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