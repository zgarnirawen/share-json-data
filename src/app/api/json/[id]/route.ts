import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const json = await prisma.jsonData.findUnique({
    where: { id: context.params.id },
  });

  if (!json || json.userId !== userId) {
    return new NextResponse('Not found', { status: 404 });
  }

  return NextResponse.json(json);
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const { name, content } = await request.json();

  const existing = await prisma.jsonData.findUnique({
    where: { id: context.params.id },
  });

  if (!existing || existing.userId !== userId) {
    return new NextResponse('Not found', { status: 404 });
  }

  const updated = await prisma.jsonData.update({
    where: { id: context.params.id },
    data: { name, content },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const existing = await prisma.jsonData.findUnique({
    where: { id: context.params.id },
  });

  if (!existing || existing.userId !== userId) {
    return new NextResponse('Not found', { status: 404 });
  }

  const deleted = await prisma.jsonData.delete({
    where: { id: context.params.id },
  });

  return NextResponse.json(deleted);
}
