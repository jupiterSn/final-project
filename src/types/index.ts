export type { LoginRequest as LoginPayload, RegisterRequest as RegisterPayload } from "./auth";
export type { CloudDocument } from "./document";
export type { User as AppUser } from "./user";

export type VerifyOtpPayload = {
  email: string;
  code: string;
};

export type Exam = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
};
