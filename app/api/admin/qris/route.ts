import prisma from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET all QRIS
export async function GET() {
    try {
        const qris = await prisma.qris.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(qris)
    } catch (error) {
        console.error('Error fetching qris:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data QRIS' },
            { status: 500 }
        )
    }
}

// POST new QRIS
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { nama, imageUrl, isActive } = body

        if (!imageUrl) {
            return NextResponse.json(
                { error: 'Image URL wajib diisi' },
                { status: 400 }
            )
        }

        const qris = await prisma.qris.create({
            data: {
                nama: nama || 'QRIS Donasi',
                imageUrl,
                isActive: isActive ?? true
            }
        })

        return NextResponse.json(qris, { status: 201 })
    } catch (error) {
        console.error('Error creating qris:', error)
        return NextResponse.json(
            { error: 'Gagal membuat QRIS' },
            { status: 500 }
        )
    }
}
