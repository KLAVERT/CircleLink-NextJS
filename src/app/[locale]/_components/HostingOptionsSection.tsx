'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaGlobe, FaDiscord, FaCheck } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface HostingOption {
  id: string;
  titleKey: string;
  icon: React.ReactNode;
  price: string;
  descriptionKey: string;
  featuresKeys: string[];
}

const HostingOptionsSection = () => {
  const t = useTranslations();

  const hostingOptions: HostingOption[] = [
    {
      id: 'game-hosting',
      titleKey: 'hosting.gameHosting.title',
      icon: <FaGamepad className="text-5xl mb-3 text-[var(--color-text-primary)]" />,
      price: '€3,99',
      descriptionKey: 'hosting.gameHosting.description',
      featuresKeys: [
        'hosting.gameHosting.features.ddosProtection',
        'hosting.gameHosting.features.userFriendlyPanel',
        'hosting.gameHosting.features.fullAccess',
        'hosting.gameHosting.features.optimizedServers',
        'hosting.gameHosting.features.instantSetup'
      ]
    },
    {
      id: 'web-hosting',
      titleKey: 'hosting.webHosting.title',
      icon: <FaGlobe className="text-5xl mb-3 text-[var(--color-text-primary)]" />,
      price: '€1,99',
      descriptionKey: 'hosting.webHosting.description',
      featuresKeys: [
        'hosting.webHosting.features.ddosProtection',
        'hosting.webHosting.features.directAdmin',
        'hosting.webHosting.features.dnsManagement',
        'hosting.webHosting.features.oneClickInstalls',
        'hosting.webHosting.features.sslCertificates'
      ]
    },
    {
      id: 'discord-hosting',
      titleKey: 'hosting.discordHosting.title',
      icon: <FaDiscord className="text-5xl mb-3 text-[var(--color-text-primary)]" />,
      price: '€2,49',
      descriptionKey: 'hosting.discordHosting.description',
      featuresKeys: [
        'hosting.discordHosting.features.ddosProtection',
        'hosting.discordHosting.features.easySetup',
        'hosting.discordHosting.features.nodeSupport',
        'hosting.discordHosting.features.databaseIntegration',
        'hosting.discordHosting.features.uptime'
      ]
    }
  ];

  // Refined animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section className="min-h-[100vh] md:h-screen flex items-center justify-center py-16 md:py-0" style={{ backgroundColor: 'var(--color-tertiary)' }}>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <motion.div 
          className="text-center mb-12 max-w-3xl"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[var(--color-text-primary)]">{t('hosting.sectionTitle')}</h2>
          <p className="text-lg text-[var(--color-text-primary)]">
            {t('hosting.sectionSubtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {hostingOptions.map((option) => (
            <motion.div
              key={option.id}
              className="bg-[var(--color-bg-primary)] rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="p-6 flex flex-col flex-grow">
                <motion.div 
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {option.icon}
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{t(option.titleKey)}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-bold text-[var(--color-success)]">{option.price}</span>
                    <span className="text-[var(--color-text-primary)]"> {t('hosting.perMonth')}</span>
                  </div>
                </motion.div>
                
                <p className="text-[var(--color-text-primary)] mb-6 text-center">
                  {t(option.descriptionKey)}
                </p>
                
                <div className="space-y-3 flex-grow">
                  <p className="font-semibold text-[var(--color-text-primary)]">{t('hosting.included')}:</p>
                  {option.featuresKeys.map((featureKey, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-2"
                      variants={featureVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <FaCheck className="text-green-500 flex-shrink-0" />
                      <span className="text-[var(--color-text-primary)]">{t(featureKey)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 mt-auto border-t border-[var(--color-border)]">
                <motion.button 
                  className="w-full py-3 bg-[var(--color-quinary)] text-white font-bold rounded-md hover:bg-[var(--color-senary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-quinary)] focus:ring-opacity-50 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('hosting.viewMore')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HostingOptionsSection; 