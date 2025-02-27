export const locales = ['en', 'nl', 'de', 'fr', 'es', 'it'] as const;
export type Locale = typeof locales[number]; 