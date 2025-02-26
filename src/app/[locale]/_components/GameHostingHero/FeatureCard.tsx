'use client';

import React, { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="bg-[var(--color-bg-surface)] dark:bg-[var(--color-bg-primary)] p-6 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border)] hover:border-[var(--color-quinary)] dark:hover:border-[var(--color-quinary)] transition-all group">
      <div className="w-12 h-12 bg-[var(--color-bg-primary)] dark:bg-[var(--color-tertiary)] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[var(--color-quaternary)]/30 dark:group-hover:bg-[var(--color-tertiary)] transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-quinary)] dark:text-[var(--color-quinary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] mb-3">{title}</h3>
      <p className="text-[var(--color-text-subtle)] dark:text-[var(--color-text-subtle)]">{description}</p>
    </div>
  );
};

export default FeatureCard; 