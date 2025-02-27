export const locales = ['en', 'nl', 'de', 'fr', 'es', 'it', 'pt'] as const;
export type Locale = typeof locales[number]; 