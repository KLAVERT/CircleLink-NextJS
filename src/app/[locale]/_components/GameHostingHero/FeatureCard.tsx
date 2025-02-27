'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index?: number;
}

const FeatureCard = ({ title, description, icon, index = 0 }: FeatureCardProps) => {
  return (
    <motion.div 
      className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary)] p-6 rounded-lg shadow-sm transition-all duration-300 group"
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.4, ease: 'easeOut' } 
      }}
    >
      <div 
        className="w-14 h-14 bg-[var(--color-secondary)] dark:bg-[var(--color-quaternary)] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[var(--color-quaternary)] dark:group-hover:bg-[var(--color-quinary)] transition-all shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--color-senary)] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] dark:text-white mb-3 group-hover:text-[var(--color-quinary)] dark:group-hover:text-[var(--color-senary)] transition-colors">
        {title}
      </h3>
      
      <p className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] group-hover:text-[var(--color-text-primary)] dark:group-hover:text-white transition-colors">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard; 