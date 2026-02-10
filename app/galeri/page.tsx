"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import GalleryShowcase from "@/app/components/GalleryShowcase"


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

    // Pagination
    const ITEMS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = React.useState(1);

    // Sort galleries by date descending (newest first) and calculate pagination
    const sortedGalleries = React.useMemo(() => {
        if (!galleries) return [];
        return [...galleries].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [galleries]);

    const totalItems = sortedGalleries.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentGalleries = sortedGalleries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Reset to page 1 when galleries data changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [galleries]);

    // Scroll to gallery section when page changes
    React.useEffect(() => {
        const gallerySection = document.getElementById('gallery-section');
        if (gallerySection && currentPage > 1) {
            gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentPage]);

    // Debug logging
    React.useEffect(() => {
        console.log('Pagination Debug:', {
            totalGalleries: sortedGalleries.length,
            currentPage,
            totalPages,
            startIndex,
            currentGalleriesCount: currentGalleries.length,
            firstItemTitle: currentGalleries[0]?.title
        });
    }, [currentPage, sortedGalleries, currentGalleries, totalPages, startIndex]);



    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-0">
                {/* Hero Section - Islamic Elegant Theme */}
                <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800">
                    {/* Islamic Geometric Pattern Overlay */}
                    <motion.div
                        className="absolute inset-0 opacity-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="islamic-pattern-galeri" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="1" />
                                    <path d="M30 15L45 30L30 45L15 30Z" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#islamic-pattern-galeri)" />
                        </svg>
                    </motion.div>

                    {/* Decorative Glow Effects */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl" />

                    {/* Gold Accent Lines */}
                    <motion.div
                        className="absolute top-10 left-0 right-0 flex justify-center"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-10 left-0 right-0 flex justify-center"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            {/* Decorative Icon */}
                            <motion.div
                                className="flex justify-center mb-6"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, type: "spring" }}
                            >
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                    <svg className="w-8 h-8 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight mb-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                Galeri Kegiatan
                            </motion.h1>

                            {/* Decorative Divider */}
                            <motion.div
                                className="flex items-center justify-center gap-3 mb-6"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400/70" />
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400/70" />
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                Dokumentasi kegiatan dan momen berharga di Panti Asuhan Amanah
                            </motion.p>
                        </div>
                    </div>

                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 54" fill="none" preserveAspectRatio="none">
                            <path d="M0 22L60 16.7C120 11 240 1 360 0.3C480 0 600 11 720 16.7C840 22 960 22 1080 19.3C1200 16 1320 11 1380 8.3L1440 6V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" fill="#f9fafb" />
                        </svg>
                    </div>
                </section>

                {/* Album Section Title */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Album</h2>
                    </div>
                </div>

                <GalleryShowcase withButton={true} />

                {/* Gallery Section */}
                <section id="gallery-section" className="py-12 sm:py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Berita Terbaru Title */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Berita Terbaru</h2>
                        </div>
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[300px]">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                                    <p className="text-gray-500">Memuat galeri...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-red-500 text-lg">Gagal memuat galeri</p>
                                <p className="text-gray-500 mt-2">Silakan coba lagi nanti</p>
                            </motion.div>
                        ) : sortedGalleries.length > 0 ? (
                            <>
                                <motion.div
                                    key={`page-${currentPage}`}
                                    className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                >
                                    {currentGalleries.map((gallery) => (
                                        <motion.article
                                            key={gallery.id}
                                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
                                            variants={itemVariants}
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
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                                        </motion.article>
                                    ))}
                                </motion.div>

                                {/* Pagination Navigation */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-4 mt-8">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            <span className="font-medium">Sebelumnya</span>
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">
                                                Halaman <span className="font-semibold text-emerald-600">{currentPage}</span> dari <span className="font-semibold">{totalPages}</span>
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            <span className="font-medium">Selanjutnya</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Foto</h3>
                                <p className="text-gray-500">Galeri foto akan segera hadir</p>
                            </div
                            >
                        )}
                    </div>
                </section>

                {/* Info Section */}
                <section className="py-12 sm:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 sm:p-12"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
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
                                    <motion.a
                                        href="/kontak"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Hubungi Kami
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default GaleriPage
