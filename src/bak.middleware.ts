import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROLE_ROUTE_PREFIXES, UNPROTECTED_ROUTES } from "./lib/consts";
import { fetchRoleFromToken, isAuthenticated } from "./lib/authenticate";

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const isPublicPath = UNPROTECTED_ROUTES.includes(pathname);

    // Check auth
    const isAuth = await isAuthenticated(request);

    // Try to extract role from token
    const token = request.cookies.get("access_token")?.value;
    let userRole: string | null = null;

    if (token) {
      try {
        const roleResult = fetchRoleFromToken(token);
        userRole = roleResult?.role ?? null;
      } catch (err) {
        console.error("[MIDDLEWARE] Failed to parse token:", err);
      }
    }

    const response = NextResponse.next();
    response.headers.set("x-middleware-cache", "no-cache");

    // 1. Redirect logged-in users away from /login
    if (pathname === "/login" && isAuth && userRole) {
      return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }

    // 2. Block access to protected routes if not authenticated
    if (!isPublicPath && !isAuth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. Role-based access control
    if (isAuth && !isPublicPath && userRole) {
      const pathPrefix = ROLE_ROUTE_PREFIXES.find((prefix) =>
        pathname.startsWith(prefix)
      );

      if (pathPrefix) {
        const requiredRole = pathPrefix.substring(1); // e.g. /lawyer => "lawyer"
        if (userRole !== requiredRole) {
          return NextResponse.redirect(new URL("/access-denied", request.url));
        }
      }
    }

    return response;
  } catch (err) {
    console.error("[MIDDLEWARE] Unexpected error:", err);
    return NextResponse.redirect(new URL("/error", request.url)); // Optional fallback
  }
}
export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.png|site.webmanifest|Images|icon-512.png|signin).*)",
  ],
};
