import { auth } from "@/auth"
import { NextResponse } from "next/server"

/**
 * Auth guard untuk API routes admin
 * Mengembalikan null jika authenticated, atau NextResponse error jika tidak
 */
export async function authGuard() {
    const session = await auth()
    
    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized - Silakan login terlebih dahulu" },
            { status: 401 }
        )
    }
    
    return null // Authenticated, lanjutkan
}

/**
 * Get session dari auth
 * Untuk digunakan ketika perlu data session
 */
export async function getSession() {
    return await auth()
}
