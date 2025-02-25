'use client';

import { useState } from 'react';
import Button from '../Button/Button';

interface DropdownProps {
  trigger: React.ReactNode;
  items: {
    key: string;
    content: React.ReactNode;
    onClick: () => void;
    isSelected?: boolean;
  }[];
  width?: string | number;
}

export default function Dropdown({ trigger, items, width = '180px' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block" style={{ width }}>
      <Button
        variant="primary"
        onClick={() => setIsOpen(!isOpen)}
        fullWidth
        ariaLabel={isOpen ? 'Close dropdown' : 'Open dropdown'}
        className="justify-between"
      >
        {trigger}
      </Button>
      <div className={`absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-all duration-200 z-50 ${
        isOpen 
          ? 'opacity-100 visible translate-y-0' 
          : 'opacity-0 invisible -translate-y-2'
      }`}>
        {items.map(({ key, content, onClick, isSelected }) => (
          <Button
            key={key}
            onClick={() => {
              onClick();
              setIsOpen(false);
            }}
            variant="ghost"
            disabled={isSelected}
            fullWidth
            className={`justify-start ${isSelected ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            {content}
          </Button>
        ))}
      </div>
    </div>
  );
} 