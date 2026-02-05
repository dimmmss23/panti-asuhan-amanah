import prisma from "@/app/libs/prisma"
import { NextResponse } from "next/server"

// Data Rekening & QRIS Statis (Tidak bisa diubah untuk keamanan)
const STATIC_DONASI = [
    {
        id: 1,
        namaBank: "BRI",
        nomorRekening: "574601037734534",
        atasNama: "PANTI ASUHAN AMANAH",
        logoUrl: "/Logo BRI.png",
        isActive: true
    }
];

const STATIC_QRIS = [
    {
        id: 1,
        nama: "QRIS Panti Asuhan Amanah",
        imageUrl: "/Qris.png",
        isActive: true
    }
];

// GET all active donation data (public)
export async function GET() {
    try {
        // Hanya ambil KitaBisa dari database (yang masih perlu CRUD)
        const kitabisa = await prisma.kitaBisa.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            donasi: STATIC_DONASI,
            qris: STATIC_QRIS,
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
