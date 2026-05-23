import { NextResponse } from "next/server";

import { generateOtp, hashPassword } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/mail";
import { users } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const otp = generateOtp();

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: "user" as const,
      isVerified: false,
      otp,
      otpExpiresAt: Date.now() + 5 * 60 * 1000,
    };

    users.push(newUser);

    await sendOtpEmail(email, otp);

    return NextResponse.json(
      {
        message: "Registration successful. OTP sent to email.",
        email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}