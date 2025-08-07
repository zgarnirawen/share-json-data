// src/app/api/json/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    const json = await prisma.jsonData.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
      },
    });

    if (!json) {
      return NextResponse.json({ error: "JSON data not found" }, { status: 404 });
    }

    return NextResponse.json(json);
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return NextResponse.json({ error: "Error fetching JSON data" }, { status: 500 });
  }
}
