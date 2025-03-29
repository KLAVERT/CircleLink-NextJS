'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import type { Feature } from '@/components/FeatureCard/FeatureCard';
import { useTranslations } from 'next-intl';
import { FaDiscord } from 'react-icons/fa';
import { BtwProvider, BtwToggle, useBtw } from '@/components/btw/btw';
import Grid, { GridItem } from '@/components/Grid';

interface Package {
  name: string;
  price: string;
  description: string;
  features: PackageFeature[];
  sub?: boolean;
  subtext?: string;
  mostChosen?: boolean;
}

interface PackageFeature {
  text: string;
  included: boolean;
}

const packages: Package[] = [
  {
    name: "Starter",
    price: "€1.25",
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
    name: "Developer",
    price: "€2.00",
    description: "packages.developer.description",
    features: [
      { text: "packages.developer.features.members", included: true },
      { text: "packages.developer.features.hosting", included: true },
      { text: "packages.developer.features.support", included: true },
      { text: "packages.developer.features.bot", included: true },
      { text: "packages.developer.features.premium", included: true },
    ],
    sub: true,
    subtext: "Most Chosen",
  },
  {
    name: "Professional",
    price: "€3.25",
    description: "packages.professional.description",
    features: [
      { text: "packages.professional.features.members", included: true },
      { text: "packages.professional.features.hosting", included: true },
      { text: "packages.professional.features.support", included: true },
      { text: "packages.professional.features.bot", included: true },
      { text: "packages.professional.features.premium", included: true },
      { text: "packages.professional.features.dedicated", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "???",
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
    <BtwProvider>
      <section className="py-12 px-4 md:px-8 bg-[var(--color-tertiary)]">
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
          
          <BtwToggle />

          <PackageCards packages={packages} />
        </motion.div>
      </section>
    </BtwProvider>
  );
}

function PackageCards({ packages }: { packages: Package[] }) {
  const t = useTranslations('discord');
  const { calculatePrice } = useBtw();

  return (
    <>
      <Grid columns={1} mdColumns={2} lgColumns={3} spacing="lg">
        {packages.slice(0, -1).map((pkg) => {
          const features: Feature[] = pkg.features.map(feature => ({
            text: t(feature.text),
            status: feature.included ? 'included' : 'excluded'
          }));

          return (
            <GridItem key={pkg.name}>
              <FeatureCard
                icon={<FaDiscord />}
                title={t(`packages.${pkg.name.toLowerCase()}.name`)}
                price={calculatePrice(pkg.price)}
                description={t(pkg.description)}
                features={features}
                style="gradient"
                buttonText={t('packages.selectButton', { name: t(`packages.${pkg.name.toLowerCase()}.name`) })}
                sub={pkg.sub}
                subtext={pkg.subtext}
                href="#contact"
              />
            </GridItem>
          );
        })}
      </Grid>
      
      {/* Enterprise package centered */}
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-[33.33%]">
          <FeatureCard
            key={packages[3].name}
            icon={<FaDiscord />}
            title={t(`packages.${packages[3].name.toLowerCase()}.name`)}
            price={calculatePrice(packages[3].price)}
            description={t(packages[3].description)}
            features={packages[3].features.map(feature => ({
              text: t(feature.text),
              status: feature.included ? 'included' : 'excluded'
            }))}
            style="gradient"
            buttonText={t('packages.selectButton', { name: t(`packages.${packages[3].name.toLowerCase()}.name`) })}
            href="#contact"
          />
        </div>
      </div>
    </>
  );
} 