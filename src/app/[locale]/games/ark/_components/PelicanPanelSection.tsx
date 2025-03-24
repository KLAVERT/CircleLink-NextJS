'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '../../../../../components/Button/Button';

const PelicanPanelSection = () => {
  const t = useTranslations('pelicanPanel');

  const features = [
    'FTP login',
    'Browser file management',
    'Subuser login',
    'Create databases',
    'Server backups',
    'Console input',
    'Restart your server',
    'Scheduled command',
    'Scheduled power action',
    'Database management',
  ];

  return (
    <div className="py-16 bg-[var(--color-tertiary)]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight">
              <span className="text-[var(--color-text-primary)]">
                Game Server Control Panel
              </span>
            </h2>
            <p className="text-lg text-[var(--color-text-primary)] max-w-2xl mx-auto">
              Experience the most intuitive and powerful game hosting interface, designed for both beginners and advanced users.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10">
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                Some of our features:
              </h3>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {features.slice(0, 5).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[var(--color-text-primary)]">{feature}</span>
                  </div>
                ))}

                {features.slice(5, 10).map((feature, index) => (
                  <div key={index + 5} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--color-text-primary)]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[var(--color-text-primary)]">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <Button
                  variant="blue"
                  href='/#panel'
                >
                  Explore Control Panel
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