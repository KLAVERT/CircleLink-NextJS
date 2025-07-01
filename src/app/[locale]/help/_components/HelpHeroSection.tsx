import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import Button from '@/components/Button/Button';

interface HelpHeroSectionProps {
  badge?: string;
  titleMain: string;
  titleAccent: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

const HelpHeroSection: React.FC<HelpHeroSectionProps> = ({
  badge = 'HELP',
  titleMain,
  titleAccent,
  subtitle,
  description,
  buttonText,
  buttonHref,
  secondaryButtonText = "Bekijk alle video's",
  secondaryButtonHref = '#videos',
}) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground variant="primary" className="fixed inset-0 w-screen h-screen z-0">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center min-h-screen justify-center">
          <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
            {badge && (
              <span className="inline-block px-4 py-1 rounded-full bg-[var(--color-quaternary)] text-white text-xs font-bold tracking-widest uppercase shadow mb-2">
                {badge}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-2">
              <span className="text-[var(--color-text-primary)]">{titleMain} </span>
              <span className="text-[var(--color-quinary)]">{titleAccent}</span>
            </h1>
            {subtitle && (
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-subtle)]">
                {subtitle}
              </h2>
            )}
            {description && (
              <p className="text-lg md:text-xl text-[var(--color-text-subtle)] max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button variant="primary" href={buttonHref || '/contact'}>
              {buttonText}
            </Button>
            <Button variant="outline" href={secondaryButtonHref}>
              {secondaryButtonText}
            </Button>
          </div>
        </div>
      </AnimatedBackground>
    </div>
  );
};

export default HelpHeroSection; 