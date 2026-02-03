import { NextResponse } from "next/server"
import prisma from "@/app/libs/prisma"
import bcrypt from "bcryptjs"

// PUT - Update user
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { name, email, password } = body

        // Validasi input
        if (!name || !email) {
            return NextResponse.json(
                { error: "Nama dan email wajib diisi" },
                { status: 400 }
            )
        }

        // Cek apakah user ada
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        })

        if (!existingUser) {
            return NextResponse.json(
                { error: "User tidak ditemukan" },
                { status: 404 }
            )
        }

        // Cek apakah email sudah digunakan oleh user lain
        const emailExists = await prisma.user.findFirst({
            where: {
                email,
                NOT: { id: parseInt(id) }
            }
        })

        if (emailExists) {
            return NextResponse.json(
                { error: "Email sudah digunakan oleh user lain" },
                { status: 400 }
            )
        }

        // Prepare data untuk update
        const updateData: {
            name: string
            email: string
            password?: string
        } = {
            name,
            email
        }

        // Jika password diisi, hash dan update
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10)
        }

        // Update user
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error("Error updating user:", error)
        return NextResponse.json(
            { error: "Gagal mengupdate user" },
            { status: 500 }
        )
    }
}

// DELETE - Hapus user
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Cek apakah user ada
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        })

        if (!existingUser) {
            return NextResponse.json(
                { error: "User tidak ditemukan" },
                { status: 404 }
            )
        }

        // Hapus user
        await prisma.user.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: "User berhasil dihapus" })
    } catch (error) {
        console.error("Error deleting user:", error)
        return NextResponse.json(
            { error: "Gagal menghapus user" },
            { status: 500 }
        )
    }
}
