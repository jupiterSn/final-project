import { NextResponse } from "next/server";

import { generateOtp, hashPassword } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/mail";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { users } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { name, email, password, turnstileToken } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const isHuman = await verifyTurnstileToken(turnstileToken);

    if (!isHuman) {
      return NextResponse.json(
        { message: "Cloudflare verification failed. Please try again." },
        { status: 403 }
      );
    }

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered. Please login or verify OTP." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const otp = generateOtp();

    await sendOtpEmail(email, otp);

    users.push({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
      otp,
      otpExpiresAt: Date.now() + 5 * 60 * 1000,
    });

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
      {
        message:
          error instanceof Error ? error.message : "Registration failed.",
      },
      { status: 500 }
    );
  }
}
