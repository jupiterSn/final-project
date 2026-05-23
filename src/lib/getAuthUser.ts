import { NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";
import type { JwtPayload } from "@/types/auth";

export function getAuthUser(request: Request): JwtPayload | NextResponse {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token is missing" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    return verifyToken(token);
  } catch {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}