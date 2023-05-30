import { COOKIES } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
    throw Error("NEXT_PUBLIC_APPWRITE_ENDPOINT ENV NOT FOUND");
  }
  if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECTID) {
    throw Error("NEXT_PUBLIC_APPWRITE_PROJECTID Env not found");
  }
  const url = request.nextUrl.clone();

  const isLoggedIn = (
    request.cookies.get(COOKIES.SESSION_ID) &&
    request.cookies.get(COOKIES.USER_ID)
  );

  if (!isLoggedIn) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    // Allow access to /login and /signup when not logged in
    if (
      !request.nextUrl.pathname.startsWith("/login") &&
      !request.nextUrl.pathname.startsWith("/signup")
    ) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } else {
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup")
    ) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};