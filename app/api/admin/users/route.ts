import { NextResponse } from "next/server"
import prisma from "@/app/libs/prisma"
import bcrypt from "bcryptjs"

// GET - Ambil semua users
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                // password tidak diambil untuk keamanan
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(users)
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json(
            { error: "Gagal mengambil data users" },
            { status: 500 }
        )
    }
}

// POST - Tambah user baru
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        // Validasi input
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Nama, email, dan password wajib diisi" },
                { status: 400 }
            )
        }

        // Cek apakah email sudah digunakan
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "Email sudah terdaftar" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Buat user baru
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return NextResponse.json(newUser, { status: 201 })
    } catch (error) {
        console.error("Error creating user:", error)
        return NextResponse.json(
            { error: "Gagal membuat user baru" },
            { status: 500 }
        )
    }
}
