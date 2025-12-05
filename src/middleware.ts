import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refresh session (penting untuk auto-refresh token)
  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // ============================================
  // DEFINE ROUTES
  // ============================================
  const publicRoutes = ['/signin', '/']
  const protectedRoutes = ['/user', '/dashboard', '/profile']
  const adminRoutes = ['/admin']

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

  // ============================================
  // AUTH LOGIC
  // ============================================

  // 1. User belum login, coba akses protected/admin route
  if (!session && (isProtectedRoute || isAdminRoute)) {
    console.log('No session, redirect to signin')
    return NextResponse.redirect(new URL('/full-width-pages/auth/signin', request.url))
  }

  // 2. User sudah login, coba akses signin page
  if (session && pathname === '/signin') {
    console.log('Already logged in, redirect to dashboard')
    
    // Cek role untuk redirect yang tepat
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else {
      return NextResponse.redirect(new URL('/user', request.url))
    }
  }

  // 3. User login tapi bukan admin, coba akses admin route
  if (session && isAdminRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      console.log(' Not admin, redirect to user dashboard')
      return NextResponse.redirect(new URL('/user', request.url))
    }
  }

  // 4. Allow access
  return response
}

// ============================================
// CONFIG: Routes yang kena middleware
// ============================================
export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public assets (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}