import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  className?: string;
}

// Pakketjes: posities, kleuren, animatie
const packets = [
  { top: '10%', height: 16, width: 36, color: 'var(--color-quaternary)', delay: 0, duration: 8, yMove: 40 },
  { top: '22%', height: 14, width: 32, color: 'var(--color-highlight)', delay: 1, duration: 10, yMove: 60 },
  { top: '35%', height: 18, width: 40, color: 'var(--color-quinary)', delay: 2, duration: 7, yMove: -30 },
  { top: '48%', height: 12, width: 28, color: 'var(--color-quaternary)', delay: 0.5, duration: 9, yMove: 25 },
  { top: '60%', height: 16, width: 36, color: 'var(--color-highlight)', delay: 1.5, duration: 11, yMove: -40 },
  { top: '72%', height: 14, width: 32, color: 'var(--color-quinary)', delay: 2.5, duration: 8, yMove: 35 },
  { top: '84%', height: 18, width: 40, color: 'var(--color-quaternary)', delay: 0.8, duration: 12, yMove: -20 },
  { top: '90%', height: 12, width: 28, color: 'var(--color-highlight)', delay: 1.2, duration: 10, yMove: 50 },
];

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'primary',
  children,
  className = ''
}) => {
  const getBgColor = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-[var(--color-secondary)]';
      case 'tertiary':
        return 'bg-[var(--color-primary)]';
      default:
        return 'bg-[var(--color-primary)]';
    }
  };

  return (
    <div className={`relative overflow-hidden w-full h-full ${getBgColor()} ${className}`}>
      {/* Bewegende datapakketjes */}
      {packets.map((packet, i) => (
        <motion.div
          key={i}
          className="absolute rounded-md shadow-lg z-0 pointer-events-none"
          style={{
            top: packet.top,
            left: '-50px',
            width: packet.width,
            height: packet.height,
            background: packet.color,
            opacity: 0.85,
            boxShadow: `0 0 8px 2px ${packet.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: '110vw',
            y: packet.yMove,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: packet.duration,
            repeat: Infinity,
            repeatType: 'loop',
            delay: packet.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground; 
