"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { useEffect, useRef } from "react"

interface Gallery {
    id: number
    title: string
    description: string | null
    imageUrl: string
    createdAt: string
    updatedAt: string
}

const GalleryDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const id = params.id
    const contentRef = useRef<HTMLElement>(null)

    // Fetch single gallery
    const { data: gallery, isLoading, error } = useQuery<Gallery>({
        queryKey: ["gallery", id],
        queryFn: async () => {
            const res = await fetch(`/api/gallery/${id}`)
            if (!res.ok) throw new Error("Gagal mengambil data")
            return res.json()
        },
        enabled: !!id
    })

    // Fetch all galleries for related posts
    const { data: allGalleries } = useQuery<Gallery[]>({
        queryKey: ["galleries"],
        queryFn: async () => {
            const res = await fetch("/api/gallery")
            if (!res.ok) throw new Error("Gagal mengambil data")
            return res.json()
        }
    })

    // Get related galleries (exclude current one)
    const relatedGalleries = allGalleries
        ?.filter((g) => g.id !== Number(id))
        .slice(0, 3)

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }

    const formatShortDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    }

    // Scroll to content on mobile when page loads
    useEffect(() => {
        // Check if it's mobile and scroll to content
        const isMobile = window.innerWidth < 768
        if (isMobile && contentRef.current) {
            // Small delay to ensure content is rendered
            setTimeout(() => {
                contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }, [gallery])

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 pt-16 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <p className="text-gray-500">Memuat...</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (error || !gallery) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 pt-16 flex items-center justify-center">
                    <div className="text-center">
                        <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">Galeri Tidak Ditemukan</h2>
                        <p className="text-gray-500 mb-6">Maaf, gambar yang Anda cari tidak tersedia.</p>
                        <button
                            onClick={() => router.push("/galeri")}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Kembali ke Galeri
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1 pt-16">
                {/* Breadcrumb */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <nav className="flex items-center gap-2 text-sm">
                            <Link href="/" className="text-gray-500 hover:text-green-600 transition-colors">
                                Home
                            </Link>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <Link href="/galeri" className="text-gray-500 hover:text-green-600 transition-colors">
                                Galeri
                            </Link>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-900 font-medium truncate max-w-[200px]">
                                {gallery.title}
                            </span>
                        </nav>
                    </div>
                </div>

                {/* Article Content */}
                <article ref={contentRef} className="py-8 sm:py-12" id="main-content">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <header className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Galeri
                                </span>
                            </div>
                            
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {gallery.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <time dateTime={gallery.createdAt}>
                                        {formatDate(gallery.createdAt)}
                                    </time>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>Panti Asuhan Amanah</span>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="mb-8">
                            <div className="flex justify-center">
                                <Image
                                    src={gallery.imageUrl}
                                    alt={gallery.title}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-auto h-auto max-w-full rounded-2xl shadow-lg"
                                    priority
                                />
                            </div>
                            <p className="text-center text-sm text-gray-500 mt-3 italic">
                                {gallery.title} - Dokumentasi Panti Asuhan Amanah
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg prose-green max-w-none">
                            {gallery.description ? (
                                <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Deskripsi
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {gallery.description}
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 text-center">
                                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-gray-500 italic">Belum ada deskripsi untuk foto ini.</p>
                                </div>
                            )}
                        </div>

                        {/* Share Section */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Bagikan</h3>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                            aria-label="Share to Facebook"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </button>
                                        <button 
                                            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                                            aria-label="Share to WhatsApp"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                            </svg>
                                        </button>
                                        <button 
                                            className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                                            aria-label="Share to Twitter"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <Link
                                    href="/galeri"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali ke Galeri
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedGalleries && relatedGalleries.length > 0 && (
                    <section className="py-12 bg-white border-t">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                                Galeri Lainnya
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedGalleries.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/galeri/${item.id}`}
                                        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <p className="text-sm text-gray-500 mb-2">
                                                {formatShortDate(item.createdAt)}
                                            </p>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default GalleryDetailPage
