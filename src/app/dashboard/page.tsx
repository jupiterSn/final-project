"use client";

import { useEffect, useMemo, useState } from "react";

type Role = "admin" | "user";

type DocumentStatus = "Pending" | "Approved" | "Rejected";

type DocumentItem = {
  id: number;
  title: string;
  owner: string;
  assignedTo: string;
  status: DocumentStatus;
};

const STORAGE_KEY = "securecloud_documents";

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    title: "Cloud Security Report",
    owner: "Admin",
    assignedTo: "user@example.com",
    status: "Pending",
  },
  {
    id: 2,
    title: "JWT Authentication Notes",
    owner: "Admin",
    assignedTo: "user@example.com",
    status: "Approved",
  },
];

function getStoredDocuments(): DocumentItem[] {
  if (typeof window === "undefined") {
    return initialDocuments;
  }

  const savedDocuments = localStorage.getItem(STORAGE_KEY);

  if (!savedDocuments) {
    return initialDocuments;
  }

  return JSON.parse(savedDocuments) as DocumentItem[];
}

export default function DashboardPage() {
  const [role, setRole] = useState<Role>("admin");
  const [documents, setDocuments] =
    useState<DocumentItem[]>(getStoredDocuments);

  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState<DocumentStatus>("Pending");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  const visibleDocuments = useMemo(() => {
    if (role === "admin") return documents;

    return documents.filter(
      (document) => document.assignedTo === "user@example.com"
    );
  }, [documents, role]);

  function resetForm() {
    setTitle("");
    setAssignedTo("");
    setStatus("Pending");
    setEditingId(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !assignedTo.trim()) return;

    if (editingId !== null) {
      setDocuments((prevDocuments) =>
        prevDocuments.map((document) =>
          document.id === editingId
            ? {
                ...document,
                title,
                assignedTo,
                status,
              }
            : document
        )
      );
    } else {
      const newDocument: DocumentItem = {
        id: Date.now(),
        title,
        owner: "Admin",
        assignedTo,
        status,
      };

      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
    }

    resetForm();
  }

  function handleEdit(document: DocumentItem) {
    setEditingId(document.id);
    setTitle(document.title);
    setAssignedTo(document.assignedTo);
    setStatus(document.status);
  }

  function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    setDocuments((prevDocuments) =>
      prevDocuments.filter((document) => document.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold text-slate-900">
            SecureCloud Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Manage secure documents with role-based access.
          </p>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`rounded-lg px-4 py-2 font-medium ${
                role === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              Admin View
            </button>

            <button
              type="button"
              onClick={() => setRole("user")}
              className={`rounded-lg px-4 py-2 font-medium ${
                role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              User View
            </button>
          </div>
        </div>

        {role === "admin" && (
          <div className="mb-8 rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              {editingId ? "Edit Document" : "Add New Document"}
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
              <input
                type="text"
                placeholder="Document title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="email"
                placeholder="Assign to user email"
                value={assignedTo}
                onChange={(event) => setAssignedTo(event.target.value)}
                className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as DocumentStatus)
                }
                className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                  {editingId ? "Save" : "Add"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-lg bg-slate-200 px-5 py-3 font-medium text-slate-700 hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            {role === "admin" ? "All Documents" : "Assigned Documents"}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-700">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Assigned To</th>
                  <th className="px-4 py-3">Status</th>
                  {role === "admin" && <th className="px-4 py-3">Actions</th>}
                </tr>
              </thead>

              <tbody>
                {visibleDocuments.map((document) => (
                  <tr key={document.id} className="border-b">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {document.title}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {document.owner}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {document.assignedTo}
                    </td>

                    <td className="px-4 py-3">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                        {document.status}
                      </span>
                    </td>

                    {role === "admin" && (
                      <td className="space-x-2 px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleEdit(document)}
                          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(document.id)}
                          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}

                {visibleDocuments.length === 0 && (
                  <tr>
                    <td
                      colSpan={role === "admin" ? 5 : 4}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}