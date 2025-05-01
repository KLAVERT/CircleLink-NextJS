import { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

// Configs
const locales = ['nl', 'en', 'de', 'fr', 'es', 'it', 'pt']
const defaultLocale = 'en'

// Initialize both middleware handlers
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
})

export function middleware(request: NextRequest) {
  // First, apply intl middleware for all pages
  const intlResult = intlMiddleware(request)
  if (intlResult) return intlResult

  return null // default passthrough
}

// Combined matcher for both middlewares
export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*|assets|favicon.ico|sw.js).*)',
    '/admin/:path*'
  ]
}
