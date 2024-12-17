import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

// Use this to access params properly
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;

  const notebook = await prisma.notebook.findUnique({
    where: { id: params.id },
  });

  if (!notebook) {
    return NextResponse.json({ message: "Notebook not found" }, { status: 404 });
  }

  return NextResponse.json(notebook);
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { params } = context;
  const { title, content } = await request.json();

  const notebook = await prisma.notebook.update({
    where: { id: params.id },
    data: { title, content },
  });

  return NextResponse.json(notebook);
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { params } = context;

  await prisma.notebook.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
}
