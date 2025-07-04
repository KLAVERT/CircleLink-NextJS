import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Button from '../Button/Button';
import Grid, { GridItem } from '@/components/Grid';

export type CardStyle = 'default' | 'minimal' | 'gradient' | 'bordered' | 'dark';
export type FeatureStatus = 'included' | 'excluded' | 'none';

export interface Feature {
  text: string;
  status?: FeatureStatus;
}

interface FeatureCardProps {
  title: string;
  price: string;
  description: string;
  features: Feature[];
  style?: CardStyle;
  icon?: React.ReactNode;
  imagePath?: string;
  imageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  priceSubtext?: string;
  sub?: boolean;
  subtext?: string;
  href?: string;
}

const cardStyles: Record<CardStyle, string> = {
  default: 'bg-[var(--color-bg-primary)] shadow-lg',
  minimal: 'bg-white border border-[var(--color-border)]',
  gradient: 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]',
  bordered: 'bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent-cool)]',
  dark: 'bg-[var(--color-bg-surface)] text-white'
};

const buttonVariants: Record<CardStyle, 'primary' | 'secondary' | 'ghost' | 'success' | 'blue' | 'error' | 'outline' | 'white'> = {
  default: 'blue',
  minimal: 'blue',
  gradient: 'white',
  bordered: 'blue',
  dark: 'blue'
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  price,
  description,
  features,
  style = 'default',
  icon,
  imagePath,
  imageAlt,
  buttonText,
  onButtonClick,
  priceSubtext,
  sub = false,
  subtext,
  href
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className={`rounded-lg overflow-visible flex flex-col h-full relative ${cardStyles[style]} ${sub ? 'border-2 border-[var(--color-accent-cool)]' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {sub && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--color-accent-cool)] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          {subtext}
        </div>
      )}
      <Grid spacing="md" className="p-6 pt-8 flex-grow overflow-hidden flex flex-col">
        <GridItem className="flex flex-col items-center text-center mb-6">
          {imagePath ? (
            <div className="relative w-16 h-16 mb-4">
              <Image
                src={imagePath}
                alt={imageAlt || title}
                fill
                className="object-contain"
              />
            </div>
          ) : icon ? (
            <div className="text-5xl mb-4 text-[var(--color-text-primary)]">
              {icon}
            </div>
          ) : null}
          
          <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-[var(--color-success)]">{price}</span>
            <span className="text-[var(--color-text-primary)]"> {priceSubtext}</span>
          </div>
        </GridItem>

        <GridItem className="text-center mb-6">
          <p className="text-[var(--color-text-primary)]">
            {description}
          </p>
        </GridItem>

        <GridItem className="space-y-3 flex-grow">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              {feature.status === 'included' && (
                <FaCheck className="text-[var(--color-success)] flex-shrink-0" />
              )}
              {feature.status === 'excluded' && (
                <FaTimes className="text-[var(--color-error)] flex-shrink-0" />
              )}
              {feature.status === 'none' && (
                <div className="w-4 flex-shrink-0" />
              )}
              <span className="text-[var(--color-text-primary)]">{feature.text}</span>
            </motion.div>
          ))}
        </GridItem>
      </Grid>

      <div className="p-6 mt-auto border-t border-[var(--color-border)]">
        <Button
          variant={buttonVariants[style]}
          onClick={onButtonClick}
          fullWidth
          href={href}
        >
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

export default FeatureCard; 