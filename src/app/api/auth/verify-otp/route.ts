import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createToken } from "@/lib/auth";
import { users } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const user = users.find((currentUser) => currentUser.email === email);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.otp || user.otp !== otp) {
      return NextResponse.json(
        { message: "Invalid OTP code" },
        { status: 401 }
      );
    }

    if (user.otpExpiresAt && Date.now() > user.otpExpiresAt) {
      return NextResponse.json({ message: "OTP expired" }, { status: 401 });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieStore = await cookies();

    cookieStore.set("secureexam_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({
      message: "Verification successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("OTP error:", error);

    return NextResponse.json(
      { message: "OTP verification failed" },
      { status: 500 }
    );
  }
}