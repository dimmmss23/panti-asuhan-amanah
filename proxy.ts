import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    // Proteksi route /dashboard
    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }

    // Proteksi API admin routes
    if (pathname.startsWith("/api/admin")) {
        if (!isLoggedIn) {
            return NextResponse.json(
                { error: "Unauthorized - Silakan login terlebih dahulu" },
                { status: 401 }
            )
        }
    }

    // Redirect ke dashboard jika sudah login dan akses halaman login/register
    if (pathname === "/login" || pathname === "/register") {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/dashboard/:path*", "/api/admin/:path*", "/login", "/register"]
}
