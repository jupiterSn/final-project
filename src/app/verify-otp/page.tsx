"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthLayout from "@/layouts/AuthLayout";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [code, setCode] = useState("");

  async function handleVerifyOtp() {
    const email = localStorage.getItem("otpEmail");

    if (!email) {
      alert("No email found. Please login again.");
      return;
    }

    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      router.push("/dashboard");
    }
  }

  return (
    <AuthLayout title="Verify OTP">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP Code"
          className="w-full rounded-lg bg-slate-800 p-3 text-center tracking-[10px]"
          maxLength={6}
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
        />

        <button
          onClick={handleVerifyOtp}
          className="w-full rounded-lg bg-green-600 p-3 font-semibold"
        >
          Verify OTP
        </button>
      </div>
    </AuthLayout>
  );
}