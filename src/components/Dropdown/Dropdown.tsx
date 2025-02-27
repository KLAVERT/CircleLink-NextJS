'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Button from '../Button/Button';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DropdownItem {
  title?: string;
  description?: string;
  icon?: IconDefinition;
  href?: string;
  onClick?: () => void;
  content?: React.ReactNode;
  isSelected?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  variant?: 'default' | 'hosting' | 'language';
  className?: string;
  width?: string;
}

export default function Dropdown({ trigger, items, variant = 'default', className = '', width }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hover state with delay for better UX
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 100); // Small delay to prevent menu from closing when moving between elements
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const renderHostingItem = (item: DropdownItem) => (
    <Link
      href={item.href || '#'}
      className="block px-4 py-3 group/item"
    >
      <div className="flex items-center space-x-4 relative group-hover/item:bg-[var(--color-quinary)] rounded-md transition-transform duration-300 p-2 -mx-2">
        {item.icon && (
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
            <FontAwesomeIcon icon={item.icon} className="text-4xl text-[var(--color-text-primary)] group-hover/item:text-white" />
          </div>
        )}
        <div className="flex flex-col">
          {item.title && (
            <div className="font-medium text-[var(--color-text-primary)] group-hover/item:text-white">
              {item.title}
            </div>
          )}
          {item.description && (
            <p className="text-sm text-[var(--color-text-subtle)] group-hover/item:text-white">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );

  const renderLanguageItem = (item: DropdownItem) => (
    <button
      onClick={() => {
        item.onClick?.();
        setIsOpen(false);
      }}
      disabled={item.isSelected}
      className={`w-full px-4 py-2 text-left ${
        item.isSelected
          ? 'bg-[var(--color-quinary)] text-white cursor-default'
          : 'text-[var(--color-text-primary)] hover:bg-[var(--color-quinary)] hover:text-white'
      }`}
    >
      {item.content}
    </button>
  );

  const renderDefaultItem = (item: DropdownItem) => (
    <button
      onClick={() => {
        item.onClick?.();
        setIsOpen(false);
      }}
      className="w-full px-4 py-2 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-quinary)] hover:text-white"
    >
      {item.content}
    </button>
  );

  if (variant === 'language') {
    return (
      <div className="relative inline-block" style={{ width: width || '180px' }}>
        <Button
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          fullWidth
          ariaLabel={isOpen ? 'Close language menu' : 'Open language menu'}
          className="justify-between"
        >
          {trigger}
        </Button>
        <div
          className={`absolute top-full left-0 w-full mt-1 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-md shadow-lg transition-opacity transition-transform duration-300 z-50 overflow-hidden ${
            isOpen 
              ? 'opacity-100 visible translate-y-0' 
              : 'opacity-0 invisible -translate-y-2'
          }`}
        >
          {items.map((item, index) => (
            <div key={index}>
              {renderLanguageItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center text-[var(--color-text-primary)] py-2 px-1 ${isHovering ? 'text-[var(--color-quinary)]' : ''}`}
        aria-expanded={isHovering}
      >
        {trigger}
        {variant !== 'hosting' && (
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      <div
        className={`absolute ${
          variant === 'hosting' ? '-translate-x-1/2 left-1/2 w-80' : 'left-0 w-48'
        } mt-0 pt-2 pb-2 bg-[var(--color-bg-primary)] rounded-lg shadow-lg z-50 border border-[var(--color-border)] transition-opacity transition-transform duration-300
        ${isHovering ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}
      >
        <div className="absolute w-full h-4 -top-4 bg-transparent"></div>
        
        {items.map((item, index) => (
          <div key={index}>
            {variant === 'hosting' ? renderHostingItem(item) : renderDefaultItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
} 