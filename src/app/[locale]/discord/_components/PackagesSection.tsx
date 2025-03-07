'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import type { Feature } from '@/components/FeatureCard/FeatureCard';

interface Package {
  name: string;
  price: string;
  description: string;
  features: PackageFeature[];
  recommended?: boolean;
  mostChosen?: boolean;
}

interface PackageFeature {
  text: string;
  included: boolean;
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
    mostChosen: true,
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
          {packages.map((pkg) => {
            const features: Feature[] = pkg.features.map(feature => ({
              text: feature.text,
              status: feature.included ? 'included' : 'excluded'
            }));

            return (
              <FeatureCard
                key={pkg.name}
                title={pkg.name}
                price={pkg.price}
                description={pkg.description}
                features={features}
                style="gradient"
                buttonText={`Selecteer ${pkg.name}`}
                recommended={pkg.recommended}
                recommendedText="Aanbevolen"
                href="#contact"
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
} 