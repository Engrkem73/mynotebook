import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
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
  { params }: RouteContext
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await request.json();

  const notebook = await prisma.notebook.update({
    where: { id: params.id },
    data: {
      title,
      content,
    },
  });

  return NextResponse.json(notebook);
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.notebook.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
}
