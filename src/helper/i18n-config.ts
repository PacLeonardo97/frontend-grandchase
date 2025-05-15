export const i18n = {
    defaultLocale: 'br',
    locales: ['br','en', 'de', 'cs'],
} as const;

export type Locale = typeof i18n['locales'][number];