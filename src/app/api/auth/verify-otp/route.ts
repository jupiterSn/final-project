import { NextResponse } from "next/server";

import { createToken } from "@/lib/auth";
import { users } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    const user = users.find(
      (currentUser) => currentUser.email === email
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.otp || user.otp !== otp) {
      return NextResponse.json(
        { message: "Invalid OTP code" },
        { status: 401 }
      );
    }

    if (
      user.otpExpiresAt &&
      Date.now() > user.otpExpiresAt
    ) {
      return NextResponse.json(
        { message: "OTP expired" },
        { status: 401 }
      );
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      message: "Verification successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "OTP verification failed" },
      { status: 500 }
    );
  }
}