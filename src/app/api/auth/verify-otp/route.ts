import { NextResponse } from "next/server";

import { otpRecords, users } from "@/lib/db";
import { createToken } from "@/lib/jwt";
import { isOtpExpired } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and OTP code are required" },
        { status: 400 }
      );
    }

    const otpRecord = otpRecords.find(
      (record) => record.email === email && record.code === code
    );

    if (!otpRecord) {
      return NextResponse.json({ message: "Invalid OTP code" }, { status: 401 });
    }

    if (isOtpExpired(otpRecord.expiresAt)) {
      return NextResponse.json({ message: "OTP code expired" }, { status: 401 });
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otpIndex = otpRecords.findIndex(
      (record) => record.email === email && record.code === code
    );

    if (otpIndex !== -1) {
      otpRecords.splice(otpIndex, 1);
    }

    const token = createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      {
        message: "OTP verified successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify OTP error:", error);

    return NextResponse.json(
      { message: "Something went wrong during OTP verification" },
      { status: 500 }
    );
  }
}