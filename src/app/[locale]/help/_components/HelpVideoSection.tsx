import React from 'react';
import { motion } from 'framer-motion';

const HelpVideoSection: React.FC = () => {
  return (
    <motion.section
      id="videos"
      className="w-full bg-[var(--color-secondary)] py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
          Video Tutorials (binnenkort beschikbaar)
        </h2>
        <div className="flex flex-wrap justify-center gap-8 min-h-[200px] items-center bg-[var(--color-bg-surface)] rounded-xl shadow-inner p-8">
          <span className="text-[var(--color-text-subtle)] text-lg">Hier komen binnenkort handige uitlegvideo's over alles rondom je server!</span>
        </div>
      </div>
    </motion.section>
  );
};

export default HelpVideoSection; 