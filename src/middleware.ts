import { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
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

const authMiddleware = withAuth({
  pages: {
    signIn: '/login'
  }
})

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // First, apply intl middleware for all pages
  const intlResult = intlMiddleware(request)
  if (intlResult) return intlResult

  // Then apply auth only to /admin pages
  if (pathname.startsWith('/admin')) {
    return authMiddleware(request)
  }

  return null // default passthrough
}

// Combined matcher for both middlewares
export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*|assets|favicon.ico|sw.js).*)',
    '/admin/:path*'
  ]
}
