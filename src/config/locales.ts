export const locales = ['nl', 'en', 'de', 'fr', 'es'] as const;
export type Locale = typeof locales[number]; 