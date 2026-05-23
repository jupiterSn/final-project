import type { AppUser, LoginPayload, RegisterPayload, VerifyOtpPayload } from "@/types";

type AuthResponse = {
  message: string;
  token?: string;
  user?: AppUser;
};

async function postAuth<TPayload>(url: string, payload: TPayload): Promise<AuthResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export function login(payload: LoginPayload) {
  return postAuth("/api/auth/login", payload);
}

export function register(payload: RegisterPayload) {
  return postAuth("/api/auth/register", payload);
}

export function sendOtp(email: string) {
  return postAuth("/api/auth/send-otp", { email });
}

export function verifyOtp(payload: VerifyOtpPayload) {
  return postAuth("/api/auth/verify-otp", payload);
}
