import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

import type { JwtPayload } from "@/types/auth";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "fallback_secret_key";

const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h";

export function createToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}