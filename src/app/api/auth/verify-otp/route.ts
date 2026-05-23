import { NextResponse } from "next/server";

import { otpRecords } from "@/lib/db";
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
      (record) =>
        record.email === email &&
        record.code === code
    );

    if (!otpRecord) {
      return NextResponse.json(
        { message: "Invalid OTP code" },
        { status: 401 }
      );
    }

    if (isOtpExpired(otpRecord.expiresAt)) {
      return NextResponse.json(
        { message: "OTP code expired" },
        { status: 401 }
      );
    }

    const otpIndex = otpRecords.findIndex(
      (record) =>
        record.email === email &&
        record.code === code
    );

    if (otpIndex !== -1) {
      otpRecords.splice(otpIndex, 1);
    }

    return NextResponse.json(
      {
        message: "OTP verified successfully",
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