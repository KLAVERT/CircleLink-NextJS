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
      className="relative w-[48px] h-6 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300 cursor-pointer"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={`
        absolute top-[2px] left-[2px] w-5 h-5 rounded-full 
        bg-white dark:bg-gray-600 shadow-md
        flex items-center justify-center
        transition-transform duration-300 ease-in-out
        ${theme === 'dark' ? 'translate-x-[24px]' : 'translate-x-0'}
      `}>
        <span className="text-[12px] leading-none">
          {theme === 'light' ? '☀️' : '🌙'}
        </span>
      </div>
    </button>
  );
} 