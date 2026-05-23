"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

type Exam = {
  id: number;
  title: string;
  subject: string;
  duration: string;
};

const initialExams: Exam[] = [
  {
    id: 1,
    title: "Web Security Basics",
    subject: "Cybersecurity",
    duration: "30 minutes",
  },
  {
    id: 2,
    title: "Authentication and Authorization",
    subject: "Web Development",
    duration: "45 minutes",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const response = await fetch("/api/auth/me");

      if (!response.ok) {
        router.push("/login");
        return;
      }

      const data = await response.json();
      setUser(data.user);
      setLoading(false);
    }

    loadUser();
  }, [router]);

  function resetForm() {
    setTitle("");
    setSubject("");
    setDuration("");
    setEditingId(null);
  }

  function handleSaveExam(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || !subject || !duration) return;

    if (editingId) {
      setExams((prev) =>
        prev.map((exam) =>
          exam.id === editingId ? { ...exam, title, subject, duration } : exam
        )
      );
    } else {
      setExams((prev) => [
        ...prev,
        {
          id: Date.now(),
          title,
          subject,
          duration,
        },
      ]);
    }

    resetForm();
  }

  function handleEditExam(exam: Exam) {
    setEditingId(exam.id);
    setTitle(exam.title);
    setSubject(exam.subject);
    setDuration(exam.duration);
  }

  function handleDeleteExam(id: number) {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm uppercase tracking-wide text-blue-400">
              SecureExam Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </h1>

            <p className="mt-2 text-slate-400">
              Logged in as {user?.name} — {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {user?.role === "admin" && (
          <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-5 text-2xl font-bold">
              {editingId ? "Edit Exam" : "Create Exam"}
            </h2>

            <form onSubmit={handleSaveExam} className="grid gap-4 md:grid-cols-4">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Exam title"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Subject"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                placeholder="Duration"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
              >
                {editingId ? "Save Changes" : "Add Exam"}
              </button>
            </form>
          </div>
        )}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-5 text-2xl font-bold">
            {user?.role === "admin" ? "Manage Exams" : "Available Exams"}
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
              >
                <h3 className="text-xl font-bold">{exam.title}</h3>
                <p className="mt-2 text-slate-400">Subject: {exam.subject}</p>
                <p className="mt-1 text-slate-400">Duration: {exam.duration}</p>

                {user?.role === "admin" ? (
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => handleEditExam(exam)}
                      className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold hover:bg-emerald-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700">
                    Start Exam
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}