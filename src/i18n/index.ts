import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  return {
    messages: (await import(`../../public/locales/nl.json`)).default,
    defaultLocale: 'nl',
    locales: ['en', 'nl']
  };
}); 