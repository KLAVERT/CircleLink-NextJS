export const locales = ['en', 'nl', 'de', 'fr', 'es'] as const;
export type Locale = typeof locales[number]; 