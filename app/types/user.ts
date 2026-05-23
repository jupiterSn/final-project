export type UserRole = "admin" | "user";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // stored as hashed password, never plain text
  role: UserRole;
  createdAt: string;
};