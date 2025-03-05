import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'primary',
  children,
  className = ''
}) => {
  // Bepaal de kleuren op basis van de variant
  const getColors = () => {
    switch (variant) {
      case 'secondary':
        // Features sectie
        return {
          background: 'var(--color-tertiary)',
          showAnimation: false
        };
      case 'tertiary':
        // FAQ sectie
        return {
          background: 'var(--color-primary)',
          showAnimation: false
        };
      default:
        // Hero sectie - alleen subtiele overgang naar features
        return {
          primary: 'var(--color-secondary)',
          secondary: 'var(--color-primary)',
          accent: 'var(--color-tertiary)',
          background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary) 95%, var(--color-tertiary) 100%)',
          opacity: '0.30',
          showAnimation: true
        };
    }
  };

  const colors = getColors();

  // Functie om een random richting te genereren
  const getRandomDirection = (index: number) => {
    const directions = [-100, -75, -50, -25, 25, 50, 75, 100];
    return directions[index % directions.length];
  };

  // Genereer stabiele particle data
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      size: 1.5 + (i % 6),
      xStart: (i * 11) % 100,
      yStart: (i * 13) % 100,
      duration: 8 + (i % 20),
      xDirection: getRandomDirection(i),
      yDirection: getRandomDirection(i + 1),
    }));
  }, []);

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        background: colors.background,
        marginTop: variant === 'secondary' ? '-1px' : '0',
      }}
    >
      {colors.showAnimation && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating blobs */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`blob-${i}`}
              className="absolute"
              style={{
                width: `${70 + i * 10}%`,
                height: `${70 + i * 10}%`,
                background: i === 0 
                  ? `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)`
                  : i === 1 
                  ? `radial-gradient(circle, ${colors.secondary}30 0%, transparent 70%)`
                  : `radial-gradient(circle, ${colors.accent}30 0%, transparent 70%)`,
                filter: 'blur(60px)',
                opacity: colors.opacity,
                mixBlendMode: 'soft-light',
                transform: 'translate3d(0,0,0)',
              }}
              animate={{
                x: [`${-20 + i * 40}%`, `${-15 + i * 40}%`, `${-20 + i * 40}%`],
                y: [`${-20 + i * 40}%`, `${-25 + i * 40}%`, `${-20 + i * 40}%`],
                scale: [0.8, 1.1, 0.8],
                rotate: [0, i % 2 === 0 ? 180 : -180, 0],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
          ))}

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  background: i % 3 === 0 
                    ? colors.primary 
                    : i % 3 === 1 
                    ? colors.secondary 
                    : colors.accent,
                  left: `${particle.xStart}%`,
                  top: `${particle.yStart}%`,
                  transform: 'translate3d(0,0,0)',
                }}
                animate={{
                  y: [0, particle.yDirection, 0],
                  x: [0, particle.xDirection, 0],
                  opacity: [0, 0.7, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -(particle.duration * (i % 10) / 10),
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground; 