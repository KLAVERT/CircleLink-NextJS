'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUsers, FaRocket, FaHeart, FaLightbulb, FaHandshake } from 'react-icons/fa';
import Button from '@/components/Button/Button';

const OurStorySection = () => {
  const t = useTranslations('aboutUs');

  const timelineItems = [
    {
      year: '2022',
      title: t('story.timeline.2022.title'),
      description: t('story.timeline.2022.description'),
      icon: <FaUsers />,
      color: 'var(--color-quinary)'
    },
    {
      year: '2023',
      title: t('story.timeline.2023.title'),
      description: t('story.timeline.2023.description'),
      icon: <FaRocket />,
      color: 'var(--color-senary)'
    },
    {
      year: '2024',
      title: t('story.timeline.2024.title'),
      description: t('story.timeline.2024.description'),
      icon: <FaHeart />,
      color: 'var(--color-accent-cool)'
    },
    {
      year: '2025',
      title: t('story.timeline.2025.title'),
      description: t('story.timeline.2025.description'),
      icon: <FaLightbulb />,
      color: 'var(--color-quaternary)'
    }
  ];

  return (
    <section id="story" className="relative w-full bg-[var(--color-secondary)] py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-quaternary)]/10 text-[var(--color-quinary)] text-sm font-semibold mb-4">
            {t('story.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text-primary)]">
            {t('story.title')} <span className="text-[var(--color-quinary)]">{t('story.subtitle')}</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-subtle)] max-w-3xl mx-auto">
            {t('story.description')}
          </p>
        </motion.div>

        {/* Locations Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl p-6 md:p-8 border-2 border-[var(--color-quaternary)]/20">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-3">
                <FaMapMarkerAlt className="text-[var(--color-quinary)]" />
                {t('story.locations.title')}
              </h3>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-sm md:text-base">
                {t('story.locations.description')}
              </p>
            </div>
            
            {/* Location Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                className="bg-[var(--color-primary)] rounded-xl p-4 md:p-6 border-2 border-[var(--color-quaternary)]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[var(--color-quaternary)] rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-sm md:text-base" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)]">Harderwijk</h4>
                </div>
                <p className="text-[var(--color-text-secondary)] mb-3 text-sm md:text-base">
                  {t('story.locations.harderwijk.description')}
                </p>
                <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--color-quinary)]">
                  <FaRocket />
                  <span>{t('story.locations.harderwijk.features')}</span>
                </div>
              </motion.div>

              <motion.div
                className="bg-[var(--color-primary)] rounded-xl p-4 md:p-6 border-2 border-[var(--color-quinary)]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[var(--color-quinary)] rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-sm md:text-base" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)]">Woerden</h4>
                </div>
                <p className="text-[var(--color-text-secondary)] mb-3 text-sm md:text-base">
                  {t('story.locations.woerden.description')}
                </p>
                <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--color-quinary)]">
                  <FaRocket />
                  <span>{t('story.locations.woerden.features')}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-3 md:mb-4">
              {t('story.timeline.title')}
            </h3>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-sm md:text-base">
              {t('story.timeline.description')}
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--color-quinary)] to-[var(--color-quaternary)] rounded-full" />

            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.year}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-[var(--color-primary)] bg-white z-10" />
                  
                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <motion.div
                      className="bg-[var(--color-primary)] rounded-xl p-6 border-2 border-[var(--color-quaternary)]/20 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-[var(--color-quinary)]">{item.year}</span>
                          <h4 className="text-xl font-bold text-[var(--color-text-primary)]">{item.title}</h4>
                        </div>
                      </div>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Timeline Line rechts */}
              <div className="absolute right-4 md:right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-quinary)] to-[var(--color-quaternary)] rounded-full" />

              <div className="space-y-6">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="relative flex items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Content Card */}
                    <div className="flex-1 pr-8 md:pr-12">
                      <motion.div
                        className="bg-[var(--color-primary)] rounded-xl p-4 md:p-6 border-2 border-[var(--color-quaternary)]/20 shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                          <div 
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: item.color }}
                          >
                            <div className="text-sm md:text-base">
                              {item.icon}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs md:text-sm font-semibold text-[var(--color-quinary)]">{item.year}</span>
                            <h4 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)]">{item.title}</h4>
                          </div>
                        </div>
                        <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>
                    {/* Timeline Dot rechts */}
                    <div className="absolute right-2 md:right-4 w-4 h-4 rounded-full border-2 border-[var(--color-primary)] bg-white z-10 mt-2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-6 md:mb-8">
            {t('story.values.title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--color-quaternary)] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FaHandshake className="text-white text-lg md:text-2xl" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)] mb-2">
                {t('story.values.trust.title')}
              </h4>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)]">
                {t('story.values.trust.description')}
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--color-quinary)] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FaLightbulb className="text-white text-lg md:text-2xl" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)] mb-2">
                {t('story.values.innovation.title')}
              </h4>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)]">
                {t('story.values.innovation.description')}
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--color-senary)] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FaHeart className="text-white text-lg md:text-2xl" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)] mb-2">
                {t('story.values.passion.title')}
              </h4>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)]">
                {t('story.values.passion.description')}
              </p>
            </motion.div>
          </div>

          <div className="mt-8 md:mt-12">
            <Button variant="primary" href="#team">
              <span className="flex items-center gap-2">
                <FaUsers />
                {t('story.cta')}
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection; 