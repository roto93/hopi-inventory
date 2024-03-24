// https://nextjs.org/docs/app/building-your-application/routing/middleware
// https://stackoverflow.com/questions/77923916/verify-if-user-is-logged-in-in-nextjs-when-using-express-as-backend

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes('.')) return NextResponse.next()

  const cookieHeader = request.headers.get("cookie")
  if (cookieHeader === null) return

  // Make a request to the authentication endpoint
  const authResponse = await (await fetch(`http://localhost:3333/auth/testPrivate`, {
    headers: {
      Cookie: cookieHeader, // Forward the cookie to the backend
    },
  })).json()

  // 
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register') ||
    request.nextUrl.pathname === '/'
  ) {
    return authResponse.status === 'Success'
      ? NextResponse.redirect(new URL("/user", request.nextUrl.origin))
      : NextResponse.next()
  }

  return authResponse.status !== 'Success'
    ? NextResponse.redirect(new URL("/", request.nextUrl.origin))
    : NextResponse.next()
}

export const config = {
  // matcher: ['/user/:path*', '/event/:path*'],
}