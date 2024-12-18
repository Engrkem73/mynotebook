import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ApiRouteContext } from '../../../types';

export async function GET(
  _request: NextRequest,
  context: ApiRouteContext
) {
  const {id} = await context.params;
  const notebook = await prisma.notebook.findUnique({
    where: { id },
  });

  if (!notebook) {
    return NextResponse.json({ message: "Notebook not found" }, { status: 404 });
  }

  return NextResponse.json(notebook);
}



export async function PUT(req: NextRequest, context: ApiRouteContext) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const { title, content } = await req.json();

  const updatedNotebook = await prisma.notebook.update({
    where: { id },
    data: { title, content },
  });

  return NextResponse.json(updatedNotebook);
}

export async function DELETE(_req: NextRequest, context: ApiRouteContext) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await prisma.notebook.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Notebook deleted" });
}