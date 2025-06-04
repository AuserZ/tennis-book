import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ["/dashboard", "/my-bookings"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Auth routes
  const authRoutes = ["/login", "/register"]
  const isAuthRoute = authRoutes.includes(pathname)

  // For demo purposes, we'll handle auth checks on the client side
  // since we're using localStorage for JWT tokens

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-bookings/:path*", "/login", "/register"],
}
