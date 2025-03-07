'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button/Button';

interface PackageFeature {
  text: string;
  included: boolean;
}

interface Package {
  name: string;
  price: string;
  description: string;
  features: PackageFeature[];
  recommended?: boolean;
}

const packages: Package[] = [
  {
    name: "Starter",
    price: "€1.50,-",
    description: "Perfect voor kleine communities die net beginnen",
    features: [
      { text: "Tot 100 leden", included: true },
      { text: "Basis hosting", included: true },
      { text: "Email support", included: true },
      { text: "Custom bot", included: false },
      { text: "Premium features", included: false },
    ],
  },
  {
    name: "Professional",
    price: "€2.42,-",
    description: "Ideaal voor groeiende communities",
    features: [
      { text: "Tot 500 leden", included: true },
      { text: "Premium hosting", included: true },
      { text: "24/7 support", included: true },
      { text: "Custom bot", included: true },
      { text: "Premium features", included: true },
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "€3.93,-",
    description: "Voor grote communities met speciale behoeften",
    features: [
      { text: "Onbeperkt leden", included: true },
      { text: "Enterprise hosting", included: true },
      { text: "Prioriteit support", included: true },
      { text: "Custom bot", included: true },
      { text: "Premium features", included: true },
      { text: "Dedicated support", included: true },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function PackagesSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[var(--color-primary)]">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={cardVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
            Kies Je Perfecte Pakket
          </h2>
          <p className="text-lg text-[var(--color-text-subtle)] max-w-2xl mx-auto">
            Selecteer het pakket dat het beste bij jouw behoeften past. Elk pakket is ontworpen om je Discord community optimaal te ondersteunen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              className={`relative rounded-xl p-8 bg-white border-2 shadow-lg transition-all ${
                pkg.recommended ? 'border-[var(--color-quinary)]' : 'border-[var(--color-border)]'
              }`}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--color-quinary)] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Aanbevolen
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-[var(--color-text-dark)]">{pkg.name}</h3>
              <div className="text-3xl font-bold mb-4 text-[var(--color-quinary)]">{pkg.price}</div>
              <p className="text-[var(--color-text-dark)] mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className={`text-lg ${feature.included ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                      {feature.included ? '✓' : '✗'}
                    </span>
                    <span className={`${feature.included ? 'text-[var(--color-text-dark)]' : 'text-[var(--color-text-dark)]'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant="blue"
                fullWidth
                href="#contact"
              >
                Selecteer {pkg.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 