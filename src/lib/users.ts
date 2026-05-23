export type Role = "admin" | "user";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;
  otp?: string;
  otpExpiresAt?: number;
};

export const users: StoredUser[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@secureexam.com",
    password: "admin123",
    role: "admin",
    isVerified: true,
  },
];