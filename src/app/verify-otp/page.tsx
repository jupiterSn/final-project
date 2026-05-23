"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return "";

    return localStorage.getItem("otpEmail") || "";
  });
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setSuccess("Account verified successfully.");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "OTP verification failed";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="text-4xl font-bold">Verify OTP</h1>

        <p className="mt-3 text-slate-400">
          Enter the verification code sent to your email.
        </p>

        {error && (
          <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        <form onSubmit={handleVerify} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              OTP Code
            </label>

            <input
              type="text"
              required
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-blue-500"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already verified?{" "}
          <Link href="/login" className="font-semibold text-blue-400">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
