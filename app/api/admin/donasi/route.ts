import prisma from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET all donasi (bank accounts)
export async function GET() {
    try {
        const donasi = await prisma.donasi.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(donasi)
    } catch (error) {
        console.error('Error fetching donasi:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data donasi' },
            { status: 500 }
        )
    }
}

// POST new donasi (bank account)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { namaBank, nomorRekening, atasNama, logoUrl, isActive } = body

        if (!namaBank || !nomorRekening || !atasNama || !logoUrl) {
            return NextResponse.json(
                { error: 'Semua field wajib diisi' },
                { status: 400 }
            )
        }

        const donasi = await prisma.donasi.create({
            data: {
                namaBank,
                nomorRekening,
                atasNama,
                logoUrl,
                isActive: isActive ?? true
            }
        })

        return NextResponse.json(donasi, { status: 201 })
    } catch (error) {
        console.error('Error creating donasi:', error)
        return NextResponse.json(
            { error: 'Gagal membuat donasi' },
            { status: 500 }
        )
    }
}
