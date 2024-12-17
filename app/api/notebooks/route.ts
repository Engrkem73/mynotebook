import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET() {
  return NextResponse.json(null, { status: 405 });
}

export async function HEAD() {
  return NextResponse.json(null, { status: 405 });
}

export async function PUT() {
  return NextResponse.json(null, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json(null, { status: 405 });
}

export async function OPTIONS() {
  return NextResponse.json(null, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json(null, { status: 405 });
}
