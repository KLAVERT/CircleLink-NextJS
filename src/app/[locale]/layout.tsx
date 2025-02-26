import "../globals.scss";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Circlelink - VOF',
  description: 'Official website of Circlelink - VOF',
};

const VALID_LOCALES = ['en', 'nl', 'de', 'fr'] as const;
type ValidLocale = typeof VALID_LOCALES[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!VALID_LOCALES.includes(locale as ValidLocale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../public/locales/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return VALID_LOCALES.map(locale => ({ locale }));
} 