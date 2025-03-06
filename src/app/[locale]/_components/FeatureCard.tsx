'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index?: number;
}

const FeatureCard = ({ title, description, icon, index = 0 }: FeatureCardProps) => {
  // Card animatie variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: 15,
      scale: 0.95
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { 
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: {
      scale: 1.02,
      y: -5,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, rotate: -10, opacity: 0.6 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { 
        delay: (index * 0.15) + 0.3,
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    },
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      } 
    }
  };

  // Tekst animatie variants
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: (i * 0.15) + 0.4,
        duration: 0.5
      }
    }),
    hover: { 
      x: 5, 
      transition: { 
        duration: 0.3 
      } 
    }
  };

  return (
    <motion.div 
      className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary)] p-6 rounded-lg shadow-sm relative overflow-hidden h-full flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      custom={index}
    >
      {/* Achtergrond accent effect */}
      <motion.div 
        className="absolute right-0 bottom-0 w-32 h-32 rounded-full -mr-16 -mb-16 bg-[var(--color-quinary)] dark:bg-[var(--color-quaternary)] opacity-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: (index * 0.15) + 0.2 }}
        whileHover={{ scale: 1.2, opacity: 0.15 }}
      />

      <motion.div 
        className="w-14 h-14 bg-[var(--color-secondary)] dark:bg-[var(--color-quaternary)] rounded-2xl flex items-center justify-center mb-4 relative z-10"
        variants={iconVariants}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--color-senary)] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </motion.div>
      
      <motion.h3 
        className="text-xl font-bold text-[var(--color-text-primary)] dark:text-white mb-3 relative z-10"
        variants={textVariants}
        custom={index}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] relative z-10 flex-grow"
        variants={textVariants}
        custom={index + 0.5}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default FeatureCard; 