import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const middleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'nl'],
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  localeDetection: true
});

export default function(request: NextRequest) {
  // Als de pagina niet bestaat, behoud de huidige taal
  const pathname = request.nextUrl.pathname;
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';

  if (pathname === '/404' || pathname === '/not-found') {
    return NextResponse.redirect(new URL(`/${locale}/404`, request.url));
  }

  return middleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 