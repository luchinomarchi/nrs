import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Permitir acesso à página inicial e páginas públicas
  const publicPaths = ['/', '/login', '/register', '/about', '/forgot', '/reset']
  const { pathname } = request.nextUrl

  // Se for uma rota pública, permitir acesso
  if (publicPaths.includes(pathname) || pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Para outras rotas, continuar normalmente
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}