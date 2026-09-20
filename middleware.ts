import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/|api/).*)"],
};
