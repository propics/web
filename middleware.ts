import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Real Next.js 16 uses middleware.ts. proxy.ts keeps the same locale header
  // for environments that still dispatch through that entry.
  const { pathname } = request.nextUrl;
  const locale = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/|api/).*)"],
};
