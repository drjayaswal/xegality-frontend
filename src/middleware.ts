import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { UNPROTECTED_ROUTES } from "./lib/consts";
import { isAuthenticated } from "./lib/authenticate";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = UNPROTECTED_ROUTES.includes(pathname);
  const isAuth = await isAuthenticated(request);
  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");

  if (pathname === "/login" && isAuth.atoken && isAuth.rtoken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!isPublicPath && !isAuth.atoken && !isAuth.rtoken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.png|site.webmanifest|Images|icon-512.png|signin).*)",
  ],
};
