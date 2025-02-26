export const locales = ['nl', 'en', 'de', 'fr'] as const;
export type Locale = typeof locales[number]; 