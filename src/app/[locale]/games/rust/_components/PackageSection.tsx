'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import type { Feature, FeatureStatus } from '@/components/FeatureCard/FeatureCard';
import { BtwProvider, BtwToggle, useBtw } from '@/components/btw/btw';
import { useTranslations } from 'next-intl';

interface Package {
  name: string;
  price: string;
  ddr3Price?: string;
  description: string;
  features: PackageFeature[];
  sub?: boolean;
  subtext?: string;
  href: string;
  ddr3Href?: string;
}

interface PackageFeature {
  text: string;
  included: boolean;
}

const packagesDDR4: Package[] = [
  {
    name: "Wood",
    price: "€10.00",
    ddr3Price: "€7.50",
    description: "packages.wood.description",
    features: [
        { text: "packages.wood.features.8gbddr4", included: true },
        { text: "packages.wood.features.3cores", included: true },
        { text: "packages.wood.features.fullssd", included: true },
        { text: "packages.wood.features.pelican", included: true },
        { text: "packages.wood.features.support", included: true },
        { text: "packages.wood.features.2databases", included: true },
        { text: "packages.wood.features.2backup", included: true },
    ],
    href: "#ddr4",
    ddr3Href: "#ddr3",
  },
  {
    name: "Stone",
    price: "€17.50",
    ddr3Price: "€13.50",
    description: "packages.stone.description",
    features: [
        { text: "packages.stone.features.10gbddr4", included: true },
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
    ddr3Href: "#",
  },
  {
    name: "Metal",
    price: "€22.50",
    ddr3Price: "€17.50",
    description: "packages.metal.description",
    features: [
        { text: "packages.metal.features.12gbddr4", included: true },
        { text: "packages.metal.features.4cores", included: true },
        { text: "packages.metal.features.fullssd", included: true },
        { text: "packages.metal.features.pelican", included: true },
        { text: "packages.metal.features.support", included: true },
        { text: "packages.metal.features.2databases", included: true },
        { text: "packages.metal.features.2backup", included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Sulfer",
    price: "€30.00",
    ddr3Price: "€22.50",
    description: "packages.sulfer.description",
    features: [
        { text: "packages.sulfer.features.16gbddr4", included: true },
        { text: "packages.sulfer.features.6cores", included: true },
        { text: "packages.sulfer.features.fullssd", included: true },
        { text: "packages.sulfer.features.pelican", included: true },
        { text: "packages.sulfer.features.support", included: true },
        { text: "packages.sulfer.features.2databases", included: true },
        { text: "packages.sulfer.features.2backup", included: true },
    ],
    sub: true,
    subtext: "Most Chosen",
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "HQM",
    price: "€37.50",
    ddr3Price: "€27.50",
    description: "packages.hqm.description",
    features: [
        { text: "packages.hqm.features.20gbddr4", included: true },
        { text: "packages.hqm.features.6cores", included: true },
        { text: "packages.hqm.features.fullssd", included: true },
        { text: "packages.hqm.features.pelican", included: true },
        { text: "packages.hqm.features.support", included: true },
        { text: "packages.hqm.features.2databases", included: true },
        { text: "packages.hqm.features.2backup", included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Tech",
    price: "€45.00",
    ddr3Price: "€32.50",
    description: "packages.tech.description",
    features: [
        { text: "packages.tech.features.24gbddr4", included: true },
        { text: "packages.tech.features.8cores", included: true },
        { text: "packages.tech.features.fullssd", included: true },
        { text: "packages.tech.features.pelican", included: true },
        { text: "packages.tech.features.support", included: true },
        { text: "packages.tech.features.2databases", included: true },
        { text: "packages.tech.features.2backup", included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Enterprise",
    price: "???",
    ddr3Price: "???",
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
    ddr3Href: "#contact",
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

// Create a DDR toggle context
interface DDRContextType {
  isDDR4: boolean;
  toggleDDR: () => void;
}

const DDRContext = React.createContext<DDRContextType | undefined>(undefined);

function useDDR() {
  const context = React.useContext(DDRContext);
  if (!context) {
    throw new Error('useDDR must be used within a DDRProvider');
  }
  return context;
}

function DDRProvider({ children }: { children: React.ReactNode }) {
  const [isDDR4, setIsDDR4] = useState(true);
  
  const toggleDDR = () => {
    setIsDDR4(prev => !prev);
  };
  
  return (
    <DDRContext.Provider value={{ isDDR4, toggleDDR }}>
      {children}
    </DDRContext.Provider>
  );
}

function DDRToggle() {
  const { isDDR4, toggleDDR } = useDDR();
  
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex bg-black rounded-full p-1 w-72">
        <button
          className={`relative flex-1 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out z-10 ${
            isDDR4 ? 'text-black' : 'text-white'
          }`}
          onClick={() => isDDR4 || toggleDDR()}
        >
          DDR4 Ram
        </button>
        <button
          className={`relative flex-1 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out z-10 ${
            !isDDR4 ? 'text-black' : 'text-white'
          }`}
          onClick={() => !isDDR4 || toggleDDR()}
        >
          DDR3 Ram
        </button>
        <div 
          className={`absolute top-1 left-1 bottom-1 w-[calc(50%-2px)] bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
            isDDR4 ? 'translate-x-0' : 'translate-x-full'
          }`} 
        />
      </div>
    </div>
  );
}

const PackageSection = () => {
  // The t variable is used in JSX below for translations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = useTranslations('rust');

  return (
    <BtwProvider>
      <DDRProvider>
        <section className="py-12 px-4 md:px-8 bg-[#2a3b5f]">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={cardVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {t('packages.title')}
              </h2>
              <p className="text-lg text-[#ddd] max-w-2xl mx-auto">
                {t('packages.subtitle')}
              </p>
            </motion.div>
            
            {/* DDR Toggle centered */}
            <div className="flex justify-center mb-8">
              <DDRToggle />
            </div>
            
            {/* BTW Toggle positioned above the packages, aligned right */}
            <div className="flex justify-end mb-4">
              <BtwToggle />
            </div>

            <PackageCards packages={packagesDDR4} />
          </motion.div>
        </section>
      </DDRProvider>
    </BtwProvider>
  );
}

function PackageCards({ packages }: { packages: Package[] }) {
  const t = useTranslations('rust');
  const { calculatePrice } = useBtw();
  const { isDDR4 } = useDDR();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.slice(0, 6).map((pkg) => {
          const features: Feature[] = pkg.features.map(feature => ({
            text: t(feature.text),
            status: feature.included ? 'included' as FeatureStatus : 'excluded' as FeatureStatus
          }));

          const packageName = pkg.name.toLowerCase();
          const title = t(`packages.${packageName}.name`);
          const description = t(pkg.description);
          const buttonText = t('packages.selectButton', { name: title });
          
          // Use DDR4 or DDR3 price and href based on toggle state
          const price = isDDR4 ? pkg.price : (pkg.ddr3Price || pkg.price);
          const href = isDDR4 ? pkg.href : (pkg.ddr3Href || pkg.href);
          
          // Update feature text to show correct DDR type
          const updatedFeatures = features.map(feature => {
            // Check if feature contains DDR4 and update it to DDR3 if needed
            if (!isDDR4 && feature.text.includes('DDR4')) {
              return {
                ...feature,
                text: feature.text.replace('DDR4', 'DDR3')
              };
            }
            return feature;
          });

          return (
            <FeatureCard
              key={pkg.name}
              imagePath={"/images/webp/games/logos/rust.webp"}
              imageAlt={"Official Rust Logo from the game"}
              title={title}
              price={calculatePrice(price)}
              description={description}
              features={updatedFeatures}
              style="gradient"
              buttonText={buttonText}
              sub={pkg.sub}
              subtext={pkg.subtext}
              href={href}
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
            
            // Use DDR4 or DDR3 price and href based on toggle state
            const price = isDDR4 ? pkg.price : (pkg.ddr3Price || pkg.price);
            const href = isDDR4 ? pkg.href : (pkg.ddr3Href || pkg.href);
            
            const features: Feature[] = pkg.features.map(feature => {
              const featureObj = {
                text: t(feature.text),
                status: feature.included ? 'included' as FeatureStatus : 'excluded' as FeatureStatus
              };
              
              // Check if feature contains DDR4 and update it to DDR3 if needed
              if (!isDDR4 && featureObj.text.includes('DDR4')) {
                return {
                  ...featureObj,
                  text: featureObj.text.replace('DDR4', 'DDR3')
                };
              }
              return featureObj;
            });

            return (
              <FeatureCard
                key={pkg.name}
                imagePath={"/images/webp/games/logos/rust.webp"}
                imageAlt={"Official Rust Logo from the game"}
                title={title}
                price={calculatePrice(price)}
                description={description}
                features={features}
                style="gradient"
                buttonText={buttonText}
                href={href}
              />
            );
          })()}
        </div>
      </div>
    </>
  );
} 

export default PackageSection; 