'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button/Button';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const PelicanDemo: React.FC = () => {
  const t = useTranslations('pelican');

  return (
    <section id="demo" className="py-16 bg-[var(--color-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            {t('demo.title') || 'Pelican Panel Demo'}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            {t('demo.description') || 'Bekijk hoe eenvoudig het is om je server te beheren met het Pelican Panel. Deze demo laat alle belangrijke functies zien.'}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="relative w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Video Wrapper */}
          <div className="relative w-full aspect-video bg-[var(--color-secondary)] rounded-lg overflow-hidden shadow-2xl border border-[var(--color-quaternary)]">
            <iframe
              src="https://www.youtube.com/embed/HV4cBCtEnhg"
              title="Pelican Panel Demo"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Video Overlay Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Play Button Glow Effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[var(--color-quinary)] rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[var(--color-quinary)] opacity-60" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[var(--color-quinary)] opacity-60" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[var(--color-quinary)] opacity-60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[var(--color-quinary)] opacity-60" />
          </div>
        </motion.div>

        {/* Video Info */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-4 text-sm text-[var(--color-text-secondary)]">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[var(--color-quinary)] rounded-full animate-pulse" />
              <span>{t('demo.live') || 'Live Demo'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>{t('demo.hd') || 'HD Quality'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
              <span>{t('demo.secure') || 'Secure'}</span>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-[var(--color-text-secondary)] mb-4">
            {t('demo.cta') || 'Klaar om te beginnen? Start vandaag nog met het Pelican Panel!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary">
              <span className="flex items-center gap-2"><FaInfoCircle />{t('demo.startNow') || 'Nu Beginnen'}</span>
            </Button>
            <Button variant="outline">
              <span className="flex items-center gap-2"><FaPlay />{t('demo.learnMore') || 'Meer Informatie'}</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PelicanDemo;
