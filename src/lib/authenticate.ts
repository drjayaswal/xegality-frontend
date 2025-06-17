import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  return !!token;
}


export function fetchRoleFromToken(token: string) {
  try {
    const decoded = jwt.decode(token) as { id: string, role: string, iat: number, exp: number }
    return { success: true, message: "Valid Token", role: decoded.role };
  }
  catch (error) {
    return { success: false, message: "Invalid token" };
  }

}


