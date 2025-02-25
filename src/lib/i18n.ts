import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const locale = headersList.get('X-NEXT-INTL-LOCALE') || 'nl';

  return {
    locale,
    messages: (await import(`../../public/locales/${locale}.json`)).default,
    defaultLocale: 'nl',
    locales: ['en', 'nl']
  };
}); 