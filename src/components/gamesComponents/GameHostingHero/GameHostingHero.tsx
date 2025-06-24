import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button/Button';
import { useTranslations } from 'next-intl';

export interface GameHostingHeroProps {
  badge: string | { key: string };
  title: string | { key: string };
  subtitle: string | { key: string };
  description: string | { key: string };
  features: (string | { key: string })[];
  buttons: { label: string | { key: string }; href: string; variant: 'white' | 'outline' }[];
  bottomFeatures: { icon: React.ReactNode; label: string | { key: string } }[];
  backgroundImage: string;
  translationNamespace?: string; // optioneel, voor next-intl namespace
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  }
};

function resolveText(t: (k: string) => string, value: string | { key: string }) {
  if (typeof value === 'string') return value;
  return t(value.key);
}

const GameHostingHero: React.FC<GameHostingHeroProps> = ({
  badge,
  title,
  subtitle,
  description,
  features,
  buttons,
  bottomFeatures,
  backgroundImage,
  translationNamespace
}) => {
  const t = useTranslations(translationNamespace || undefined);

  return (
    <section className="relative w-full">
      {/* Background with wallpaper and color tint */}
      <div
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[var(--color-primary)] bg-blend-overlay"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          className="max-w-4xl px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block bg-blue-600 text-[var(--color-button-text)] rounded-full px-4 py-1 mb-6 text-sm font-medium"
            variants={titleVariants}
          >
            {resolveText(t, badge)}
          </motion.div>

          <motion.h1
            className="mb-4 text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl lg:text-6xl"
            variants={titleVariants}
          >
            {resolveText(t, title)}
          </motion.h1>

          <motion.h2
            className="mb-6 text-2xl font-semibold text-[var(--color-secondary)] md:text-3xl"
            variants={titleVariants}
          >
            {resolveText(t, subtitle)}
          </motion.h2>

          <motion.p
            className="mb-8 text-lg text-[var(--color-text-primary)] opacity-90 max-w-3xl mx-auto"
            variants={contentVariants}
          >
            {resolveText(t, description)}
          </motion.p>

          <motion.div
            className="mb-10 flex flex-col items-center gap-3 text-[var(--color-text-primary)]"
            variants={contentVariants}
          >
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {/** Je kunt eventueel een standaard icoon toevoegen via een prop als je wilt */}
                <span className="text-green-400">•</span> <span>{resolveText(t, feature)}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={contentVariants}
          >
            {buttons.map((btn, idx) => (
              <Button key={idx} href={btn.href} variant={btn.variant}>
                {resolveText(t, btn.label)}
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom features */}
      <div className="relative z-10 bg-[rgba(0,0,0,0.7)] py-6 backdrop-blur-sm w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {bottomFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3 text-[var(--color-text-primary)]">
                {feat.icon}
                <span>{resolveText(t, feat.label)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameHostingHero; 