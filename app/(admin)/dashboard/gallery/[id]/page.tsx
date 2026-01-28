"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <p className="text-gray-500">Memuat...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !gallery) {
        return (
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">Galeri Tidak Ditemukan</h2>
                        <p className="text-gray-500 mb-6">Data galeri yang Anda cari tidak tersedia.</p>
                        <button
                            onClick={() => router.push("/dashboard/gallery")}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Kembali ke Galeri
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm mb-6">
                    <Link href="/dashboard" className="text-gray-500 hover:text-indigo-600 transition-colors">
                        Dashboard
                    </Link>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href="/dashboard/gallery" className="text-gray-500 hover:text-indigo-600 transition-colors">
                        Galeri
                    </Link>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-900 font-medium truncate max-w-[200px]">
                        {gallery.title}
                    </span>
                </nav>

                {/* Back Button & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <button
                        onClick={() => router.push("/dashboard/gallery")}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Featured Image */}
                    <div className="flex justify-center p-6 bg-gray-50">
                        <Image
                            src={gallery.imageUrl}
                            alt={gallery.title}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-auto h-auto max-w-full rounded-lg shadow-md"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {/* Badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Galeri
                            </span>
                            <span className="text-sm text-gray-500">ID: #{gallery.id}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            {gallery.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Dibuat: {formatDate(gallery.createdAt)} pukul {formatTime(gallery.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Diperbarui: {formatDate(gallery.updatedAt)} pukul {formatTime(gallery.updatedAt)}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Deskripsi
                            </h2>
                            {gallery.description ? (
                                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {gallery.description}
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-xl p-6 text-center">
                                    <svg className="w-10 h-10 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-gray-500 italic">Tidak ada deskripsi</p>
                                </div>
                            )}
                        </div>

                        {/* Image URL Info */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                URL Gambar
                            </h2>
                            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                                <input
                                    type="text"
                                    value={gallery.imageUrl}
                                    readOnly
                                    className="flex-1 bg-transparent text-gray-600 text-sm truncate outline-none"
                                />
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(gallery.imageUrl)
                                        alert("URL berhasil disalin!")
                                    }}
                                    className="flex-shrink-0 p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                                    title="Salin URL"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-gray-200">
                            <Link
                                href="/dashboard/gallery"
                                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Kembali ke Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GalleryDetailPage
