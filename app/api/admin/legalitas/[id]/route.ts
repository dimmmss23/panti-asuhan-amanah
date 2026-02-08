import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
  revalidatePath("/profil");
  return NextResponse.json(legalitas);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await authGuard();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await prisma.legalitas.delete({ where: { id: Number(id) } });
  revalidatePath("/profil");
  return NextResponse.json({ success: true });
}
