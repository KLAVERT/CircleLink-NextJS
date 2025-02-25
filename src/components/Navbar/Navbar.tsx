'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import Button from '../Button/Button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: t('about'), href: `/${locale}#about` },
    { label: t('projects'), href: `/${locale}#projects` },
    { label: t('skills'), href: `/${locale}#skills` },
    { label: t('contact'), href: `/${locale}#contact` },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/svg/klavertjuh-logo.svg"
              alt="Klavertjuh Logo"
              width={56}
              height={56}
              className="w-auto h-14"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
            <ThemeSwitch />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            ariaLabel={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center space-x-4 px-3 py-2">
            <LanguageSwitcher />
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
} 