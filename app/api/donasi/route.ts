import prisma from "@/app/libs/prisma"
import { NextResponse } from "next/server"

// GET all active donation data (public)
export async function GET() {
    try {
        const [donasi, qris, kitabisa] = await Promise.all([
            prisma.donasi.findMany({
                where: { isActive: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.qris.findMany({
                where: { isActive: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.kitaBisa.findMany({
                where: { isActive: true },
                orderBy: { createdAt: 'desc' }
            })
        ])

        return NextResponse.json({
            donasi,
            qris,
            kitabisa
        })
    } catch (error) {
        console.error('Error fetching donation data:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data donasi' },
            { status: 500 }
        )
    }
}
