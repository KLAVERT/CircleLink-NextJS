'use client';

import React from 'react';
import { FaFilter } from 'react-icons/fa';
import Button from '@/components/Button/Button';

export type GameCategory = 'all' | 'survival' | 'simulation' | 'sandbox' | 'fpsRpg';

interface GameFilterProps {
  activeFilter: GameCategory;
  setActiveFilter: (category: GameCategory) => void;
  categories: {
    id: string;
    label: string;
  }[];
}

const GameFilter: React.FC<GameFilterProps> = ({ 
  activeFilter, 
  setActiveFilter, 
  categories 
}) => {
  // Debug logging
  console.log('GameFilter rendering with activeFilter:', activeFilter);
  
  const handleFilterClick = (categoryId: string) => {
    console.log('Filter clicked:', categoryId);
    setActiveFilter(categoryId as GameCategory);
  };

  // Adding more direct handling
  const handleDivClick = (categoryId: string) => {
    console.log('Div clicked:', categoryId);
    setActiveFilter(categoryId as GameCategory);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto relative z-20">
      <FaFilter className="text-[var(--color-text-subtle)] mr-2 flex-shrink-0" />
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="relative z-20 pointer-events-auto"
          >
            {/* Direct button implementation as a fallback */}
            <button
              type="button"
              onClick={() => handleFilterClick(category.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer
                ${activeFilter === category.id 
                  ? 'bg-[var(--color-quinary)] text-white' 
                  : 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'}
              `}
              aria-label={`Filter by ${category.label}`}
            >
              {category.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameFilter; 