import { NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";
import type { JwtPayload } from "@/types/auth";

export function authMiddleware(request: Request): JwtPayload | NextResponse {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token is missing" },
      { status: 401 }
    );
  }

  try {
    return verifyToken(authHeader.split(" ")[1]);
  } catch {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
