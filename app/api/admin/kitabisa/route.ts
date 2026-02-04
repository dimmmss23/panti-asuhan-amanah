import prisma from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import { authGuard } from "@/app/libs/auth-guard"

// GET all KitaBisa
export async function GET() {
    const unauthorized = await authGuard()
    if (unauthorized) return unauthorized

    try {
        const kitabisa = await prisma.kitaBisa.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(kitabisa)
    } catch (error) {
        console.error('Error fetching kitabisa:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data KitaBisa' },
            { status: 500 }
        )
    }
}

// POST new KitaBisa
export async function POST(request: NextRequest) {
    const unauthorized = await authGuard()
    if (unauthorized) return unauthorized

    try {
        const body = await request.json()
        const { namaProgram, deskripsi, imageUrl, linkKitaBisa, isActive } = body

        if (!namaProgram || !deskripsi || !imageUrl || !linkKitaBisa) {
            return NextResponse.json(
                { error: 'Semua field wajib diisi' },
                { status: 400 }
            )
        }

        const kitabisa = await prisma.kitaBisa.create({
            data: {
                namaProgram,
                deskripsi,
                imageUrl,
                linkKitaBisa,
                isActive: isActive ?? true
            }
        })

        return NextResponse.json(kitabisa, { status: 201 })
    } catch (error) {
        console.error('Error creating kitabisa:', error)
        return NextResponse.json(
            { error: 'Gagal membuat KitaBisa' },
            { status: 500 }
        )
    }
}
