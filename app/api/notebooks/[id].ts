import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const notebook = await prisma.notebook.findUnique({
    where: { id: params.id },
  });

  if (!notebook) {
    return NextResponse.json({ message: "Notebook not found" }, { status: 404 });
  }

  return NextResponse.json(notebook);
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();

  const updatedNotebook = await prisma.notebook.update({
    where: { id: params.id },
    data: { title, content },
  });

  return NextResponse.json(updatedNotebook);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.notebook.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Notebook deleted" });
}