import prisma from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET single donasi
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const donasi = await prisma.donasi.findUnique({
            where: { id: parseInt(id) }
        })

        if (!donasi) {
            return NextResponse.json(
                { error: 'Donasi tidak ditemukan' },
                { status: 404 }
            )
        }

        return NextResponse.json(donasi)
    } catch (error) {
        console.error('Error fetching donasi:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data donasi' },
            { status: 500 }
        )
    }
}

// PUT update donasi
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { namaBank, nomorRekening, atasNama, logoUrl, isActive } = body

        const donasi = await prisma.donasi.update({
            where: { id: parseInt(id) },
            data: {
                namaBank,
                nomorRekening,
                atasNama,
                logoUrl,
                isActive
            }
        })

        return NextResponse.json(donasi)
    } catch (error) {
        console.error('Error updating donasi:', error)
        return NextResponse.json(
            { error: 'Gagal mengupdate donasi' },
            { status: 500 }
        )
    }
}

// DELETE donasi
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.donasi.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: 'Donasi berhasil dihapus' })
    } catch (error) {
        console.error('Error deleting donasi:', error)
        return NextResponse.json(
            { error: 'Gagal menghapus donasi' },
            { status: 500 }
        )
    }
}
