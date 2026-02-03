import prisma from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET single KitaBisa
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const kitabisa = await prisma.kitaBisa.findUnique({
            where: { id: parseInt(id) }
        })

        if (!kitabisa) {
            return NextResponse.json(
                { error: 'KitaBisa tidak ditemukan' },
                { status: 404 }
            )
        }

        return NextResponse.json(kitabisa)
    } catch (error) {
        console.error('Error fetching kitabisa:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data KitaBisa' },
            { status: 500 }
        )
    }
}

// PUT update KitaBisa
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { namaProgram, deskripsi, imageUrl, linkKitaBisa, isActive } = body

        const kitabisa = await prisma.kitaBisa.update({
            where: { id: parseInt(id) },
            data: {
                namaProgram,
                deskripsi,
                imageUrl,
                linkKitaBisa,
                isActive
            }
        })

        return NextResponse.json(kitabisa)
    } catch (error) {
        console.error('Error updating kitabisa:', error)
        return NextResponse.json(
            { error: 'Gagal mengupdate KitaBisa' },
            { status: 500 }
        )
    }
}

// DELETE KitaBisa
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.kitaBisa.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: 'KitaBisa berhasil dihapus' })
    } catch (error) {
        console.error('Error deleting kitabisa:', error)
        return NextResponse.json(
            { error: 'Gagal menghapus KitaBisa' },
            { status: 500 }
        )
    }
}
