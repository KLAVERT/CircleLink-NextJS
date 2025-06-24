'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FaRocket, FaUsers, FaChartLine, FaCogs } from 'react-icons/fa';
import Button from '@/components/Button/Button';
import FeatureCard from '@/components/FeatureCard/FeatureCard';

const features = [
  {
    icon: <FaRocket />, // svg icon
    title: 'Instant Setup',
    description: 'Server online binnen 3 minuten',
  },
  {
    icon: <FaUsers />,
    title: 'Multi-User Support',
    description: 'Beheer meerdere gebruikers',
  },
  {
    icon: <FaChartLine />,
    title: 'Real-time Monitoring',
    description: 'Live server statistieken',
  },
  {
    icon: <FaCogs />,
    title: 'Advanced Control',
    description: 'Volledige server controle',
  },
];

const PelicanHeroSection = () => {
  const t = useTranslations('pelican');

  return (
    <section className="relative w-full bg-[var(--color-primary)] pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Subtiele statische bolletjes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-6 h-6 rounded-full bg-[var(--color-secondary)] opacity-10" />
        <div className="absolute top-1/2 right-20 w-8 h-8 rounded-full bg-[var(--color-quinary)] opacity-10" />
        <div className="absolute bottom-10 left-1/3 w-4 h-4 rounded-full bg-[var(--color-senary)] opacity-10" />
        <div className="absolute bottom-20 right-1/4 w-5 h-5 rounded-full bg-[var(--color-accent-cool)] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-quinary)] text-sm font-semibold mb-4">
            {t('hero.badge') || 'PELICAN PANEL'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-text-primary)]">
            {t('hero.title') || 'Pelican Panel'} <span className="text-[var(--color-quinary)]">{t('hero.subtitle') || 'Next-Generation Control'}</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-subtle)] max-w-3xl mx-auto mb-8">
            {t('hero.description') || 'Experience the most intuitive and powerful game hosting interface, designed for both beginners and advanced users.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" href="#features">
              <span className="flex items-center gap-2"><FaCogs />{t('hero.buttons.getStarted') || 'Verken functies'}</span>
            </Button>
            <Button variant="outline" href="#demo">
              <span className="flex items-center gap-2"><FaRocket />{t('hero.buttons.viewDemo') || 'Bekijk demo'}</span>
            </Button>
          </div>
        </div>
        {/* Feature cards grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                price=""
                features={[]}
                buttonText="Meer info"
                href="#features"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PelicanHeroSection; 