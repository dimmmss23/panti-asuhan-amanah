import prisma from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET single gallery
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const gallery = await prisma.gallery.findUnique({
            where: { id: parseInt(id) }
        })

        if (!gallery) {
            return NextResponse.json(
                { error: 'Galeri tidak ditemukan' },
                { status: 404 }
            )
        }

        return NextResponse.json(gallery)
    } catch (error) {
        console.error('Error fetching gallery:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data galeri' },
            { status: 500 }
        )
    }
}

// PUT update gallery
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { title, description, imageUrl } = body

        if (!title || !imageUrl) {
            return NextResponse.json(
                { error: 'Title dan imageUrl wajib diisi' },
                { status: 400 }
            )
        }

        const gallery = await prisma.gallery.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description: description || null,
                imageUrl
            }
        })

        return NextResponse.json(gallery)
    } catch (error) {
        console.error('Error updating gallery:', error)
        return NextResponse.json(
            { error: 'Gagal mengupdate galeri' },
            { status: 500 }
        )
    }
}

// DELETE gallery
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        
        await prisma.gallery.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: 'Galeri berhasil dihapus' })
    } catch (error) {
        console.error('Error deleting gallery:', error)
        return NextResponse.json(
            { error: 'Gagal menghapus galeri' },
            { status: 500 }
        )
    }
}
