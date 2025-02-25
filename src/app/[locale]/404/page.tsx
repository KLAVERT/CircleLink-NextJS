'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('error');
  const locale = useLocale();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--background)]">
      <h1 className="text-4xl font-bold mb-4">
        {t('404.title')}
      </h1>
      <p className="text-lg mb-8">
        {t('404.description')}
      </p>
      <Link 
        href={`/${locale}`}
        className="px-6 py-3 bg-[var(--highlight)] text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        {t('404.backHome')}
      </Link>
    </div>
  );
} 