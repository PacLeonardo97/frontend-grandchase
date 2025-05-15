import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pt', 'pt-br', 'en', 'de'],

  // Used when no locale matches
  defaultLocale: 'pt',
});
