"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  userName: string;
  role: "admin" | "user";
};

export default function DashboardLayout({
  children,
  userName,
  role,
}: DashboardLayoutProps) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("otpEmail");

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold text-blue-400">SecureCloud</h1>

        <p className="mt-2 text-sm text-slate-400">
          Secure Document Platform
        </p>

        <nav className="mt-10 space-y-3">
          <div className="rounded-lg bg-slate-800 px-4 py-3">
            Dashboard
          </div>

          <div className="rounded-lg px-4 py-3 text-slate-400">
            Documents
          </div>

          <div className="rounded-lg px-4 py-3 text-slate-400">
            Security Logs
          </div>
        </nav>
      </aside>

      <section className="ml-64">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">
          <div>
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <p className="text-sm text-slate-400">
              Welcome, {userName} • {role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold"
          >
            Logout
          </button>
        </header>

        <div className="p-8">{children}</div>
      </section>
    </main>
  );
}