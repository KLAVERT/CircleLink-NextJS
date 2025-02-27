export const locales = ['nl', 'en', 'de', 'fr', 'es', 'it'] as const;
export type Locale = typeof locales[number]; 