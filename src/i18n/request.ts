import { getRequestConfig } from 'next-intl/server';
import { locales } from '../../config';

export default getRequestConfig(async (params) => {
  // Cast 'params' zodat headers als een Headers-object kunnen worden aangesproken
  const headers = (params as { headers?: Headers }).headers;
  const acceptLanguage = headers && typeof headers.get === 'function'
    ? headers.get('accept-language') || 'en'
    : 'en';
  const locale = acceptLanguage.split(',')[0];

  return {
    messages: (await import(`../../public/locales/${locale}.json`)).default,
    defaultLocale: 'en',
    locales,
    locale,
  };
}); 