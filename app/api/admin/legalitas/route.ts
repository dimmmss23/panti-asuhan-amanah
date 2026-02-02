import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET() {
  const legalitas = await prisma.legalitas.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(legalitas);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const legalitas = await prisma.legalitas.create({
    data: {
      jenisdokumen: body.jenisdokumen,
      nomordokumen: body.nomordokumen,
      profilId: body.profilId,
    },
  });
  return NextResponse.json(legalitas);
}
