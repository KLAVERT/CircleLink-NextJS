'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '../../../../../components/Button/Button';
import Grid, { GridItem } from '@/components/Grid';

const PelicanPanelSection = () => {
  const t = useTranslations('ark.pelicanPanel');

  const features = [
    { key: 'ftpLogin', text: t('features.ftpLogin') },
    { key: 'browserFileManagement', text: t('features.browserFileManagement') },
    { key: 'subuserLogin', text: t('features.subuserLogin') },
    { key: 'createDatabases', text: t('features.createDatabases') },
    { key: 'serverBackups', text: t('features.serverBackups') },
    { key: 'consoleInput', text: t('features.consoleInput') },
    { key: 'restartServer', text: t('features.restartServer') },
    { key: 'scheduledCommand', text: t('features.scheduledCommand') },
    { key: 'scheduledPowerAction', text: t('features.scheduledPowerAction') },
    { key: 'databaseManagement', text: t('features.databaseManagement') },
  ];

  return (
    <div className="py-16 bg-[var(--color-tertiary)]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Grid columns={1} spacing="xl">
            <GridItem>
              <div className="mb-6">
                <h2 className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight">
                  <span className="text-[var(--color-text-primary)]">
                    {t('title')}
                  </span>
                </h2>
                <p className="text-lg text-[var(--color-text-primary)] max-w-2xl">
                  {t('subtitle')}
                </p>
              </div>
            </GridItem>

            <GridItem>
              <Grid columns={1} lgColumns={2} spacing="lg">
                <GridItem>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                      {t('featuresTitle')}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
                      {features.map((feature) => (
                        <div key={feature.key} className="flex items-center group transition-all duration-200 hover:translate-x-1">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-3 flex-shrink-0 shadow-sm group-hover:bg-[var(--color-primary)] transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-[var(--color-text-primary)] text-base font-medium">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-8">
                      <Button
                        variant="blue"
                        href='/#panel'
                      >
                        {t('buttonText')}
                      </Button>
                    </div>
                  </div>
                </GridItem>

                {/* Screenshot */}
                <GridItem>
                  <div className="relative bg-gradient-to-r from-[var(--color-bg-surface)] to-[var(--color-bg-primary)] p-2 rounded-xl border border-[var(--color-border)] shadow-2xl h-full flex flex-col">
                    <div className="h-8 bg-[var(--color-bg-deep)] flex items-center px-4 rounded-t-lg mb-1">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--color-error)]"></div>
                        <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]"></div>
                        <div className="w-3 h-3 rounded-full bg-[var(--color-success)]"></div>
                      </div>
                    </div>
                    <div className="flex-grow flex items-center justify-center">
                      <Image 
                        src="/images/jpg/mainpage/dashboard.jpg" 
                        alt="Control Panel" 
                        width={800}
                        height={450}
                        className="rounded-b-lg w-full"
                        priority
                      />
                    </div>
                  </div>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default PelicanPanelSection;