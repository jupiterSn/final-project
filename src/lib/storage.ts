import type { AppUser } from "@/types";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const OTP_EMAIL_KEY = "otpEmail";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getStoredToken() {
  if (!canUseStorage()) return null;

  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AppUser | null {
  if (!canUseStorage()) return null;

  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function setAuthStorage(token: string, user: AppUser) {
  if (!canUseStorage()) return;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function setOtpEmail(email: string) {
  if (!canUseStorage()) return;

  localStorage.setItem(OTP_EMAIL_KEY, email);
}

export function getOtpEmail() {
  if (!canUseStorage()) return null;

  return localStorage.getItem(OTP_EMAIL_KEY);
}

export function clearAuthStorage() {
  if (!canUseStorage()) return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(OTP_EMAIL_KEY);
}
