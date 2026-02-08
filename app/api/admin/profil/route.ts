import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/app/libs/prisma";
import { authGuard } from "@/app/libs/auth-guard";

export async function GET() {
  const unauthorized = await authGuard();
  if (unauthorized) return unauthorized;

  const profil = await prisma.profil.findFirst({
    include: { Legalitas: true }
  });
  return NextResponse.json({ profil, legalitas: profil?.Legalitas || [] });
}

export async function POST(req: NextRequest) {
  const unauthorized = await authGuard();
  if (unauthorized) return unauthorized;

  const body = await req.json();
  let profil = await prisma.profil.findFirst({});
  if (profil) {
    profil = await prisma.profil.update({
      where: { id: profil.id },
      data: {
        AnakAsuh: body.AnakAsuh,
        strukturorganisasi_URL: body.strukturorganisasi_URL,
      },
    });
  } else {
    profil = await prisma.profil.create({
      data: {
        AnakAsuh: body.AnakAsuh,
        strukturorganisasi_URL: body.strukturorganisasi_URL,
      },
    });
  }
  revalidatePath("/profil");
  return NextResponse.json({ profil });
}

export async function DELETE(req: NextRequest) {
  const unauthorized = await authGuard();
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await prisma.profil.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
