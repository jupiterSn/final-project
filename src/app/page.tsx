import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Secure Authentication Platform
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
            SecureExam Portal
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300 md:text-xl">
            A secure online examination system built with Next.js,
            authentication, authorization, OTP verification, JWT security,
            protected routes, and role-based access control.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-slate-700 px-8 py-4 text-lg font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="mt-24 grid w-full max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-left">
            <h3 className="text-xl font-bold text-white">
              Authentication
            </h3>

            <p className="mt-4 text-slate-400">
              Secure login and registration system with hashed passwords and
              JWT-based authentication.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-left">
            <h3 className="text-xl font-bold text-white">
              OTP Verification
            </h3>

            <p className="mt-4 text-slate-400">
              Real email verification using one-time passwords for account
              protection and identity confirmation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-left">
            <h3 className="text-xl font-bold text-white">
              Authorization
            </h3>

            <p className="mt-4 text-slate-400">
              Role-based access control for Admin and User dashboards with
              protected routes and permissions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}