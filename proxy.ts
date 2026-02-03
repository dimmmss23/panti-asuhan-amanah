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

    // Redirect ke dashboard jika sudah login dan akses halaman login
    if (pathname === "/login") {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/dashboard/:path*", "/login"]
}
