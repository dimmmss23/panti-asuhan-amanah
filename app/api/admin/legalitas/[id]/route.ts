import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { authGuard } from "@/app/libs/auth-guard";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await authGuard();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = await req.json();
  const legalitas = await prisma.legalitas.update({
    where: { id: Number(id) },
    data: {
      jenisdokumen: body.jenisdokumen,
      nomordokumen: body.nomordokumen,
    },
  });
  return NextResponse.json(legalitas);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await authGuard();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await prisma.legalitas.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
