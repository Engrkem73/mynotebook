import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Notebook {
  title: string;
  content: string;
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();

  const notebook = await prisma.notebook.create({
    data: {
      title,
      content,
      userId: session.user.id,
    },
  });

  return NextResponse.json(notebook, { status: 201 });
}

export async function GET(req: NextRequest) {
  return NextResponse.json(null, { status: 405 });
}

export async function HEAD(req: NextRequest) {
  return NextResponse.json(null, { status: 405 });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json(null, { status: 405 });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json(null, { status: 405 });
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json(null, { status: 405 });
}

export async function PATCH(req: NextRequest) {
  return NextResponse.json(null, { status: 405 });
}
