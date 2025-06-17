import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROLE_ROUTE_PREFIXES, UNPROTECTED_ROUTES } from "./lib/consts";
import { fetchRoleFromToken, isAuthenticated } from "./lib/authenticate";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = UNPROTECTED_ROUTES.includes(pathname);

  const isAuth = await isAuthenticated(request);
  const role_result = fetchRoleFromToken(request.cookies.get("access_token")?.value!);
  const userRole = role_result.role;

  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");

  // Handle login redirect if already authenticated
  if (pathname === "/login" && isAuth) {
    return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
  }

  // Handle unauthenticated access to protected routes
  if (!isPublicPath && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle role-based access control
  if (isAuth && !isPublicPath) {
    // Check if the path starts with a role-specific prefix
    const pathPrefix = ROLE_ROUTE_PREFIXES.find(prefix => pathname.startsWith(prefix));

    if (pathPrefix) {
      // Extract the role from the path prefix
      const requiredRole = pathPrefix.substring(1); // Remove the leading slash

      // If the user's role doesn't match the required role, redirect to access denied
      if (userRole !== requiredRole) {
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.png|site.webmanifest|Images|icon-512.png|signin).*)",
  ],
};
