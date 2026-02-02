import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET() {
  const profil = await prisma.profil.findFirst({
    include: { Legalitas: true }
  });
  return NextResponse.json({ profil, legalitas: profil?.Legalitas || [] });
}
