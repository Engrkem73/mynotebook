import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { type NextRequest } from "next/server";
import { ApiRouteContext } from '../../../../types';

export async function GET(
  request: NextRequest,
  context: ApiRouteContext
): Promise<Response> {
  const { id } = await context.params;
  const notebook = await prisma.notebook.findUnique({
    where: { id },
  });

  if (!notebook) {
    return Response.json({ message: "Notebook not found" }, { status: 404 });
  }

  return Response.json(notebook);
}

export async function PUT(
  request: NextRequest,
  context: ApiRouteContext
): Promise<Response> {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const { title, content } = await request.json();

  const notebook = await prisma.notebook.update({
    where: { id },
    data: { title, content },
  });

  return Response.json(notebook);
}

export async function DELETE(
  request: NextRequest,
  context: ApiRouteContext
): Promise<Response> {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await prisma.notebook.delete({
    where: { id },
  });

  return new Response(null, { status: 204 });
}
