'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaUsers, FaRocket, FaShieldAlt, FaHeart, FaBullseye, FaEye } from 'react-icons/fa';
import Button from '@/components/Button/Button';
import { motion } from 'framer-motion';

const CountUp: React.FC<{ end: number; duration?: number; decimals?: number; suffix?: string; trigger?: boolean }> = ({ end, duration = 2, decimals = 0, suffix = '', trigger = false }) => {
  const [value, setValue] = useState(0);
  const startTimestamp = useRef<number | null>(null);
  const raf = useRef<number | null>(null);
  const lastTrigger = useRef<boolean>(false);

  useEffect(() => {
    if (trigger && !lastTrigger.current) {
      lastTrigger.current = true;
      setValue(0);
      startTimestamp.current = null;
      
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
      
      function animateCount(timestamp: number) {
        if (!startTimestamp.current) startTimestamp.current = timestamp;
        const progress = Math.min((timestamp - startTimestamp.current) / (duration * 1000), 1);
        const current = end * progress;
        setValue(progress < 1 ? current : end);
        if (progress < 1) {
          raf.current = requestAnimationFrame(animateCount);
        }
      }
      raf.current = requestAnimationFrame(animateCount);
    } else if (!trigger) {
      lastTrigger.current = false;
    }
    
    return () => { 
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
    };
  }, [trigger, end, duration]);

  return (
    <span>
      {value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
};

const AboutUsHeroSection = () => {
  const t = useTranslations('aboutUs');
  const [statsInView, setStatsInView] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stats = [
    {
      icon: <FaRocket className="text-3xl" />,
      number: 3,
      suffix: '+',
      label: t('hero.stats.years') || 'Jaar Ervaring'
    },
    {
      icon: <FaUsers className="text-3xl" />,
      number: 1,
      suffix: '+',
      label: t('hero.stats.clients') || 'Tevreden Klanten'
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      number: 1,
      suffix: '+',
      label: t('hero.stats.servers') || 'Actieve Servers'
    },
    {
      icon: <FaHeart className="text-3xl" />,
      number: 99.9,
      suffix: '%',
      label: t('hero.stats.uptime') || 'Uptime Percentage'
    }
  ];

  // Interactive particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to full section (viewport) width/height
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Responsive particle system
    const getParticleCount = () => {
      const width = window.innerWidth;
      if (width < 768) return 20; // Mobile
      if (width < 1024) return 35; // Tablet
      return 50; // Desktop
    };

    const getConnectionDistance = () => {
      const width = window.innerWidth;
      if (width < 768) return 80; // Mobile
      if (width < 1024) return 120; // Tablet
      return 150; // Desktop
    };

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    const createParticles = () => {
      particles.length = 0; // Clear existing particles
      const count = getParticleCount();
      let minSize = 1, maxSize = 2.5;
      if (window.innerWidth >= 1024) {
        minSize = 3;
        maxSize = 5;
      } else if (window.innerWidth >= 768) {
        minSize = 2;
        maxSize = 4;
      }
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random() * 0.4 + 0.1,
          color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]
        });
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const connectionDistance = getConnectionDistance();

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Draw connections (nu altijd, ook op mobiel)
        particles.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `${particle.color}${Math.floor((0.2 * (1 - distance / connectionDistance)) * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Recreate particles on resize
    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full bg-[var(--color-primary)] pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Interactive Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-quaternary)]/10 text-[var(--color-quinary)] text-sm font-semibold mb-4">
            {t('hero.badge') || 'OVER ONS'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-text-primary)]">
            {t('hero.title') || 'Over CircleLink'} <span className="text-[var(--color-quinary)]">{t('hero.subtitle') || 'Ons Verhaal'}</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-subtle)] max-w-3xl mx-auto mb-8">
            {t('hero.description') || 'Ontdek het verhaal achter CircleLink, waar passie voor technologie samenkomt met toewijding aan klanttevredenheid. Wij zijn meer dan alleen een hosting provider - wij zijn je partner in digitale groei.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" href="#story">
              <span className="flex items-center gap-2"><FaUsers />{t('hero.buttons.ourStory') || 'Ons Verhaal'}</span>
            </Button>
            <Button variant="outline" href="#team">
              <span className="flex items-center gap-2"><FaHeart />{t('hero.buttons.meetTeam') || 'Ontmoet het Team'}</span>
            </Button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setStatsInView(true)}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[var(--color-quinary)] rounded-full mb-3 md:mb-4 text-white group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-lg md:text-3xl">
                    {stat.icon}
                  </div>
                </motion.div>

                <div className="mb-2 flex items-end justify-center gap-1">
                  <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)]">
                    <CountUp end={stat.number} duration={2} decimals={stat.number === 99.9 ? 1 : 0} trigger={statsInView} />
                  </span>
                  <span className="text-lg md:text-2xl lg:text-3xl font-bold text-[var(--color-quinary)]">
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="text-sm md:text-lg font-semibold text-[var(--color-text-primary)]">
                  {stat.label}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission & Vision Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Mission Card */}
          <motion.div
            className="bg-gradient-to-br from-[var(--color-quaternary)]/10 to-[var(--color-quinary)]/10 rounded-2xl p-6 md:p-8 border-2 border-[var(--color-quaternary)]/20 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--color-quaternary)] rounded-full flex items-center justify-center">
                <FaBullseye className="text-white text-lg md:text-xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">
                {t('hero.mission.title') || 'Onze Missie'}
              </h3>
            </div>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('hero.mission.description') || 'Het democratiseren van professionele hosting door betaalbare, betrouwbare en gebruiksvriendelijke oplossingen te bieden voor iedereen.'}
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="bg-gradient-to-br from-[var(--color-quinary)]/10 to-[var(--color-quaternary)]/10 rounded-2xl p-6 md:p-8 border-2 border-[var(--color-quinary)]/20 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--color-quinary)] rounded-full flex items-center justify-center">
                <FaEye className="text-white text-lg md:text-xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">
                {t('hero.vision.title') || 'Onze Visie'}
              </h3>
            </div>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('hero.vision.description') || 'De toonaangevende hosting provider worden die innovatie, klanttevredenheid en technische excellentie combineert.'}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsHeroSection; 