'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import type { Feature } from '@/components/FeatureCard/FeatureCard';
import { BtwProvider, BtwToggle, useBtw } from '@/components/btw/btw';
import { useTranslations } from 'next-intl';

interface Package {
  name: string;
  price: string;
  description: string;
  features: PackageFeature[];
  sub?: boolean;
  subtext?: string;
  href: string;
}

interface PackageFeature {
  text: string;
  included: boolean;
}

const packages: Package[] = [
  {
    name: "Leaf",
    price: "€15.00",
    description: "packages.leaf.description",
    features: [
        { text: "packages.leaf.features.16gbddr4", included: true },
        { text: "packages.leaf.features.2cores", included: true },
        { text: "packages.leaf.features.fullssd", included: true },
        { text: "packages.leaf.features.pelican", included: true },
        { text: "packages.leaf.features.support", included: true },
        { text: "packages.leaf.features.2databases", included: true },
        { text: "packages.leaf.features.2backup", included: true },
    ],
    href: "#",
  },
  {
    name: "Stone",
    price: "€27.50",
    description: "packages.stone.description",
    features: [
        { text: "packages.stone.features.20gbddr4", included: true },
        { text: "packages.stone.features.4cores", included: true },
        { text: "packages.stone.features.fullssd", included: true },
        { text: "packages.stone.features.pelican", included: true },
        { text: "packages.stone.features.support", included: true },
        { text: "packages.stone.features.2databases", included: true },
        { text: "packages.stone.features.2backup", included: true },
    ],
    sub: true,
    subtext: "Recommended",
    href: "#",
  },
  {
    name: "Iron",
    price: "€32.50",
    description: "packages.iron.description",
    features: [
        { text: "packages.iron.features.24gbddr4", included: true },
        { text: "packages.iron.features.4cores", included: true },
        { text: "packages.iron.features.fullssd", included: true },
        { text: "packages.iron.features.pelican", included: true },
        { text: "packages.iron.features.support", included: true },
        { text: "packages.iron.features.2databases", included: true },
        { text: "packages.iron.features.2backup", included: true },
    ],
    href: "#",
  },
  {
    name: "Titanium",
    price: "€45.00",
    description: "packages.titanium.description",
    features: [
        { text: "packages.titanium.features.32gbddr4", included: true },
        { text: "packages.titanium.features.6cores", included: true },
        { text: "packages.titanium.features.fullssd", included: true },
        { text: "packages.titanium.features.pelican", included: true },
        { text: "packages.titanium.features.support", included: true },
        { text: "packages.titanium.features.2databases", included: true },
        { text: "packages.titanium.features.2backup", included: true },
    ],
    sub: true,
    subtext: "Most Chosen",
    href: "#",
  },
  {
    name: "Ancient",
    price: "€65.00",
    description: "packages.ancient.description",
    features: [
        { text: "packages.ancient.features.40gbddr4", included: true },
        { text: "packages.ancient.features.6cores", included: true },
        { text: "packages.ancient.features.fullssd", included: true },
        { text: "packages.ancient.features.pelican", included: true },
        { text: "packages.ancient.features.support", included: true },
        { text: "packages.ancient.features.2databases", included: true },
        { text: "packages.ancient.features.2backup", included: true },
    ],
    href: "#",
  },
  {
    name: "Relic",
    price: "€80.00",
    description: "packages.relic.description",
    features: [
        { text: "packages.relic.features.64gbddr4", included: true },
        { text: "packages.relic.features.8cores", included: true },
        { text: "packages.relic.features.fullssd", included: true },
        { text: "packages.relic.features.pelican", included: true },
        { text: "packages.relic.features.support", included: true },
        { text: "packages.relic.features.2databases", included: true },
        { text: "packages.relic.features.2backup", included: true },
    ],
    href: "#",
  },
  {
    name: "Enterprise",
    price: "???",
    description: "packages.enterprise.description",
    features: [
        { text: "packages.enterprise.features.ram", included: true },
        { text: "packages.enterprise.features.cores", included: true },
        { text: "packages.enterprise.features.ssd", included: true },
        { text: "packages.enterprise.features.pelican", included: true },
        { text: "packages.enterprise.features.support", included: true },
        { text: "packages.enterprise.features.databases", included: true },
        { text: "packages.enterprise.features.backups", included: true },
    ],
    href: "#contact",
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

const PackageSection = () => {
  const t = useTranslations('palworld');

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
          
          <div className="flex justify-end mb-8">
            <BtwToggle />
          </div>

          <PackageCards packages={packages} />
        </motion.div>
      </section>
    </BtwProvider>
  );
}

function PackageCards({ packages }: { packages: Package[] }) {
  const t = useTranslations('palworld');
  const { calculatePrice } = useBtw();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.slice(0, 6).map((pkg) => {
          const features: Feature[] = pkg.features.map(feature => ({
            text: t(feature.text),
            status: feature.included ? 'included' : 'excluded'
          }));

          const packageName = pkg.name.toLowerCase();
          const title = t(`packages.${packageName}.name`);
          const description = t(pkg.description);
          const buttonText = t('packages.selectButton', { name: title });

          return (
            <FeatureCard
              key={pkg.name}
              imagePath={"/images/webp/games/logos/palworld.webp"}
              imageAlt={"Official Palworld Logo from the game"}
              title={title}
              price={calculatePrice(pkg.price)}
              description={description}
              features={features}
              style="gradient"
              buttonText={buttonText}
              sub={pkg.sub}
              subtext={pkg.subtext}
              href="#contact"
            />
          );
        })}
      </div>
      
      {/* Enterprise package centered */}
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-md">
          {(() => {
            const pkg = packages[6];
            const packageName = pkg.name.toLowerCase();
            const title = t(`packages.${packageName}.name`);
            const description = t(pkg.description);
            const buttonText = t('packages.selectButton', { name: title });
            const features: Feature[] = pkg.features.map(feature => ({
              text: t(feature.text),
              status: feature.included ? 'included' : 'excluded'
            }));

            return (
              <FeatureCard
                key={pkg.name}  
                imagePath={"/images/webp/games/logos/palworld.webp"}
                imageAlt={"Official Palworld Logo from the game"}
                title={title}
                price={calculatePrice(pkg.price)}
                description={description}
                features={features}
                style="gradient"
                buttonText={buttonText}
                href="#contact"
              />
            );
          })()}
        </div>
      </div>
    </>
  );
} 

export default PackageSection; 