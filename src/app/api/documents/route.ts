import { NextResponse } from "next/server";

import { documents } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import type { CloudDocument } from "@/types/document";

export async function GET(request: Request) {
  const authUser = getAuthUser(request);

  if (authUser instanceof NextResponse) {
    return authUser;
  }

  if (authUser.role === "admin") {
    return NextResponse.json(
      {
        message: "Documents fetched successfully",
        documents,
      },
      { status: 200 }
    );
  }

  const userDocuments = documents.filter(
    (document) => document.ownerEmail === authUser.email
  );

  return NextResponse.json(
    {
      message: "User documents fetched successfully",
      documents: userDocuments,
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const authUser = getAuthUser(request);

  if (authUser instanceof NextResponse) {
    return authUser;
  }

  if (authUser.role !== "admin") {
    return NextResponse.json(
      { message: "Access denied. Admins only can create documents." },
      { status: 403 }
    );
  }

  const { title, description, ownerEmail } = await request.json();

  if (!title || !description || !ownerEmail) {
    return NextResponse.json(
      { message: "Title, description, and owner email are required" },
      { status: 400 }
    );
  }

  const newDocument: CloudDocument = {
    id: crypto.randomUUID(),
    title,
    description,
    ownerEmail,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  documents.push(newDocument);

  return NextResponse.json(
    {
      message: "Document created successfully",
      document: newDocument,
    },
    { status: 201 }
  );
}