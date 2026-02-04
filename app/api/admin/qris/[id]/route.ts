import prisma from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import { authGuard } from "@/app/libs/auth-guard"

// GET single QRIS
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorized = await authGuard()
    if (unauthorized) return unauthorized

    try {
        const { id } = await params
        const qris = await prisma.qris.findUnique({
            where: { id: parseInt(id) }
        })

        if (!qris) {
            return NextResponse.json(
                { error: 'QRIS tidak ditemukan' },
                { status: 404 }
            )
        }

        return NextResponse.json(qris)
    } catch (error) {
        console.error('Error fetching qris:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data QRIS' },
            { status: 500 }
        )
    }
}

// PUT update QRIS
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorized = await authGuard()
    if (unauthorized) return unauthorized

    try {
        const { id } = await params
        const body = await request.json()
        const { nama, imageUrl, isActive } = body

        const qris = await prisma.qris.update({
            where: { id: parseInt(id) },
            data: {
                nama,
                imageUrl,
                isActive
            }
        })

        return NextResponse.json(qris)
    } catch (error) {
        console.error('Error updating qris:', error)
        return NextResponse.json(
            { error: 'Gagal mengupdate QRIS' },
            { status: 500 }
        )
    }
}

// DELETE QRIS
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorized = await authGuard()
    if (unauthorized) return unauthorized

    try {
        const { id } = await params
        await prisma.qris.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: 'QRIS berhasil dihapus' })
    } catch (error) {
        console.error('Error deleting qris:', error)
        return NextResponse.json(
            { error: 'Gagal menghapus QRIS' },
            { status: 500 }
        )
    }
}
