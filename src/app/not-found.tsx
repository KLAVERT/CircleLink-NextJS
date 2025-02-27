import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootNotFound() {
  // Detecteer de taal van de Accept-Language header
  const acceptLanguage = (await headers()).get('accept-language') || '';
  // const preferredLocale = acceptLanguage.includes('nl') ? 'nl' : 'en' : 'de' : 'fr';
  const locales = ['nl', 'en', 'de', 'fr', 'es', 'it'];
  const preferredLocale = locales.find(lang => acceptLanguage.includes(lang)) || 'en';
  
  // Redirect naar de root van de juiste taal
  redirect(`/${preferredLocale}/404`);
} 