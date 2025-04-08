'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="relative w-[48px] h-8 rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer flex items-center px-1"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={`
        absolute w-6 h-6 rounded-full 
        bg-white dark:bg-gray-600 shadow-md
        flex items-center justify-center
        transition-transform duration-300 ease-in-out
        ${theme === 'dark' ? 'translate-x-[24px]' : 'translate-x-0'}
      `}>
        <span className="text-[14px] leading-none">
          {theme === 'light' ? '☀️' : '🌙'}
        </span>
      </div>
    </button>
  );
} 