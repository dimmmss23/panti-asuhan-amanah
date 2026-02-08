"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import type { Session } from "next-auth"

interface NavbarProps {
    session?: Session | null
    signOutAction?: () => Promise<void>
}

const Navbar = ({ session, signOutAction }: NavbarProps) => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const publicNavLinks = [
        { href: "/", label: "Home" },
        { href: "/profil", label: "Profil" },
        { href: "/program", label: "Program" },
        { href: "/donasi", label: "Donasi" },
        { href: "/galeri", label: "Galeri" },
        { href: "/kontak", label: "Kontak" },
    ]

    const adminNavLinks = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/dashboard/profil", label: "Profil" },
        { href: "/dashboard/donasi", label: "Donasi" },
        { href: "/dashboard/gallery", label: "Galeri" },
        { href: "/dashboard/users", label: "Users" },
    ]

    const navLinks = session ? adminNavLinks : publicNavLinks

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
                : "bg-white/90 backdrop-blur-[2px] py-4 border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo dan Nama Yayasan - Bagian Kiri */}
                    <Link href={session ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center gap-3 group">
                        <div className="relative transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/Logo.png"
                                alt="Logo Yayasan Panti Asuhan Amanah"
                                width={56}
                                height={56}
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain drop-shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-emerald-800 font-bold text-xs sm:text-sm tracking-wide">
                                YAYASAN PANTI ASUHAN
                            </span>
                            <span className="text-emerald-600 font-bold text-sm sm:text-base tracking-widest group-hover:text-emerald-700 transition-colors">
                                AMANAH
                            </span>
                        </div>
                    </Link>

                    {/* Menu Navigasi - Desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        <ul className="flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100/50 backdrop-blur-sm">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 block ${isActive
                                                ? "bg-emerald-600 text-white shadow-sm"
                                                : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                                }`}
                                        >
                                            <span className="relative z-10">
                                                {link.label}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                        {/* User Info & Logout untuk Admin */}
                        {session && (
                            <div className="flex items-center gap-3 ml-2 pl-3 border-l border-gray-200">
                                <div className="text-right hidden lg:block">
                                    <p className="text-xs text-gray-500">Login sebagai</p>
                                    <p className="text-sm font-semibold text-gray-700">{session.user?.name}</p>
                                </div>
                                {signOutAction && (
                                    <form action={signOutAction}>
                                        <button
                                            type="submit"
                                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                                            title="Logout"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
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
                            className={`p-2 rounded-xl transition-all duration-200 ${isMenuOpen ? "bg-emerald-50 text-emerald-600" : "text-gray-600 hover:bg-gray-50"}`}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl">
                    <div className="px-4 py-6 space-y-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200
                                        ${isActive
                                            ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                                            : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    )}
                                </Link>
                            )
                        })}

                        {/* User Info & Logout untuk Mobile Admin */}
                        {session && (
                            <div className="pt-4 mt-4 border-t border-gray-100">
                                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500">Login sebagai</p>
                                        <p className="text-sm font-semibold text-gray-700">{session.user?.name}</p>
                                    </div>
                                    {signOutAction && (
                                        <form action={signOutAction}>
                                            <button
                                                type="submit"
                                                className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200 shadow-sm shadow-red-200"
                                            >
                                                Logout
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
