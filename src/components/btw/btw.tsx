'use client';

import { useState, createContext, useContext, ReactNode } from 'react';

interface BtwContextType {
  includeBtw: boolean;
  toggleBtw: () => void;
  calculatePrice: (basePrice: string) => string;
}

const BtwContext = createContext<BtwContextType | undefined>(undefined);

export const useBtw = () => {
  const context = useContext(BtwContext);
  if (!context) {
    throw new Error('useBtw must be used within a BtwProvider');
  }
  return context;
};

interface BtwProviderProps {
  children: ReactNode;
  btwPercentage?: number;
}

export function BtwProvider({ children, btwPercentage = 21 }: BtwProviderProps) {
  const [includeBtw, setIncludeBtw] = useState(false);

  const toggleBtw = () => {
    setIncludeBtw(prev => !prev);
  };

  const calculatePrice = (basePrice: string): string => {
    // Extract numeric value from price string (assuming format like "€1.50,-")
    const numericValue = parseFloat(basePrice.replace(/[^0-9,\.]/g, '').replace(',', '.'));
    
    if (isNaN(numericValue)) return basePrice;
    
    if (includeBtw) {
      // Calculate price with BTW added
      const priceWithBtw = numericValue * (1 + (btwPercentage / 100));
      return `€${priceWithBtw.toFixed(2).replace('.', ',')}`;
    } else {
      // Return the base price without BTW
      return `€${numericValue.toFixed(2).replace('.', ',')}`;
    }
  };

  return (
    <BtwContext.Provider value={{ includeBtw, toggleBtw, calculatePrice }}>
      {children}
    </BtwContext.Provider>
  );
}

export function BtwToggle() {
  const { includeBtw, toggleBtw } = useBtw();
  
  return (
    <div className="flex items-center justify-end mb-4">
      <label htmlFor="btw-toggle" className="flex items-center cursor-pointer">
        <span className="text-sm text-[var(--color-text-subtle)] mr-2">
          {includeBtw ? 'Incl. BTW' : 'Excl. BTW'}
        </span>
        <div className="relative">
          <input
            id="btw-toggle"
            type="checkbox"
            className="sr-only"
            checked={includeBtw}
            onChange={toggleBtw}
          />
          <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner"></div>
          <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out transform ${includeBtw ? 'translate-x-4 bg-green-500' : 'bg-white'}`}></div>
        </div>
      </label>
    </div>
  );
}
