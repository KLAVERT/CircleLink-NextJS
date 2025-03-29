'use client';

import React from 'react';
import { FaFilter } from 'react-icons/fa';

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
  
  const handleFilterClick = (categoryId: string) => {
    setActiveFilter(categoryId as GameCategory);
  };

  return (
    <div className="w-full md:w-auto relative z-20">
      <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
        <FaFilter className="text-[var(--color-text-subtle)] flex-shrink-0" />
        <div className="flex items-center gap-2 md:gap-3 flex-nowrap">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleFilterClick(category.id)}
              className={`
                px-3 md:px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer flex-shrink-0
                ${activeFilter === category.id 
                  ? 'bg-[var(--color-quinary)] text-white' 
                  : 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'}
                transition-colors duration-200
              `}
              aria-label={`Filter by ${category.label}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameFilter; 