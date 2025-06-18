'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import type { Feature, FeatureStatus } from '@/components/FeatureCard/FeatureCard';
import { BtwProvider, BtwToggle, useBtw } from '@/components/btw/btw';
import { useTranslations } from 'next-intl';

export interface Package {
  name: string;
  price: string;
  ddr3Price?: string;
  description: string | { key: string };
  features: PackageFeature[];
  sub?: boolean;
  subtext?: string | { key: string };
  href: string;
  ddr3Href?: string;
}

export interface PackageFeature {
  text: string | { key: string };
  included: boolean;
}

export interface GamePackageSectionProps {
  title: string | { key: string };
  subtitle: string | { key: string };
  packages: Package[];
  gameLogo: string;
  gameLogoAlt: string;
  enableBTWToggle?: boolean;
  enableDDRToggle?: boolean;
  translationNamespace?: string;
}

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

function resolveText(
  t: (k: string, values?: Record<string, any>) => string,
  value: string | { key: string },
  values?: Record<string, any>
) {
  if (typeof value === 'string') return value;
  return t(value.key, values);
}

const GamePackageSection: React.FC<GamePackageSectionProps> = ({
  title,
  subtitle,
  packages,
  gameLogo,
  gameLogoAlt,
  enableBTWToggle = false,
  enableDDRToggle = false,
  translationNamespace
}) => {
  const t = useTranslations(translationNamespace || undefined);

  const SectionContent = () => (
    <section className="py-12 px-4 md:px-8 bg-[#2a3b5f]">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={cardVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {resolveText(t, title)}
          </h2>
          <p className="text-lg text-[#ddd] max-w-2xl mx-auto">
            {resolveText(t, subtitle)}
          </p>
        </motion.div>
        
        {/* DDR Toggle centered */}
        {enableDDRToggle && (
          <div className="flex justify-center mb-8">
            <DDRToggle />
          </div>
        )}
        
        {/* BTW Toggle positioned above the packages, aligned right */}
        {enableBTWToggle && (
          <div className="flex justify-end mb-4">
            <BtwToggle />
          </div>
        )}

        <PackageCards 
          packages={packages} 
          gameLogo={gameLogo} 
          gameLogoAlt={gameLogoAlt}
          translationNamespace={translationNamespace}
        />
      </motion.div>
    </section>
  );

  // Wrap with providers if needed
  if (enableBTWToggle && enableDDRToggle) {
    return (
      <BtwProvider>
        <DDRProvider>
          <SectionContent />
        </DDRProvider>
      </BtwProvider>
    );
  } else if (enableBTWToggle) {
    return (
      <BtwProvider>
        <SectionContent />
      </BtwProvider>
    );
  } else if (enableDDRToggle) {
    return (
      <DDRProvider>
        <SectionContent />
      </DDRProvider>
    );
  }

  return <SectionContent />;
}

function PackageCards({ 
  packages, 
  gameLogo, 
  gameLogoAlt,
  translationNamespace 
}: { 
  packages: Package[]; 
  gameLogo: string; 
  gameLogoAlt: string;
  translationNamespace?: string;
}) {
  const t = useTranslations(translationNamespace || undefined);
  const { calculatePrice } = useBtw();
  const { isDDR4 } = useDDR();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.slice(0, 6).map((pkg) => {
          const features: Feature[] = pkg.features.map(feature => ({
            text: resolveText(t, feature.text),
            status: feature.included ? 'included' as FeatureStatus : 'excluded' as FeatureStatus
          }));

          const packageName = pkg.name.toLowerCase();
          const title = resolveText(t, { key: `packages.${packageName}.name` });
          const description = resolveText(t, pkg.description);
          const buttonText = resolveText(t, { key: 'packages.selectButton' }, { name: title });
          
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
              imagePath={gameLogo}
              imageAlt={gameLogoAlt}
              title={title}
              price={calculatePrice(price)}
              description={description}
              features={updatedFeatures}
              style="gradient"
              buttonText={buttonText}
              sub={pkg.sub}
              subtext={pkg.subtext ? resolveText(t, pkg.subtext) : undefined}
              href={href}
            />
          );
        })}
      </div>
      
      {/* Enterprise package centered */}
      {packages.length > 6 && (
        <div className="mt-8 flex justify-center">
          <div className="w-full md:max-w-md">
            {(() => {
              const pkg = packages[6];
              const packageName = pkg.name.toLowerCase();
              const title = resolveText(t, { key: `packages.${packageName}.name` });
              const description = resolveText(t, pkg.description);
              const buttonText = resolveText(t, { key: 'packages.selectButton' }, { name: title });
              
              // Use DDR4 or DDR3 price and href based on toggle state
              const price = isDDR4 ? pkg.price : (pkg.ddr3Price || pkg.price);
              const href = isDDR4 ? pkg.href : (pkg.ddr3Href || pkg.href);
              
              const features: Feature[] = pkg.features.map(feature => {
                const featureObj = {
                  text: resolveText(t, feature.text),
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
                  imagePath={gameLogo}
                  imageAlt={gameLogoAlt}
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
      )}
    </>
  );
} 

export default GamePackageSection; 