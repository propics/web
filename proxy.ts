import { NextRequest, NextResponse } from "next/server";

// Next.js 16.2 treats proxy.ts as the request interceptor (middleware.ts is
// rejected if both files exist). Same locale header as the previous middleware.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export default proxy;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/|api/).*)"],
};
