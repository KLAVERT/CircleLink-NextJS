'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Button from '@/components/Button/Button';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';

export default function NotFoundPage() {
  const t = useTranslations('error');
  const locale = useLocale();

  return (
    <AnimatedBackground variant="primary" className="min-h-screen">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t('404.title')}
          </h1>
          <p className="text-lg mb-8">
            {t('404.description')}
          </p>
          <Button 
            href={`/${locale}`}
            variant="primary"
          >
            {t('404.backHome')}
          </Button>
        </div>
      </div>
    </AnimatedBackground>
  );
} 