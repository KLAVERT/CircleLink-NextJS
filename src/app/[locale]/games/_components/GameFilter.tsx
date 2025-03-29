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
      <div className="flex items-center gap-2">
        <FaFilter className="text-[var(--color-text-subtle)]" />
        {categories.map((category) => (
          <button
            key={category.id}
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
        ))}
      </div>
    </div>
  );
};

export default GameFilter; 