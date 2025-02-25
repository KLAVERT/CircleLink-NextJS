'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('error');
  const locale = useLocale();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-text">
      <h1 className="text-4xl font-bold mb-4">
        {t('404.title')}
      </h1>
      <p className="text-lg mb-8 opacity-90">
        {t('404.description')}
      </p>
      <Link 
        href={`/${locale}`}
        className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        {t('404.backHome')}
      </Link>
    </div>
  );
} 