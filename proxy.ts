import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export default proxy;
