"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import type { Session } from "next-auth"

interface NavbarProps {
    session?: Session | null
    signOutAction?: () => Promise<void>
}

const Navbar = ({ session, signOutAction }: NavbarProps) => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const publicNavLinks = [
        { href: "/", label: "Home" },
        { href: "/profil", label: "Profil" },
        { href: "/program", label: "Program" },
        { href: "/galeri", label: "Galeri" },
        { href: "/donasi", label: "Donasi" },
        { href: "/kontak", label: "Kontak" },
    ]

    const adminNavLinks = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/dashboard/penghuni", label: "Penghuni" },
        { href: "/dashboard/donasi", label: "Donasi" },
        { href: "/dashboard/kegiatan", label: "Kegiatan" },
        { href: "/dashboard/gallery", label: "Galeri" },
        { href: "/dashboard/pengaturan", label: "Pengaturan" },
    ]

    const navLinks = session ? adminNavLinks : publicNavLinks

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo dan Nama Yayasan - Bagian Kiri */}
                    <Link href={session ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
                        <Image 
                            src="/Logo.png"
                            alt="Logo Yayasan Panti Asuhan Amanah"
                            width={56}
                            height={56}
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="text-green-700 font-bold text-xs sm:text-sm md:text-base">
                                Yayasan Panti Asuhan
                            </span>
                            <span className="text-green-700 font-bold text-xs sm:text-sm md:text-base">
                                Amanah
                            </span>
                        </div>
                    </Link>

                    {/* Menu Navigasi - Desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        <ul className="flex items-center space-x-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                                                ${isActive 
                                                    ? "text-green-600 bg-green-50" 
                                                    : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                        {/* User Info & Logout untuk Admin */}
                        {session && (
                            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                                <span className="text-gray-700 text-sm">
                                    Halo, <span className="font-semibold">{session.user?.name}</span>
                                </span>
                                {signOutAction && (
                                    <form action={signOutAction}>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                                        >
                                            Logout
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div 
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen 
                        ? "max-h-screen opacity-100" 
                        : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-1 bg-white border-t border-gray-100 shadow-lg">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                                    ${isActive 
                                        ? "text-green-600 bg-green-50" 
                                        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        )
                    })}

                    {/* User Info & Logout untuk Mobile Admin */}
                    {session && (
                        <div className="pt-4 mt-4 border-t border-gray-200">
                            <p className="px-3 py-2 text-sm text-gray-700">
                                Halo, <span className="font-semibold">{session.user?.name}</span>
                            </p>
                            {signOutAction && (
                                <form action={signOutAction}>
                                    <button
                                        type="submit"
                                        className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                                    >
                                        Logout
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
