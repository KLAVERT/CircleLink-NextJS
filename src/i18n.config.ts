import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales, Locale} from './config/locales';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  try {
    return {
      messages: (await import(`../public/locales/${locale}.json`)).default,
      locale
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }
}); 