"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLayout from "@/layouts/AuthLayout";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      localStorage.setItem("otpEmail", formData.email);

      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      router.push("/verify-otp");
    }
  }

  return (
    <AuthLayout title="SecureCloud Login">
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg bg-slate-800 p-3"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg bg-slate-800 p-3"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold"
        >
          Login & Send OTP
        </button>
      </div>
    </AuthLayout>
  );
}