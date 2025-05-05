'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '../../../../../components/Button/Button';

const PelicanPanelSection = () => {
  const t = useTranslations('rust.pelicanPanel');

  return (
    <div className="py-16 bg-[var(--color-tertiary)]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight">
              <span className="text-[var(--color-text-primary)]">
                {t('title')}
              </span>
            </h2>
            <p className="text-lg text-[var(--color-text-primary)] max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10">
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                {t('featuresTitle')}
              </h3>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.ftpLogin')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.browserFileManagement')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.subuserLogin')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.createDatabases')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.serverBackups')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.consoleInput')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.restartServer')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.scheduledCommand')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.scheduledPowerAction')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-primary)]">{t('features.databaseManagement')}</span>
                </div>
              </div>
              
              <div className="pt-6">
                <Button
                  variant="blue"
                  href='/#panel'
                >
                  {t('buttonText')}
                </Button>
              </div>
            </div>

            {/* Screenshot */}
            <div className="lg:w-1/2">
              <div className="relative bg-gradient-to-r from-[var(--color-bg-surface)] to-[var(--color-bg-primary)] p-2 rounded-xl border border-[var(--color-border)] shadow-2xl">
                <div className="h-8 bg-[var(--color-bg-deep)] flex items-center px-4 rounded-t-lg mb-1">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--color-error)]"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--color-success)]"></div>
                  </div>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PelicanPanelSection;