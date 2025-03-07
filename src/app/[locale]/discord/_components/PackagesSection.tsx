'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import type { Feature } from '@/components/FeatureCard/FeatureCard';
import { useTranslations } from 'next-intl';

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
    description: "packages.starter.description",
    features: [
      { text: "packages.starter.features.members", included: true },
      { text: "packages.starter.features.hosting", included: true },
      { text: "packages.starter.features.support", included: true },
      { text: "packages.starter.features.bot", included: false },
      { text: "packages.starter.features.premium", included: false },
    ],
  },
  {
    name: "Professional",
    price: "€2.42,-",
    description: "packages.professional.description",
    features: [
      { text: "packages.professional.features.members", included: true },
      { text: "packages.professional.features.hosting", included: true },
      { text: "packages.professional.features.support", included: true },
      { text: "packages.professional.features.bot", included: true },
      { text: "packages.professional.features.premium", included: true },
    ],
    recommended: true,
    mostChosen: true,
  },
  {
    name: "Enterprise",
    price: "€3.93,-",
    description: "packages.enterprise.description",
    features: [
      { text: "packages.enterprise.features.members", included: true },
      { text: "packages.enterprise.features.hosting", included: true },
      { text: "packages.enterprise.features.support", included: true },
      { text: "packages.enterprise.features.bot", included: true },
      { text: "packages.enterprise.features.premium", included: true },
      { text: "packages.enterprise.features.dedicated", included: true },
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
  const t = useTranslations('discord');

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
            {t('packages.title')}
          </h2>
          <p className="text-lg text-[var(--color-text-subtle)] max-w-2xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const features: Feature[] = pkg.features.map(feature => ({
              text: t(feature.text),
              status: feature.included ? 'included' : 'excluded'
            }));

            return (
              <FeatureCard
                key={pkg.name}
                title={t(`packages.${pkg.name.toLowerCase()}.name`)}
                price={pkg.price}
                description={t(pkg.description)}
                features={features}
                style="gradient"
                buttonText={t('packages.selectButton', { name: t(`packages.${pkg.name.toLowerCase()}.name`) })}
                recommended={pkg.recommended}
                recommendedText={t('packages.recommended')}
                href="#contact"
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
} 