import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { ApiRouteContext } from '../../../types';

export async function POST(
  request: NextRequest,
  context: ApiRouteContext
): Promise<NextResponse> {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await request.json();

  const notebook = await prisma.notebook.create({
    data: {
      title,
      content,
      userId: session.user.id,
    },
  });

  return NextResponse.json(notebook, { status: 201 });
}

export async function GET(
  request: NextRequest,
  context: ApiRouteContext
): Promise<NextResponse> {
  return NextResponse.json(null, { status: 405 });
}

export async function HEAD(
  request: NextRequest,
  context: ApiRouteContext
): Promise<NextResponse> {
  return NextResponse.json(null, { status: 405 });
}

export async function PUT(
  request: NextRequest,
  context: ApiRouteContext
): Promise<NextResponse> {
  return NextResponse.json(null, { status: 405 });
}

export async function DELETE(
  request: NextRequest,
  context: ApiRouteContext
): Promise<NextResponse> {
  const session = await auth();
  const params = await context.params;

  if (!params || typeof params.id !== 'string') {
    return NextResponse.json({ message: "Invalid or missing 'id' parameter" }, { status: 400 });
  }

  const { id } = params;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.notebook.delete({
    where: { id },
  });

  return new NextResponse(null, { status: 204 });
}
