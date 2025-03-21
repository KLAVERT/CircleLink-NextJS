import React, { useMemo, useEffect, useState } from 'react';
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
  // Detecteer of het een mobiel apparaat is
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check voor mobiel apparaat op basis van schermgrootte én user agent voor iOS
    const checkMobile = () => {
      const isMobileBySize = window.innerWidth < 768;
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(isMobileBySize || isIOS);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Genereer stabiele particle data met minder particles voor mobiel
  const particles = useMemo(() => {
    // Minder particles voor mobiel
    const particleCount = isMobile ? 15 : 80;
    
    return Array.from({ length: particleCount }).map((_, i) => ({
      size: 1.5 + (i % 6),
      xStart: (i * 11) % 100,
      yStart: (i * 13) % 100,
      duration: isMobile ? 12 + (i % 10) : 8 + (i % 20), // Langzamere animatie op mobiel
      xDirection: getRandomDirection(i),
      yDirection: getRandomDirection(i + 1),
    }));
  }, [isMobile]);

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
          {/* Large floating blobs - minder en eenvoudiger voor mobiel */}
          {[...Array(isMobile ? 1 : 3)].map((_, i) => (
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
                filter: isMobile ? 'blur(40px)' : 'blur(60px)',
                opacity: colors.opacity,
                mixBlendMode: 'soft-light',
                willChange: 'transform',
              }}
              animate={{
                x: isMobile 
                  ? [`${-10 + i * 20}%`, `${-5 + i * 20}%`, `${-10 + i * 20}%`]
                  : [`${-20 + i * 40}%`, `${-15 + i * 40}%`, `${-20 + i * 40}%`],
                y: isMobile
                  ? [`${-10 + i * 20}%`, `${-15 + i * 20}%`, `${-10 + i * 20}%`]
                  : [`${-20 + i * 40}%`, `${-25 + i * 40}%`, `${-20 + i * 40}%`],
                scale: isMobile ? [0.9, 1.0, 0.9] : [0.8, 1.1, 0.8],
                rotate: isMobile ? 0 : [0, i % 2 === 0 ? 180 : -180, 0],
              }}
              transition={{
                duration: isMobile ? 15 : 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
          ))}

          {/* Animated particles - geoptimaliseerd voor mobiel */}
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
                  scale: isMobile ? [1, 1.2, 1] : [1, 1.5, 1],
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