"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

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
        <section className="py-16 sm:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Galeri Kegiatan
                    </h2>
                    <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Dokumentasi kegiatan dan momen berharga di Panti Asuhan Amanah
                    </p>
                </motion.div>

                {/* Gallery Grid - 2 columns on mobile */}
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                            <p className="text-gray-500">Memuat galeri...</p>
                        </div>
                    </div>
                ) : latestGalleries.length > 0 ? (
                    <>
                        <motion.div
                            className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {latestGalleries.map((gallery) => (
                                <motion.div
                                    key={gallery.id}
                                    variants={itemVariants}
                                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                                >
                                    {/* Image Container */}
                                    <Link href={`/galeri/${gallery.id}#main-content`}>
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={gallery.imageUrl}
                                                alt={gallery.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
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

                                        <Link href={`/galeri/${gallery.id}#main-content`}>
                                            <h3 className="font-bold text-sm sm:text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                                                {gallery.title}
                                            </h3>
                                        </Link>

                                        {gallery.description && (
                                            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
                                                {gallery.description}
                                            </p>
                                        )}

                                        {/* Spacer to push button to bottom */}
                                        <div className="flex-1"></div>

                                        {/* Read More Button - Always at bottom */}
                                        <Link
                                            href={`/galeri/${gallery.id}#main-content`}
                                            onClick={() => handleReadMore()}
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
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* View All Button*/}
                        <div className="text-center mt-12">
                            <Link
                                href="/galeri"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Lihat Semua Galeri
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </>
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
    )
}

export default Galeri
