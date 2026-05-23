"use client";

import { useState } from "react";

import AuthLayout from "@/layouts/AuthLayout";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  async function handleRegister() {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    alert(data.message);
  }

  return (
    <AuthLayout title="SecureCloud Register">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-lg bg-slate-800 p-3"
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

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

        <select
          className="w-full rounded-lg bg-slate-800 p-3"
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold"
        >
          Register
        </button>
      </div>
    </AuthLayout>
  );
}