export const locales = ['nl', 'en', 'de', 'fr', 'es', 'it', 'pt'] as const;
export type Locale = typeof locales[number]; 