'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaRocket, FaShieldAlt, FaChartLine, FaUsers, FaArrowRight, FaEye } from 'react-icons/fa';
import Button from '@/components/Button/Button';

const CountUp: React.FC<{ end: number; duration?: number; decimals?: number; suffix?: string }> = ({ end, duration = 2, decimals = 0, suffix = '' }) => {
  const [value, setValue] = useState(0);
  const startTimestamp = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    function animateCount(timestamp: number) {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = Math.min((timestamp - startTimestamp.current) / (duration * 1000), 1);
      const current = end * progress;
      setValue(progress < 1 ? current : end);
      if (progress < 1) {
        raf.current = requestAnimationFrame(animateCount);
      }
    }
    raf.current = requestAnimationFrame(animateCount);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [end, duration]);

  return (
    <span>
      {value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
};

const PelicanTransitionSection: React.FC = () => {
  const t = useTranslations('pelican');

  const stats = [
    {
      icon: <FaRocket className="text-3xl" />,
      number: 3,
      unit: "min",
      decimals: 0,
      suffix: '',
      label: t('transition.stats.setup') || "Setup Tijd",
      description: t('transition.stats.setupDesc') || "Server online binnen 3 minuten"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      number: 99.9,
      unit: "%",
      decimals: 1,
      suffix: '',
      label: t('transition.stats.uptime') || "Uptime",
      description: t('transition.stats.uptimeDesc') || "Gegarandeerde beschikbaarheid"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      number: 24,
      unit: "/7",
      decimals: 0,
      suffix: '',
      label: t('transition.stats.support') || "Support",
      description: t('transition.stats.supportDesc') || "Altijd beschikbare hulp"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      number: 10,
      unit: "K+",
      decimals: 0,
      suffix: '',
      label: t('transition.stats.users') || "Tevreden Klanten",
      description: t('transition.stats.usersDesc') || "Wereldwijd vertrouwd"
    }
  ];

  const scrollToId = (id: string) => () => {
    const e = window.event as MouseEvent;
    if (e) e.preventDefault();
    
    const el = document.getElementById(id);
    if (el) {
      try {
        el.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      } catch (error) {
        const targetPosition = el.offsetTop - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="py-16 bg-[var(--color-primary)] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Tech Elements */}
        <motion.div
          className="absolute top-20 left-10 text-[var(--color-quinary)] opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 text-[var(--color-secondary)] opacity-15"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
        </motion.div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--color-quinary)] to-transparent rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[var(--color-secondary)] to-transparent rounded-full opacity-8 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            {t('transition.title') || 'Waarom Kiezen voor Pelican Panel bij CircleLink?'}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            {t('transition.description') || 'Ontdek waarom duizenden serverbeheerders vertrouwen op Pelican Panel voor hun game hosting behoeften.'}
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon Container */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-quinary)] rounded-full mb-4 text-white group-hover:scale-110 transition-transform duration-300"
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {stat.icon}
              </motion.div>

              {/* Number */}
              <div className="mb-2 flex items-end justify-center gap-1">
                <span className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                  <CountUp end={stat.number} duration={2} decimals={stat.decimals} />
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[var(--color-quinary)]">
                  {stat.unit}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-quinary)] rounded-2xl p-8 md:p-12 w-full">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              {t('transition.cta.title') || 'Klaar om te Starten?'}
            </h3>
            <p className="text-lg text-[var(--color-text-secondary)] mb-6">
              {t('transition.cta.description') || 'Join duizenden tevreden klanten en ervaar de kracht van Pelican Panel vandaag nog!'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={e => {
                  e.preventDefault();
                  const el = document.getElementById('features');
                  if (el) {
                    try {
                      el.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      });
                    } catch (error) {
                      const targetPosition = el.offsetTop - 100;
                      window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
              >
                <span className="flex items-center gap-2"><FaArrowRight />{t('transition.cta.getStarted') || 'Nu Beginnen'}</span>
              </Button>
              <Button
                variant="outline"
                onClick={e => {
                  e.preventDefault();
                  const el = document.getElementById('demo');
                  if (el) {
                    try {
                      el.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      });
                    } catch (error) {
                      const targetPosition = el.offsetTop - 100;
                      window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
              >
                <span className="flex items-center gap-2"><FaEye />{t('transition.cta.learnMore') || 'Meer Informatie'}</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PelicanTransitionSection; 