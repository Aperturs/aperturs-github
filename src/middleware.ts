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

  if (
    !(
      request.cookies.get(COOKIES.SESSION_ID) &&
      request.cookies.get(COOKIES.USER_ID)
    )
  ) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ],
};
