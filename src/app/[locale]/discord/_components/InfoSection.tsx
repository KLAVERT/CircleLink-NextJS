'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaServer, FaClock, FaDatabase } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { HiCheck } from 'react-icons/hi';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Grid, { GridItem } from '@/components/Grid';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface DiscordCharacter {
  path: string;
  size: number;
  startPosition: {
    x: string;
    y: string;
  };
  endPosition: {
    x: string;
    y: string;
  };
  delay: number;
  duration: number;
}

interface MessageBlip {
  width: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
}

const discordPaths = [
  '/svg/discord/discord.svg',
  '/svg/discord/icons8-discord-bot.svg',
  '/svg/discord/early-supporter.svg',
  '/svg/discord/active-developer.svg',
  '/svg/discord/nitro.svg'
];

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
  hidden: { 
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

const checkmarkVariants = {
  hidden: { 
    scale: 0,
    opacity: 0 
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  hover: {
    scale: 1.2,
    rotate: 12,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const InfoSection = () => {
  const t = useTranslations('discord.info');
  const [discordCharacters, setDiscordCharacters] = useState<DiscordCharacter[]>([]);
  const [messageBlips, setMessageBlips] = useState<MessageBlip[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get features from translations
  const featureIcons = [
    <FaServer key="server-icon" className="w-8 h-8" />, 
    <FaClock key="clock-icon" className="w-8 h-8" />, 
    <MdDashboard key="dashboard-icon" className="w-8 h-8" />, 
    <FaDatabase key="database-icon" className="w-8 h-8" />
  ];
  
  const features: Feature[] = t.raw('cards').map((card: Record<string, string>, index: number) => ({
    icon: featureIcons[index],
    title: card.title,
    description: card.description
  }));

  useEffect(() => {
    // Generate random values for characters on the client side
    const characters = discordPaths.map((path, i) => ({
      path,
      size: Math.random() * (i === 0 ? 60 : 50) + (i === 0 ? 40 : 30),
      startPosition: {
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`
      },
      endPosition: {
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`
      },
      delay: i * 2 + Math.random() * 3,
      duration: Math.random() * 15 + 20
    }));

    // Generate random values for message blips
    const blips: MessageBlip[] = Array.from({ length: 8 }, (_, i) => ({
      width: Math.random() * 120 + 80,
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 70 + 15}%`,
      delay: i * 0.6,
      duration: Math.random() * 4 + 5
    }));

    setDiscordCharacters(characters);
    setMessageBlips(blips);
    
    // Set loaded state after a short delay to ensure animations are prepared
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  // Don't render the component until it's fully loaded and ready
  if (!isLoaded) {
    return null;
  }

  return (
    <section className="min-h-[100vh] relative bg-[var(--color-primary)] overflow-hidden pt-20 md:pt-24 pb-16 md:pb-24">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Floating Discord Characters */}
          {discordCharacters.map((item, i) => (
            <motion.div
              key={i}
              className="absolute select-none pointer-events-none"
              style={{
                width: `${item.size}px`,
                height: `${item.size}px`,
                left: item.startPosition.x,
                top: item.startPosition.y
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.3, 1, 1, 0.3],
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
            >
              <Image
                src={item.path}
                alt="Discord character"
                width={item.size}
                height={item.size}
                className="w-full h-full"
              />
            </motion.div>
          ))}

          {/* Message Blips */}
          {messageBlips.map((blip, i) => (
            <motion.div
              key={i}
              className="absolute h-12 rounded-xl bg-[#5865F2] opacity-5"
              style={{
                width: blip.width,
                left: blip.left,
                top: blip.top
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 1, 0],
                opacity: [0, 0.05, 0.05, 0],
                x: [0, 40, 40, 80]
              }}
              transition={{
                duration: blip.duration,
                repeat: Infinity,
                delay: blip.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Discord Grid Overlay */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(88, 101, 242, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(88, 101, 242, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              opacity: 0.5
            }}
          />

          {/* Discord-style Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(88, 101, 242, 0.15) 0%, rgba(88, 101, 242, 0) 70%)',
              mixBlendMode: 'screen'
            }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center">
        {/* Hero Section */}
        <motion.div 
          className="pb-4 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div variants={titleVariants}>
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-quinary)] text-white text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDiscord className="w-4 h-4" />
                {t('badge')}
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-text-primary)] text-left"
              variants={titleVariants}
            >
              {t('title')}
            </motion.h1>

            <motion.div variants={containerVariants}>
              <ul className="space-y-3 list-none pl-0">
                {t.raw('features').map((feature: string, index: number) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-2 text-lg text-[var(--color-text-primary)] group text-left"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="bg-[var(--color-success)]/10 rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center"
                      variants={checkmarkVariants}
                      whileHover="hover"
                      custom={index}
                    >
                      <HiCheck className="w-5 h-5 text-[var(--color-success)]" />
                    </motion.div>
                    <span className="flex-1 min-w-0 group-hover:text-[var(--color-success)] transition-colors duration-200 break-words">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="pt-12 px-4 sm:px-6 lg:px-8 pb-16 md:pb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <Grid columns={1} mdColumns={2} lgColumns={4} spacing="md">
              {features.map((feature, index) => (
                <GridItem key={index}>
                  <motion.div
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                  >
                    <div className="text-[var(--color-quinary)] mb-4">
                      {feature.icon}
                    </div>
                    <motion.h3 
                      className="text-xl font-bold mb-2 text-[var(--color-text-dark)]"
                      variants={titleVariants}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-[var(--color-text-dark)]"
                      variants={itemVariants}
                    >
                      {feature.description}
                    </motion.p>
                  </motion.div>
                </GridItem>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default InfoSection; 