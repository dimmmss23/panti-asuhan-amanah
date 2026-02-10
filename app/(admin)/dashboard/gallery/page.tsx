"use client"

import React from "react"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { uploadImage, deleteImage } from "@/app/libs/supabase-storage"
import Image from "next/image"

interface Gallery {
    id: number
    title: string
    description: string | null
    imageUrl: string
    createdAt: string
    updatedAt: string
}

interface GalleryForm {
    title: string
    description: string
    imageFile: File | null
    imageUrl: string
}

const GalleryPage = () => {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null)
    const [formData, setFormData] = useState<GalleryForm>({
        title: "",
        description: "",
        imageFile: null,
        imageUrl: ""
    })
    const [previewUrl, setPreviewUrl] = useState<string>("")
    const [isUploading, setIsUploading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    // Fetch galleries
    const { data: galleries, isLoading, error } = useQuery<Gallery[]>({
        queryKey: ["galleries"],
        queryFn: async () => {
            const res = await fetch("/api/gallery")
            if (!res.ok) throw new Error("Gagal mengambil data")
            return res.json()
        }
    })

    // Pagination
    const ITEMS_PER_PAGE = 9;

    // Sort galleries by date descending (newest first)
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

    // Scroll to gallery grid when page changes
    React.useEffect(() => {
        const galleryGrid = document.getElementById('admin-gallery-grid');
        if (galleryGrid && currentPage > 1) {
            galleryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentPage]);




    // Create mutation
    const createMutation = useMutation({
        mutationFn: async (data: { title: string; description: string; imageUrl: string }) => {
            const res = await fetch("/api/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Gagal membuat galeri")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["galleries"] })
            closeModal()
        }
    })

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: { title: string; description: string; imageUrl: string } }) => {
            const res = await fetch(`/api/gallery/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Gagal mengupdate galeri")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["galleries"] })
            closeModal()
        }
    })

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/gallery/${id}`, {
                method: "DELETE"
            })
            if (!res.ok) throw new Error("Gagal menghapus galeri")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["galleries"] })
            setIsDeleteModalOpen(false)
            setSelectedGallery(null)
        }
    })

    const openCreateModal = () => {
        setSelectedGallery(null)
        setFormData({ title: "", description: "", imageFile: null, imageUrl: "" })
        setPreviewUrl("")
        setIsModalOpen(true)
    }

    const openEditModal = (gallery: Gallery) => {
        setSelectedGallery(gallery)
        setFormData({
            title: gallery.title,
            description: gallery.description || "",
            imageFile: null,
            imageUrl: gallery.imageUrl
        })
        setPreviewUrl(gallery.imageUrl)
        setIsModalOpen(true)
    }

    const openDeleteModal = (gallery: Gallery) => {
        setSelectedGallery(gallery)
        setIsDeleteModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedGallery(null)
        setFormData({ title: "", description: "", imageFile: null, imageUrl: "" })
        setPreviewUrl("")
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData({ ...formData, imageFile: file })
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            let imageUrl = formData.imageUrl

            // Upload new image if selected
            if (formData.imageFile) {
                // Delete old image if updating
                if (selectedGallery && selectedGallery.imageUrl) {
                    await deleteImage(selectedGallery.imageUrl)
                }

                const uploadedUrl = await uploadImage(formData.imageFile, "gallery")
                if (!uploadedUrl) {
                    alert("Gagal mengupload gambar")
                    setIsUploading(false)
                    return
                }
                imageUrl = uploadedUrl
            }

            const payload = {
                title: formData.title,
                description: formData.description,
                imageUrl
            }

            if (selectedGallery) {
                updateMutation.mutate({ id: selectedGallery.id, data: payload })
            } else {
                createMutation.mutate(payload)
            }
        } catch (error) {
            console.error("Error:", error)
            alert("Terjadi kesalahan")
        } finally {
            setIsUploading(false)
        }
    }

    const handleDelete = async () => {
        if (!selectedGallery) return

        try {
            // Delete image from storage
            if (selectedGallery.imageUrl) {
                await deleteImage(selectedGallery.imageUrl)
            }
            deleteMutation.mutate(selectedGallery.id)
        } catch (error) {
            console.error("Error:", error)
            alert("Gagal menghapus galeri")
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Gagal memuat data galeri</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Galeri</h1>
                        <p className="text-gray-600 mt-1">Kelola foto dan gambar galeri</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Gambar
                    </button>
                </div>

                {/* Gallery Grid */}
                <div id="admin-gallery-grid">
                    {sortedGalleries.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {currentGalleries.map((gallery) => (
                                    <div
                                        key={gallery.id}
                                        className="bg-white rounded-xl shadow-md overflow-hidden group"
                                    >
                                        <div className="relative aspect-square">
                                            <Image
                                                src={gallery.imageUrl}
                                                alt={gallery.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                className="object-cover sm:group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* Overlay - selalu terlihat di mobile, hover di desktop */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:bg-black/0 sm:group-hover:bg-black/40 transition-colors duration-300">
                                                {/* Tombol aksi - posisi berbeda untuk mobile dan desktop */}
                                                <div className="absolute bottom-2 right-2 flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 sm:absolute sm:inset-0 sm:flex sm:items-center sm:justify-center transition-opacity duration-300">
                                                    <button
                                                        onClick={() => openEditModal(gallery)}
                                                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-md"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(gallery)}
                                                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-md"
                                                        title="Hapus"
                                                    >
                                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 truncate">{gallery.title}</h3>
                                            {gallery.description && (
                                                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{gallery.description}</p>
                                            )}
                                            <a
                                                href={`/dashboard/gallery/${gallery.id}`}
                                                className="inline-flex items-center gap-1 mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                            >
                                                Lihat Selengkapnya
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Navigation */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-8">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <span className="font-medium">Sebelumnya</span>
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">
                                            Halaman <span className="font-semibold text-indigo-600">{currentPage}</span> dari <span className="font-semibold">{totalPages}</span>
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
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
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-500">Belum ada gambar di galeri</p>
                            <button
                                onClick={openCreateModal}
                                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Tambah gambar pertama
                            </button>
                        </div>
                    )}
                </div>
            </div>


            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/50" onClick={closeModal}></div>
                        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {selectedGallery ? "Edit Gambar" : "Tambah Gambar"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gambar {!selectedGallery && <span className="text-red-500">*</span>}
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors">
                                        {previewUrl ? (
                                            <div className="relative aspect-video w-full mb-3">
                                                <Image
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 500px"
                                                    className="object-contain rounded-lg"
                                                />
                                            </div>
                                        ) : (
                                            <div className="py-8">
                                                <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium"
                                        >
                                            {previewUrl ? "Ganti Gambar" : "Pilih Gambar"}
                                        </label>
                                    </div>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Judul <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Masukkan judul"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                        placeholder="Masukkan deskripsi (opsional)"
                                        rows={3}
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUploading || createMutation.isPending || updateMutation.isPending || (!selectedGallery && !formData.imageFile)}
                                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isUploading || createMutation.isPending || updateMutation.isPending
                                            ? "Menyimpan..."
                                            : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && selectedGallery && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/50" onClick={() => setIsDeleteModalOpen(false)}></div>
                        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Hapus Gambar?</h3>
                            <p className="text-gray-500 mb-6">
                                Apakah Anda yakin ingin menghapus &quot;{selectedGallery.title}&quot;? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleteMutation.isPending}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                                >
                                    {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GalleryPage