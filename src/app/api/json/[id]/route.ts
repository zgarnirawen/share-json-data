// /api/json/[id]/route.ts

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();  // <-- await ici
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  // Recherche par id uniquement (car id est unique)
  const json = await prisma.jsonData.findUnique({
    where: { id: params.id },
  });

  // Vérifie que ce json appartient bien à l'userId
  if (!json || json.userId !== userId) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(json);
}

// PUT
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();  // <-- await ici
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { name, content } = body;

  // On vérifie que la donnée existe et appartient bien à l'user
  const existing = await prisma.jsonData.findUnique({
    where: { id: params.id },
  });
  if (!existing || existing.userId !== userId) {
    return new NextResponse("Not found", { status: 404 });
  }

  const updated = await prisma.jsonData.update({
    where: { id: params.id },
    data: { name, content },
  });

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();  // <-- await ici
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  // Vérifie que la donnée existe et appartient bien à l'user
  const existing = await prisma.jsonData.findUnique({
    where: { id: params.id },
  });
  if (!existing || existing.userId !== userId) {
    return new NextResponse("Not found", { status: 404 });
  }

  const deleted = await prisma.jsonData.delete({
    where: { id: params.id },
  });

  return NextResponse.json(deleted);
}
