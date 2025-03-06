'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaServer, FaClock, FaDatabase } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { HiCheck } from 'react-icons/hi';

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

const glowPositions = [
  { left: '10%', top: '20%' },
  { left: '60%', top: '40%' },
  { left: '80%', top: '70%' }
];

const particlePositions = [
  { left: '15%', top: '20%' },
  { left: '25%', top: '40%' },
  { left: '35%', top: '60%' },
  { left: '45%', top: '80%' },
  { left: '55%', top: '30%' },
  { left: '65%', top: '50%' },
  { left: '75%', top: '70%' },
  { left: '85%', top: '25%' },
  { left: '95%', top: '45%' },
  { left: '5%', top: '65%' },
  { left: '20%', top: '85%' },
  { left: '40%', top: '15%' },
  { left: '60%', top: '35%' },
  { left: '80%', top: '55%' },
  { left: '90%', top: '75%' }
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

export default function InfoSection() {
  return (
    <section className="relative bg-[var(--color-primary)] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Discord-style Grid */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(var(--color-quinary) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-quinary) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              opacity: 0.05,
              transform: 'perspective(1000px) rotateX(60deg) scale(2)',
            }}
          />

          {/* Discord-style Glow Effects */}
          {glowPositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[var(--color-quinary)] blur-[120px]"
              style={{
                width: '600px',
                height: '600px',
                left: pos.left,
                top: pos.top,
                opacity: 0.1,
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}

          {/* Discord-style Particles */}
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-[var(--color-quinary)] rounded-full"
              style={{
                left: pos.left,
                top: pos.top,
                opacity: 0.2,
              }}
              animate={{
                y: [0, -800],
                opacity: [0.2, 0],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Discord-style Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] via-transparent to-[var(--color-tertiary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 2 }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="py-24 px-4 md:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="max-w-4xl mx-auto">
            <motion.div variants={titleVariants}>
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-quinary)] text-white text-sm font-semibold mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDiscord className="w-4 h-4" />
                DISCORD HOSTING
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text-primary)]"
              variants={titleVariants}
            >
              Discord Hosting On A Next Level.
            </motion.h1>

            <motion.div variants={containerVariants}>
              <ul className="space-y-4">
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
          className="py-16 px-4 md:px-8"
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