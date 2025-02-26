export const defaultLocale = 'nl';
export const locales = ['en', 'nl', 'de', 'fr'] as const;

export type Locale = (typeof locales)[number]; 