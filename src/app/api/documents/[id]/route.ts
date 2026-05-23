import { NextResponse } from "next/server";

import { documents } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, { params }: RouteParams) {
  const authUser = getAuthUser(request);

  if (authUser instanceof NextResponse) {
    return authUser;
  }

  if (authUser.role !== "admin") {
    return NextResponse.json(
      { message: "Access denied. Admins only can update documents." },
      { status: 403 }
    );
  }

  const { id } = await params;
  const { title, description, ownerEmail } = await request.json();

  const documentIndex = documents.findIndex((document) => document.id === id);

  if (documentIndex === -1) {
    return NextResponse.json(
      { message: "Document not found" },
      { status: 404 }
    );
  }

  documents[documentIndex] = {
    ...documents[documentIndex],
    title: title ?? documents[documentIndex].title,
    description: description ?? documents[documentIndex].description,
    ownerEmail: ownerEmail ?? documents[documentIndex].ownerEmail,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(
    {
      message: "Document updated successfully",
      document: documents[documentIndex],
    },
    { status: 200 }
  );
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const authUser = getAuthUser(request);

  if (authUser instanceof NextResponse) {
    return authUser;
  }

  if (authUser.role !== "admin") {
    return NextResponse.json(
      { message: "Access denied. Admins only can delete documents." },
      { status: 403 }
    );
  }

  const { id } = await params;

  const documentIndex = documents.findIndex((document) => document.id === id);

  if (documentIndex === -1) {
    return NextResponse.json(
      { message: "Document not found" },
      { status: 404 }
    );
  }

  const deletedDocument = documents.splice(documentIndex, 1)[0];

  return NextResponse.json(
    {
      message: "Document deleted successfully",
      document: deletedDocument,
    },
    { status: 200 }
  );
}