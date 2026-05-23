"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/layouts/DashboardLayout";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

type CloudDocument = {
  id: string;
  title: string;
  description: string;
  ownerEmail: string;
  createdAt: string;
  updatedAt: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [documents, setDocuments] = useState<CloudDocument[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ownerEmail: "",
  });

  const user = useMemo<User | null>(() => {
    if (typeof window === "undefined") return null;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    return JSON.parse(storedUser);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    async function fetchDocuments() {
      const response = await fetch("/api/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setDocuments(data.documents);
      } else {
        alert(data.message);
      }
    }

    fetchDocuments();
  }, [router, user]);

  async function handleCreateDocument() {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      setDocuments((previousDocuments) => [
        ...previousDocuments,
        data.document,
      ]);

      setFormData({
        title: "",
        description: "",
        ownerEmail: "",
      });
    }
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading dashboard...
      </main>
    );
  }

  return (
    <DashboardLayout userName={user.name} role={user.role}>
      <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-2 text-2xl font-bold">
          {user.role === "admin" ? "Admin Panel" : "User Portal"}
        </h2>

        <p className="text-slate-400">
          {user.role === "admin"
            ? "Admin can create, view, update, and delete cloud documents."
            : "User can only view assigned cloud documents."}
        </p>
      </section>

      {user.role === "admin" && (
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-2xl font-bold">Create Cloud Document</h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Document title"
              value={formData.title}
              className="rounded-lg bg-slate-800 p-3"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Document description"
              value={formData.description}
              className="rounded-lg bg-slate-800 p-3"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Owner email"
              value={formData.ownerEmail}
              className="rounded-lg bg-slate-800 p-3"
              onChange={(e) =>
                setFormData({ ...formData, ownerEmail: e.target.value })
              }
            />

            <button
              onClick={handleCreateDocument}
              className="rounded-lg bg-blue-600 p-3 font-semibold"
            >
              Create Document
            </button>
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl font-bold">Cloud Documents</h2>

        <div className="grid gap-4">
          {documents.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
              No documents found.
            </div>
          ) : (
            documents.map((document) => (
              <article
                key={document.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <h3 className="text-xl font-bold">{document.title}</h3>
                <p className="mt-2 text-slate-300">{document.description}</p>

                <div className="mt-4 text-sm text-slate-500">
                  <p>Owner: {document.ownerEmail}</p>
                  <p>
                    Created: {new Date(document.createdAt).toLocaleString()}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}