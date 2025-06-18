"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button/Button';

export interface GameReviewSectionProps {
  title: string | { key: string };
  subtitle?: string | { key: string };
  translationNamespace?: string;
}

function resolveText(
  t: (k: string, values?: Record<string, any>) => string,
  value: string | { key: string },
  values?: Record<string, any>
) {
  if (typeof value === 'string') return value;
  return t(value.key, values);
}

const GameReviewSection: React.FC<GameReviewSectionProps> = ({
  title,
  subtitle,
  translationNamespace
}) => {
  const t = useTranslations(translationNamespace || undefined);

  return (
    <section className="w-full py-16 bg-[var(--color-primary)] overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4 md:mb-0">
              {resolveText(t, title)}
            </h2>
            <div className="flex items-center min-h-[2.5rem]">
              {subtitle && (
                <span className="text-sm text-[var(--color-text-primary)]">
                  {resolveText(t, subtitle)}
                </span>
              )}
              <a 
                href="https://www.trustpilot.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="no-underline align-middle"
                style={{ display: 'inline-flex', alignItems: 'center', height: '2rem' }}
              >
                <span className="font-bold text-xl bg-gradient-to-r from-[#00b67a] to-[#007055] bg-clip-text text-transparent rounded ml-1">
                  Trustpilot
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
            <p className="text-2xl text-[var(--color-text-primary)] font-semibold">Coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameReviewSection; 