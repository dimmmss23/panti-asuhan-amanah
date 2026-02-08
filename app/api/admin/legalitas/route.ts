import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/app/libs/prisma";
import { authGuard } from "@/app/libs/auth-guard";

export async function GET() {
  const unauthorized = await authGuard();
  if (unauthorized) return unauthorized;

  const legalitas = await prisma.legalitas.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(legalitas);
}

export async function POST(req: NextRequest) {
  const unauthorized = await authGuard();
  if (unauthorized) return unauthorized;

  const body = await req.json();
  const legalitas = await prisma.legalitas.create({
    data: {
      nomordokumen: body.nomordokumen,
      profilId: body.profilId,
    },
  });
  revalidatePath("/profil");
  return NextResponse.json(legalitas);
}
