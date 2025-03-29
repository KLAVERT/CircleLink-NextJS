'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import type { Feature } from '@/components/FeatureCard/FeatureCard';
import { BtwProvider, BtwToggle, useBtw } from '@/components/btw/btw';
import { useTranslations } from 'next-intl';
import Grid, { GridItem } from '@/components/Grid';

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
    name: "Tatch",
    price: "€10.00",
    description: "packages.tatch.description",
    features: [
        { text: "packages.tatch.features.8gbddr4", included: true },
        { text: "packages.tatch.features.3cores", included: true },
        { text: "packages.tatch.features.fullssd", included: true },
        { text: "packages.tatch.features.pelican", included: true },
        { text: "packages.tatch.features.support", included: true },
        { text: "packages.tatch.features.2databases", included: true },
        { text: "packages.tatch.features.2backup", included: true },
    ],
    href: "#",
  },
  {
    name: "Wood",
    price: "€17.50",
    description: "packages.wood.description",
    features: [
        { text: "packages.wood.features.10gbddr4", included: true },
        { text: "packages.wood.features.4cores", included: true },
        { text: "packages.wood.features.fullssd", included: true },
        { text: "packages.wood.features.pelican", included: true },
        { text: "packages.wood.features.support", included: true },
        { text: "packages.wood.features.2databases", included: true },
        { text: "packages.wood.features.2backup", included: true },
    ],
    sub: true,
    subtext: "Recommended",
    href: "#",
  },
  {
    name: "Clay",
    price: "€22.50",
    description: "packages.clay.description",
    features: [
        { text: "packages.clay.features.12gbddr4", included: true },
        { text: "packages.clay.features.4cores", included: true },
        { text: "packages.clay.features.fullssd", included: true },
        { text: "packages.clay.features.pelican", included: true },
        { text: "packages.clay.features.support", included: true },
        { text: "packages.clay.features.2databases", included: true },
        { text: "packages.clay.features.2backup", included: true },
    ],
    href: "#",
  },
  {
    name: "Stone",
    price: "€30.00",
    description: "packages.stone.description",
    features: [
        { text: "packages.stone.features.16gbddr4", included: true },
        { text: "packages.stone.features.6cores", included: true },
        { text: "packages.stone.features.fullssd", included: true },
        { text: "packages.stone.features.pelican", included: true },
        { text: "packages.stone.features.support", included: true },
        { text: "packages.stone.features.2databases", included: true },
        { text: "packages.stone.features.2backup", included: true },
    ],
    sub: true,
    subtext: "Most Chosen",
    href: "#",
  },
  {
    name: "Metal",
    price: "€37.50",
    description: "packages.metal.description",
    features: [
        { text: "packages.metal.features.20gbddr4", included: true },
        { text: "packages.metal.features.6cores", included: true },
        { text: "packages.metal.features.fullssd", included: true },
        { text: "packages.metal.features.pelican", included: true },
        { text: "packages.metal.features.support", included: true },
        { text: "packages.metal.features.2databases", included: true },
        { text: "packages.metal.features.2backup", included: true },
    ],
    href: "#",
  },
  {
    name: "TEK",
    price: "€45.00",
    description: "packages.tek.description",
    features: [
        { text: "packages.tek.features.24gbddr4", included: true },
        { text: "packages.tek.features.8cores", included: true },
        { text: "packages.tek.features.fullssd", included: true },
        { text: "packages.tek.features.pelican", included: true },
        { text: "packages.tek.features.support", included: true },
        { text: "packages.tek.features.2databases", included: true },
        { text: "packages.tek.features.2backup", included: true },
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
  const t = useTranslations('ark');

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
  const t = useTranslations('ark');
  const { calculatePrice } = useBtw();

  return (
    <Grid columns={1} mdColumns={2} lgColumns={3} spacing="lg">
      {packages.map((pkg) => {
        const features: Feature[] = pkg.features.map(feature => ({
          text: t(feature.text),
          status: feature.included ? 'included' : 'excluded'
        }));

        const packageName = pkg.name.toLowerCase();
        const title = t(`packages.${packageName}.name`);
        const description = t(pkg.description);
        const buttonText = t('packages.selectButton', { name: title });
        
        const isEnterprise = pkg.name === "Enterprise";
        
        return (
          <GridItem key={pkg.name} className={isEnterprise ? "lg:col-start-2" : ""}>
            {isEnterprise ? (
              <div className="rounded-2xl overflow-hidden">
                <FeatureCard
                  imagePath={"/images/webp/games/logos/ark.webp"}
                  imageAlt={"Official Ark Logo from the game"}
                  title={title}
                  price={calculatePrice(pkg.price)}
                  description={description}
                  features={features}
                  style="gradient"
                  buttonText={buttonText}
                  href="#contact"
                />
              </div>
            ) : (
              <FeatureCard
                imagePath={"/images/webp/games/logos/ark.webp"}
                imageAlt={"Official Ark Logo from the game"}
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
            )}
          </GridItem>
        );
      })}
    </Grid>
  );
} 

export default PackageSection; 