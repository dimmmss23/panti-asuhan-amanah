"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import GalleryShowcase from "./GalleryShowcase"

interface Gallery {
    id: number
    title: string
    description: string | null
    imageUrl: string
    createdAt: string
    updatedAt: string
}

const Galeri = () => {
    // Fetch galleries
    const { data: galleries, isLoading } = useQuery<Gallery[]>({
        queryKey: ["galleries-public"],
        queryFn: async () => {
            const res = await fetch("/api/gallery")
            if (!res.ok) throw new Error("Gagal mengambil data")
            return res.json()
        }
    })

    // Get latest 6 galleries
    const latestGalleries = galleries?.slice(0, 6) || []

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    }

    const handleReadMore = () => {
        // For mobile, let the default behavior happen (will auto-scroll on detail page)
        // For desktop, just navigate normally
        if (window.innerWidth >= 768) {
            return // Let default Link behavior happen
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <section className="py-16 sm:py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold mb-4 border border-emerald-100">
                        Galeri & Aktivitas
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Jendela Kegiatan Panti
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Intip berbagai momen kebersamaan, kegiatan belajar, dan aktivitas harian anak-anak asuh kami yang penuh semangat dan keceriaan.
                    </p>
                </div>

                {/* Main Card */}
                <div
                    className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    {/* Subtle Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600" />

                    <div className="relative z-10 pt-10 pb-6 px-4 md:px-8">
                        {/* Header Album */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Album</h2>
                        </div>

                        {/* Gallery Showcase (Riam/Slide) */}
                        <GalleryShowcase withButton={false} />
                    </div>

                    <div className="relative z-10 px-6 sm:px-10 md:px-12 pb-12">
                        {/* Section Header Berita */}
                        <div className="flex items-center gap-3 mb-8 mt-8 border-t border-gray-100 pt-10">
                            <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Berita Terbaru</h2>
                        </div>

                        {/* Gallery Grid - 2 columns on mobile */}
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[300px]">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-600 border-t-transparent"></div>
                                    <p className="text-gray-500 text-sm">Memuat berita...</p>
                                </div>
                            </div>
                        ) : latestGalleries.length > 0 ? (
                            <>
                                <motion.div
                                    className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {latestGalleries.map((gallery) => (
                                        <motion.div
                                            key={gallery.id}
                                            variants={itemVariants}
                                            className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-green-200 hover:bg-green-50/20 transition-all duration-300 flex flex-col"
                                            whileHover={{ y: -3 }}
                                        >
                                            {/* Image Container */}
                                            <Link href={`/galeri/${gallery.id}#main-content`}>
                                                <div className="relative aspect-[4/3] overflow-hidden">
                                                    <Image
                                                        src={gallery.imageUrl}
                                                        alt={gallery.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    {/* Overlay on hover */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    {/* View icon on hover */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/95 rounded-full flex items-center justify-center shadow-md">
                                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>

                                            {/* Content */}
                                            <div className="p-3 sm:p-4 flex flex-col flex-1">
                                                {/* Date Badge */}
                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-100">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {formatDate(gallery.createdAt)}
                                                    </span>
                                                </div>

                                                <Link href={`/galeri/${gallery.id}#main-content`}>
                                                    <h3 className="font-semibold text-sm text-gray-900 mb-1.5 line-clamp-2 group-hover:text-green-600 transition-colors">
                                                        {gallery.title}
                                                    </h3>
                                                </Link>

                                                {gallery.description && (
                                                    <p className="text-gray-500 text-xs line-clamp-2 mb-2">
                                                        {gallery.description}
                                                    </p>
                                                )}

                                                {/* Spacer to push button to bottom */}
                                                <div className="flex-1"></div>

                                                {/* Read More Button */}
                                                <Link
                                                    href={`/galeri/${gallery.id}#main-content`}
                                                    onClick={() => handleReadMore()}
                                                    className="inline-flex items-center gap-1 text-green-600 font-medium text-xs hover:text-green-700 transition-colors group/link mt-auto"
                                                >
                                                    Lihat Detail
                                                    <svg
                                                        className="w-3 h-3 transform group-hover/link:translate-x-0.5 transition-transform"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* View All Button*/}
                                <motion.div
                                    className="text-center mt-10"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <Link href="/galeri">
                                        <motion.span
                                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all duration-300 text-sm"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Lihat Semua Galeri
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-1">Belum Ada Foto</h3>
                                <p className="text-gray-500 text-sm">Galeri foto akan segera hadir</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Galeri
