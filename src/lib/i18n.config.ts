export const defaultLocale = 'nl';
export const locales = ['en', 'nl'] as const;

export type Locale = (typeof locales)[number]; 