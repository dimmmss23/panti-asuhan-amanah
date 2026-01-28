import prisma from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET all galleries
export async function GET() {
    try {
        const galleries = await prisma.gallery.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(galleries)
    } catch (error) {
        console.error('Error fetching galleries:', error)
        return NextResponse.json(
            { error: 'Gagal mengambil data galeri' },
            { status: 500 }
        )
    }
}

// POST new gallery
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { title, description, imageUrl } = body

        if (!title || !imageUrl) {
            return NextResponse.json(
                { error: 'Title dan imageUrl wajib diisi' },
                { status: 400 }
            )
        }

        const gallery = await prisma.gallery.create({
            data: {
                title,
                description: description || null,
                imageUrl
            }
        })

        return NextResponse.json(gallery, { status: 201 })
    } catch (error) {
        console.error('Error creating gallery:', error)
        return NextResponse.json(
            { error: 'Gagal membuat galeri' },
            { status: 500 }
        )
    }
}
