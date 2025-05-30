import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

// const intlMiddleware = createMiddleware(routing);

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
