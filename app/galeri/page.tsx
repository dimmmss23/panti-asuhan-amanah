"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

interface Gallery {
    id: number
    title: string
    description: string | null
    imageUrl: string
    createdAt: string
    updatedAt: string
}

const GaleriPage = () => {
    // Fetch galleries
    const { data: galleries, isLoading, error } = useQuery<Gallery[]>({
        queryKey: ["galleries"],
        queryFn: async () => {
            const res = await fetch("/api/gallery")
            if (!res.ok) throw new Error("Gagal mengambil data")
            return res.json()
        }
    })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength) + "..."
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-green-800 to-green-900 py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                            Galeri Kegiatan
                        </h1>
                        <p className="text-green-100 text-lg sm:text-xl max-w-2xl mx-auto">
                            Dokumentasi kegiatan dan momen berharga di Panti Asuhan Amanah
                        </p>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-12 sm:py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[300px]">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                                    <p className="text-gray-500">Memuat galeri...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-red-500 text-lg">Gagal memuat galeri</p>
                                <p className="text-gray-500 mt-2">Silakan coba lagi nanti</p>
                            </div>
                        ) : galleries && galleries.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {galleries.map((gallery) => (
                                    <article
                                        key={gallery.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
                                    >
                                        {/* Image Container */}
                                        <Link 
                                            href={`/galeri/${gallery.id}#main-content`}
                                            className="relative aspect-[4/3] overflow-hidden block"
                                        >
                                            <Image
                                                src={gallery.imageUrl}
                                                alt={gallery.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </Link>

                                        {/* Content - flex-1 to push button to bottom */}
                                        <div className="p-3 sm:p-5 flex flex-col flex-1">
                                            {/* Date */}
                                            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <time dateTime={gallery.createdAt} className="text-xs sm:text-sm">
                                                    {formatDate(gallery.createdAt)}
                                                </time>
                                            </div>

                                            {/* Title */}
                                            <Link href={`/galeri/${gallery.id}#main-content`}>
                                                <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                                                    {gallery.title}
                                                </h3>
                                            </Link>

                                            {/* Description - Limited with line-clamp */}
                                            {gallery.description && (
                                                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                                                    {gallery.description}
                                                </p>
                                            )}

                                            {/* Spacer to push button to bottom */}
                                            <div className="flex-1"></div>

                                            {/* Read More Link - Always at bottom */}
                                            <Link
                                                href={`/galeri/${gallery.id}#main-content`}
                                                className="inline-flex items-center gap-1 sm:gap-2 text-green-600 font-medium text-xs sm:text-sm hover:text-green-700 transition-colors group/link mt-auto"
                                            >
                                                Baca Selengkapnya
                                                <svg 
                                                    className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover/link:translate-x-1 transition-transform" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Foto</h3>
                                <p className="text-gray-500">Galeri foto akan segera hadir</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Info Section */}
                <section className="py-12 sm:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 sm:p-12">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Bagikan Momen Bersama Kami
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        Ingin berkontribusi dengan mengirimkan foto kegiatan? Hubungi kami melalui kontak yang tersedia.
                                    </p>
                                    <a
                                        href="/kontak"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Hubungi Kami
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default GaleriPage
