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
  const getColors = () => {
    switch (variant) {
      case 'secondary':
        return {
          background: 'var(--color-secondary)',
          showAnimation: false
        };
      case 'tertiary':
        return {
          background: 'var(--color-primary)',
          showAnimation: false
        };
      default:
        return {
          primary: 'var(--color-secondary)',
          secondary: 'var(--color-primary)',
          accent: 'var(--color-secondary)',
          background: 'var(--color-primary)',
          opacity: '0.30',
          showAnimation: true
        };
    }
  };

  const colors = getColors();

  const getRandomDirection = (index: number) => {
    const directions = [-100, -75, -50, -25, 25, 50, 75, 100];
    return directions[index % directions.length];
  };

  const particles = useMemo(() => {
    const particleCount = 20;
    
    return Array.from({ length: particleCount }).map((_, i) => ({
      size: 1.5 + (i % 6),
      xStart: (i * 11) % 100,
      yStart: (i * 13) % 100,
      duration: 12 + (i % 10),
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
          {[0, 1, 2].map(i => (
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
                filter: 'blur(40px)',
                opacity: colors.opacity,
                mixBlendMode: 'soft-light',
                willChange: 'transform',
              }}
              animate={{
                x: [`${-10 + i * 20}%`, `${-5 + i * 20}%`, `${-10 + i * 20}%`],
                y: [`${-10 + i * 20}%`, `${-15 + i * 20}%`, `${-10 + i * 20}%`],
                scale: [0.9, 1.0, 0.9],
                rotate: 0,
              }}
              transition={{
                duration: 15,
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
                  willChange: 'transform, opacity',
                }}
                animate={{
                  y: [0, particle.yDirection, 0],
                  x: [0, particle.xDirection, 0],
                  opacity: [0, 0.7, 0],
                  scale: [1, 1.2, 1],
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