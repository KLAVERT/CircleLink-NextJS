'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaGlobe, FaDiscord } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import type { Feature } from '@/components/FeatureCard/FeatureCard';
import Grid from '@/components/Grid';

interface HostingOption {
  id: string;
  titleKey: string;
  icon: React.ReactNode;
  price: string;
  descriptionKey: string;
  featuresKeys: string[];
  style?: 'default' | 'minimal' | 'gradient' | 'bordered' | 'dark';
}

const HostingOptionsSection = () => {
  const t = useTranslations();

  const hostingOptions: HostingOption[] = [
    {
      id: 'game-hosting',
      titleKey: 'hosting.gameHosting.title',
      icon: <FaGamepad />,
      price: '€3,99',
      descriptionKey: 'hosting.gameHosting.description',
      featuresKeys: [
        'hosting.gameHosting.features.ddosProtection',
        'hosting.gameHosting.features.userFriendlyPanel',
        'hosting.gameHosting.features.fullAccess',
        'hosting.gameHosting.features.optimizedServers',
        'hosting.gameHosting.features.instantSetup'
      ],
      style: 'gradient'
    },
    {
      id: 'web-hosting',
      titleKey: 'hosting.webHosting.title',
      icon: <FaGlobe />,
      price: '€1,99',
      descriptionKey: 'hosting.webHosting.description',
      featuresKeys: [
        'hosting.webHosting.features.ddosProtection',
        'hosting.webHosting.features.directAdmin',
        'hosting.webHosting.features.dnsManagement',
        'hosting.webHosting.features.oneClickInstalls',
        'hosting.webHosting.features.sslCertificates'
      ],
      style: 'dark'
    },
    {
      id: 'discord-hosting',
      titleKey: 'hosting.discordHosting.title',
      icon: <FaDiscord />,
      price: '€1,50',
      descriptionKey: 'hosting.discordHosting.description',
      featuresKeys: [
        'hosting.discordHosting.features.ddosProtection',
        'hosting.discordHosting.features.easySetup',
        'hosting.discordHosting.features.nodeSupport',
        'hosting.discordHosting.features.databaseIntegration',
        'hosting.discordHosting.features.uptime'
      ],
      style: 'bordered'
    }
  ];

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

  return (
    <section className="min-h-[100vh] min-h-[800px] py-16 flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
      <Grid container maxWidth="xl" className="flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
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

          <Grid columns={1} mdColumns={2} lgColumns={3} spacing="lg" className="px-4 sm:px-6 lg:px-8">
            {hostingOptions.map((option) => {
              const features: Feature[] = option.featuresKeys.map(key => ({
                text: t(key),
                status: 'included'
              }));

              return (
                <motion.div
                  key={option.id}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="h-full"
                >
                  <FeatureCard
                    title={t(option.titleKey)}
                    price={option.price}
                    description={t(option.descriptionKey)}
                    features={features}
                    icon={option.icon}
                    style={option.style}
                    buttonText={t('hosting.viewMore')}
                    priceSubtext={t('hosting.perMonth')}
                  />
                </motion.div>
              );
            })}
          </Grid>
        </div>
      </Grid>
    </section>
  );
};

export default HostingOptionsSection; 