import type { UserRole } from "./user";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type JwtPayload = {
  userId: string;
  email: string;
  role: UserRole;
};

export type OtpRecord = {
  email: string;
  code: string;
  expiresAt: number;
};