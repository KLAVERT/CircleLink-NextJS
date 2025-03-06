'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import { useTheme } from 'next-themes';
import { FaGamepad, FaMicrochip } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileHostingOpen, setIsMobileHostingOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const t = useTranslations('navigation');
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scrolling', window.scrollY);
      if (window.scrollY > 0) {
        console.log('Setting scrolled to true');
        setScrolled(true);
      } else {
        console.log('Setting scrolled to false');
        setScrolled(false);
      }
    };

    console.log('Adding scroll listener');
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log('Scrolled state:', scrolled);

  const hostingOptions = [
    {
      title: t('gameHosting'),
      description: t("gameHostingDescription"),
      icon: <FaGamepad />,
      href: '/games'
    },
    {
      title: t('webHosting'),
      description: t("webHostingDescription"),
      icon: <FaMicrochip />,
      href: '/web'
    },
    {
      title: t('discordHosting'),
      description: t("discordHostingDescription"),
      icon: <FaDiscord />,
      href: '/discord'
    }
  ];

  const panelOptions = [
    {
      name: 'Gaming Panel',
      href: 'https://panel.circlelink.eu'
    },
    {
      name: 'Web Hosting Panel',
      href: 'https://nl.web1.circlelink.eu'
    },
    {
      name: 'Php My Admin',
      href: 'https://phpmyadmin.circlelink.eu'
    }
  ]

  const navItems = [
    { label: t('help'), href: `/${locale}#skills` },
    { label: t('contact'), href: `/${locale}#contact` },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 ${
      scrolled 
        ? 'bg-[var(--color-tertiary)] shadow-lg' 
        : 'bg-transparent'
    } transition-colors duration-300 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 lg:pr-8">
            <Link href={`/${locale}`}>
              {!mounted ? (
                <Image
                  src="/svg/logo.svg"
                  alt="Circlelink"
                  width={56}
                  height={56}
                  className="w-auto h-10"
                  priority
                />
              ) : resolvedTheme === 'dark' ? (
                <Image
                  src="/svg/logo-w.svg"
                  alt="Circlelink"
                  width={56}
                  height={56}
                  className="w-auto h-10"
                  priority
                />
              ) : (
                <Image
                  src="/svg/logo.svg"
                  alt="Circlelink"
                  width={56}
                  height={56}
                  className="w-auto h-10"
                  priority
                />
              )}
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden min-[1101px]:flex items-center justify-center space-x-8 lg:flex-1 lg:px-12">
            <Dropdown
              trigger={t('hosting')}
              items={hostingOptions}
              variant="hosting"
            />
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[var(--color-text-primary)] hover:text-[var(--color-quinary)]"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right: Language, Theme, Panel Login */}
          <div className="hidden min-[1101px]:flex items-center space-x-6 lg:pl-8">
            <LanguageSwitcher />
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
            <ThemeSwitch />
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
            {/* <Button variant="secondary" href="https://panel.circlelink.eu/">Panel login</Button> */}
            <Dropdown
              trigger={'panels'}
              items={panelOptions}
              variant="default"
              useButtonUI={true}
              buttonVariant="secondary"
            />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (isMenuOpen) {
                document.body.style.overflow = '';
              }
            }}
            className="min-[1101px]:hidden"
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
        className={`min-[1101px]:hidden transition-transform transition-opacity duration-300 ${
          isMenuOpen
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className={`px-4 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700 ${scrolled ? 'bg-[var(--color-tertiary)]' : 'bg-transparent'}`}>
          {/* Mobile Hosting Dropdown */}
          <div className="block px-3 py-2">
            <button
              onClick={() => setIsMobileHostingOpen(!isMobileHostingOpen)}
              className="flex items-center justify-between w-full text-[var(--color-text-primary)] hover:text-[var(--color-quinary)]"
            >
              <span>{t('hosting')}</span>
              <svg
                className={`w-4 h-4 ${isMobileHostingOpen ? 'rotate-180' : ''}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`mt-2 space-y-1 ${isMobileHostingOpen ? 'block' : 'hidden'}`}>
              {hostingOptions.map((item, index) => (
                <Link
                  key={index}
                  href={item.href || '#'}
                  className="block pl-4 py-2"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl text-[var(--color-text-primary)]">{item.icon}</span>
                    <div>
                      <div className="text-[var(--color-text-primary)]">{item.title}</div>
                      <p className="text-sm text-[var(--color-text-subtle)]">{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-2 text-[var(--color-text-primary)] hover:text-[var(--color-quinary)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col space-y-4 px-3 py-2">
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
            <div className="flex justify-center">
              <ThemeSwitch />
            </div>
            <div className="flex justify-center">
              <Dropdown
                trigger={'panels'}
                items={panelOptions}
                variant="default"
                useButtonUI={true}
                buttonVariant="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 