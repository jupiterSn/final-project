import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type JwtUser = {
  id: string;
  email: string;
  role: "admin" | "user";
};

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_later";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function createToken(user: JwtUser) {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUser;
  } catch {
    return null;
  }
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}