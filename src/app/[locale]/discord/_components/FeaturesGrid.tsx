'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaClock, FaDatabase } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
    {
      icon: <FaServer className="w-8 h-8" />,  // Discord server icon
      title: 'Hosted On Pelican',
      description: 'Switch to another server/bot quickly and flexibly'
    },
    {
      icon: <FaClock className="w-8 h-8" />,   // Clock icon
      title: 'Immediately Online',
      description: 'Your server is available in under 3 minutes'
    },
    {
      icon: <MdDashboard className="w-8 h-8" />, // Dashboard icon
      title: 'Live console',
      description: 'Track events and logs in real time through the web interface'
    },
    {
      icon: <FaDatabase className="w-8 h-8" />,  // Database/storage icon
      title: 'Backup Storage Space',
      description: 'Create 2 backups for your bot!'
    }
  ];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function FeaturesGrid() {
  return (
    <section className="py-4 px-4 md:px-8 bg-[var(--color-tertiary)]">
      <motion.div 
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center flex flex-col justify-center"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-[var(--color-text-primary)] mb-2 flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-1 text-[var(--color-text-primary)]">
              {feature.title}
            </h3>
            <p className="text-[var(--color-text-primary)]">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 