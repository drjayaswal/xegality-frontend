import type { NextRequest } from "next/server";

export async function isAuthenticated(request: NextRequest) {
  const atoken = request.cookies.get("access_token")?.value;
  const rtoken = request.cookies.get("refresh_token")?.value;
  return { atoken, rtoken };
}
