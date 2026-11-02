import { NextRequest, NextResponse } from "next/server";

// Pass the resolved locale as a request header so Server Components render the
// correct <html lang> and direction on the initial response.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export default proxy;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/|api/).*)"],
};
