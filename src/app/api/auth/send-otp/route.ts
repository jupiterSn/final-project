import { NextResponse } from "next/server";

import { otpRecords, users } from "@/lib/db";
import { generateOtp, getOtpExpiry } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const existingUser = users.find((user) => user.email === email);

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const code = generateOtp();
    const expiresAt = getOtpExpiry(5);

    const oldOtpIndex = otpRecords.findIndex(
      (record) => record.email === email
    );

    if (oldOtpIndex !== -1) {
      otpRecords.splice(oldOtpIndex, 1);
    }

    otpRecords.push({
      email,
      code,
      expiresAt,
    });

    console.log(`OTP for ${email}: ${code}`);

    return NextResponse.json(
      {
        message: "OTP sent successfully",
        note: "For now, check the terminal console for the OTP code.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send OTP error:", error);

    return NextResponse.json(
      { message: "Something went wrong while sending OTP" },
      { status: 500 }
    );
  }
}