'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import Button from '@/components/Button/Button';

// Feature item interface
export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  category?: string;
}

// Category interface
export interface FeatureCategory {
  title: string;
  description: string;
  features: FeatureItem[];
}

// Feature item component
interface FeatureItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index?: number;
  category?: string;
}

const FeatureItemComponent = ({ title, description, icon, index = 0, category }: FeatureItemProps) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <motion.div
      ref={itemRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group p-6 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-quinary)] hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-quaternary)] to-[var(--color-quinary)] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {category && (
            <span className="inline-block px-2 py-1 text-xs font-medium text-[var(--color-quinary)] bg-[var(--color-quinary)]/10 rounded-full mb-2">
              {category}
            </span>
          )}
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-quinary)] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[var(--color-text-subtle)] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Category section component
interface CategorySectionProps {
  title: string;
  description: string;
  features: FeatureItem[];
  index: number;
}

const CategorySection = ({ title, description, features, index }: CategorySectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-24"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          {title}
        </h2>
        <p className="text-lg text-[var(--color-text-subtle)] max-w-3xl mx-auto">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, featureIndex) => (
          <FeatureItemComponent
            key={feature.title}
            {...feature}
            index={featureIndex}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Main FeatureSection component interface
interface FeatureSectionProps {
  title?: string;
  description?: string;
  categories: FeatureCategory[];
  showCTA?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtons?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
  }[];
  translationNamespace?: string;
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  categories,
  showCTA = false,
  ctaTitle,
  ctaDescription,
  ctaButtons = [],
  translationNamespace,
  className = ""
}) => {
  const t = useTranslations(translationNamespace || 'features');

  return (
    <section id="features" className={`py-16 relative overflow-hidden ${className}`} style={{ backgroundColor: 'var(--color-secondary)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Server Icons */}
        <motion.div
          className="absolute top-20 left-10 text-[var(--color-quinary)] opacity-30"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 1h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z"/>
          </svg>
        </motion.div>

        {/* Network Node */}
        <motion.div
          className="absolute top-40 right-20 text-[var(--color-quaternary)] opacity-35"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </motion.div>

        {/* Database Icon */}
        <motion.div
          className="absolute bottom-32 left-1/4 text-[var(--color-quinary)] opacity-40"
          animate={{
            y: [0, -35, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </motion.div>

        {/* Shield/Security Icon */}
        <motion.div
          className="absolute top-1/2 right-1/3 text-[var(--color-quaternary)] opacity-30"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
        </motion.div>

        {/* Cloud Icon */}
        <motion.div
          className="absolute bottom-20 right-10 text-[var(--color-quinary)] opacity-25"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
          </svg>
        </motion.div>

        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-3 h-3 bg-[var(--color-quinary)] rounded-full opacity-40"
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[var(--color-quaternary)] rounded-full opacity-50"
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.2
          }}
        />

        <motion.div
          className="absolute top-3/4 left-1/5 w-4 h-4 bg-[var(--color-quinary)] rounded-full opacity-30"
          animate={{
            y: [0, -25, 0],
            x: [0, 25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        />

        {/* Network Connection Lines - More Visible */}
        <div className="absolute inset-0 opacity-15">
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-quinary)] to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-quaternary)] to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-36 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-quinary)] to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-28 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-quaternary)] to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        {/* Pulsing Rings */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-[var(--color-quinary)] rounded-full opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/5 w-20 h-20 border-2 border-[var(--color-quaternary)] rounded-full opacity-15"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.15, 0, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 2
          }}
        />
        
        {/* Gradient Orbs - More Visible */}
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[var(--color-quinary)] to-transparent rounded-full opacity-12 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[var(--color-quaternary)] to-transparent rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Circuit Board Pattern - More Visible */}
        <div className="absolute inset-0 opacity-8">
          <motion.div
            className="absolute top-1/6 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-quinary)] to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-quaternary)] to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          <motion.div
            className="absolute top-5/6 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-quinary)] to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>

        {/* Vertical Scanning Lines */}
        <motion.div
          className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-[var(--color-quinary)] to-transparent opacity-20"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <motion.div
          className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-[var(--color-quaternary)] to-transparent opacity-15"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p 
              className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] mb-2">
                  {category.title}
                </h3>
                {category.description && (
                  <p className="text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature.title}
                    className="bg-[var(--color-secondary)] rounded-lg p-6 border border-[var(--color-quaternary)] hover:border-[var(--color-quinary)] transition-all duration-300 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: (categoryIndex * 0.1) + (featureIndex * 0.05) 
                    }}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-quinary)] rounded-lg flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        {showCTA && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-[var(--color-quaternary)] to-[var(--color-quinary)] rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {ctaTitle || t('cta.title') || 'Klaar om te beginnen?'}
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                {ctaDescription || t('cta.description') || 'Start vandaag nog en ervaar de kracht van onze oplossingen.'}
              </p>
              {ctaButtons.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {ctaButtons.map((button, index) => (
                    <Button
                      key={index}
                      variant={button.variant === 'secondary' ? 'outline' : 'primary'}
                      onClick={button.onClick}
                      href={button.href}
                    >
                      <span className="flex items-center gap-2">
                        {index === 0 ? <FaInfoCircle /> : <FaArrowRight />}
                        {button.label}
                      </span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeatureSection; 