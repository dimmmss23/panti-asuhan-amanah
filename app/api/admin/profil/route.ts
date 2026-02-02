import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET() {
  const profil = await prisma.profil.findFirst({
    include: { Legalitas: true }
  });
  return NextResponse.json({ profil, legalitas: profil?.Legalitas || [] });
}

export async function POST(req: NextRequest) {
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
  return NextResponse.json({ profil });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await prisma.profil.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
