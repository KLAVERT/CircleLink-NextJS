'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaServer, FaClock, FaDatabase } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { HiCheck } from 'react-icons/hi';
import Image from 'next/image';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaServer className="w-8 h-8" />,
    title: 'Hosted On Pelican',
    description: 'Switch to another server/bot quickly and flexibly'
  },
  {
    icon: <FaClock className="w-8 h-8" />,
    title: 'Immediately Online',
    description: 'Your server is available in under 3 minutes'
  },
  {
    icon: <MdDashboard className="w-8 h-8" />,
    title: 'Live console',
    description: 'Track events and logs in real time through the web interface'
  },
  {
    icon: <FaDatabase className="w-8 h-8" />,
    title: 'Backup Storage Space',
    description: 'Create 2 backups for your bot!'
  }
];

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
  const [discordCharacters, setDiscordCharacters] = useState<DiscordCharacter[]>([]);
  const [messageBlips, setMessageBlips] = useState<MessageBlip[]>([]);

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
  }, []);

  return (
    <section className="min-h-[100vh] md:h-screen relative bg-[var(--color-primary)] overflow-hidden">
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
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        {/* Hero Section */}
        <motion.div 
          className="pb-4 px-4 md:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="max-w-3xl mx-auto">
            <motion.div variants={titleVariants}>
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-quinary)] text-white text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDiscord className="w-4 h-4" />
                DISCORD HOSTING
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-text-primary)]"
              variants={titleVariants}
            >
              Discord Hosting On A Next Level.
            </motion.h1>

            <motion.div variants={containerVariants}>
              <ul className="space-y-3">
                {[
                  "Immediate access thanks to our system. Instantly online",
                  "No contract - no minimum terms",
                  "Easy management of all services on a single account",
                  "Full cost control through our payment system",
                  "Hosted with pelican panel"
                ].map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3 text-lg text-[var(--color-text-primary)] group"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="bg-[var(--color-success)]/10 rounded-full p-1"
                      variants={checkmarkVariants}
                      whileHover="hover"
                      custom={index}
                    >
                      <HiCheck className="w-5 h-5 text-[var(--color-success)]" />
                    </motion.div>
                    <span className="group-hover:text-[var(--color-success)] transition-colors duration-200">
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
          className="pt-8 px-4 md:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
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
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default InfoSection; 