'use client';

import React, { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Modal Component
const ImageModal = ({ isOpen, onClose, imageSrc, title }: { isOpen: boolean; onClose: () => void; imageSrc: string; title: string }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative max-w-7xl w-full bg-[var(--color-card-bg)] rounded-xl overflow-hidden border-2 border-[var(--color-border)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-12 bg-[var(--color-bg-secondary)] flex items-center px-4 border-b-2 border-[var(--color-border)] relative z-[9999]">
              <div className="flex space-x-2">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:ring-2 hover:ring-red-300 transition-all" 
                  onClick={onClose}
                ></motion.div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-sm font-medium text-[var(--color-text-primary)]">
                {title}
              </div>
            </div>
            <div className="relative bg-[var(--color-bg-surface)] p-4">
              <Image
                src={imageSrc}
                alt={title}
                width={1600}
                height={900}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Feature item component met animatie
interface PanelFeatureItemProps {
  title: string;
  description: string;
  iconSrc: string;
  index?: number;
}

const PanelFeatureItem = ({ title, description, iconSrc, index = 0 }: PanelFeatureItemProps) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <motion.div
      ref={itemRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex p-4 rounded-xl hover:bg-[var(--color-bg-secondary)] dark:hover:bg-[var(--color-bg-secondary)] transition-colors duration-300"
    >
      <div className="flex-shrink-0 mr-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-quaternary)] to-[var(--color-quinary)] flex items-center justify-center text-white">
          <Image 
            src={iconSrc} 
            alt={title} 
            width={24} 
            height={24} 
            className="text-white" 
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] mb-1">
          {title}
        </h3>
        <p className="text-[var(--color-text-subtle)] dark:text-[var(--color-text-subtle)]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const PelicanPanelSection = () => {
  const t = useTranslations('pelicanPanel');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const panelFeatures = [
    {
      title: t('features.userFriendly.title'),
      description: t('features.userFriendly.description'),
      iconSrc: '/svg/mainpage/ui-interface.svg'
    },
    {
      title: t('features.oneClickInstall.title'),
      description: t('features.oneClickInstall.description'),
      iconSrc: '/svg/mainpage/one-click-install.svg'
    },
    {
      title: t('features.fileManager.title'),
      description: t('features.fileManager.description'),
      iconSrc: '/svg/mainpage/file-manager.svg'
    },
    {
      title: t('features.backups.title'),
      description: t('features.backups.description'),
      iconSrc: '/svg/mainpage/backup.svg'
    },
    {
      title: t('features.monitoring.title'),
      description: t('features.monitoring.description'),
      iconSrc: '/svg/mainpage/monitoring.svg'
    },
    {
      title: t('features.scheduling.title'),
      description: t('features.scheduling.description'),
      iconSrc: '/svg/mainpage/task-scheduling.svg'
    }
  ];

  // Animatie varianten voor de container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Titel animatie variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Image animatie variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="py-24 md:py-32 relative overflow-hidden">
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ''}
        title={selectedImage?.title || ''}
      />
      <div className="hidden lg:block absolute inset-0 w-full h-full opacity-20">
        <Image
          src="/images/jpg/mainpage/sons_of_the_forest.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="w-full h-full"
          priority
        />
      </div>
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={titleVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] mb-4">
              {t('title')} <span className="text-[var(--color-quinary)] dark:text-[var(--color-quinary)]">{t('subtitle')}</span>
            </h2>
            <p className="text-[var(--color-text-subtle)] dark:text-[var(--color-text-subtle)] max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column - Panels */}
            <motion.div
              variants={imageVariants}
              className="lg:col-span-7 grid grid-cols-1 gap-6"
            >
              {/* Eerste panel - Dashboard */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[var(--color-card-bg)] dark:bg-[var(--color-card-bg)] rounded-xl shadow-xl w-full border border-[var(--color-border)] dark:border-[var(--color-border)] flex flex-col overflow-hidden lg:cursor-pointer"
                onClick={() => {
                  if (window.innerWidth >= 1024) {
                    setSelectedImage({ src: '/images/jpg/mainpage/dashboard.jpg', title: 'Pelican Panel - Dashboard' });
                  }
                }}
              >
                <div className="flex-shrink-0 h-12 bg-[var(--color-bg-secondary)] dark:bg-[var(--color-bg-secondary)] flex items-center px-4 border-b border-[var(--color-border)]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">Pelican Panel - Dashboard</div>
                </div>
                <div className="relative">
                  <Image 
                    src="/images/jpg/mainpage/dashboard.jpg" 
                    alt="Server Dashboard" 
                    width={800}
                    height={450}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </motion.div>

              {/* Tweede panel - File Editor */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[var(--color-card-bg)] dark:bg-[var(--color-card-bg)] rounded-xl shadow-xl w-full border border-[var(--color-border)] dark:border-[var(--color-border)] flex flex-col overflow-hidden lg:cursor-pointer"
                onClick={() => {
                  if (window.innerWidth >= 1024) {
                    setSelectedImage({ src: '/images/jpg/mainpage/filemanage.jpg', title: 'Pelican Panel - File Editor' });
                  }
                }}
              >
                <div className="flex-shrink-0 h-12 bg-[var(--color-bg-secondary)] dark:bg-[var(--color-bg-secondary)] flex items-center px-4 border-b border-[var(--color-border)]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">Pelican Panel - File Editor</div>
                </div>
                <div className="relative">
                  <Image 
                    src="/images/jpg/mainpage/filemanage.jpg" 
                    alt="File Editor" 
                    width={800}
                    height={450}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Features List */}
            <div className="lg:col-span-5 flex flex-col">
              <motion.h3 
                variants={titleVariants} 
                className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] mb-6"
              >
                {t('features.title')}
              </motion.h3>
              
              <div className="space-y-4">
                {panelFeatures.map((feature, index) => (
                  <PanelFeatureItem
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    iconSrc={feature.iconSrc}
                    index={index}
                  />
                ))}
              </div>

              {/* Call to Action Button */}
              <motion.div 
                variants={titleVariants}
                className="mt-10 text-center lg:text-left"
              >
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PelicanPanelSection; 