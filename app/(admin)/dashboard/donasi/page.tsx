"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { uploadImage, deleteImage } from "@/app/libs/supabase-storage"
import Image from "next/image"

// Types
interface KitaBisa {
    id: number
    namaProgram: string
    deskripsi: string
    imageUrl: string
    linkKitaBisa: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

const DonasiAdminPage = () => {
    const queryClient = useQueryClient()

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    // Selected item for edit/delete
    const [selectedKitaBisa, setSelectedKitaBisa] = useState<KitaBisa | null>(null)

    // Form state
    const [kitaBisaForm, setKitaBisaForm] = useState({
        namaProgram: '',
        deskripsi: '',
        imageFile: null as File | null,
        imageUrl: '',
        linkKitaBisa: '',
        isActive: true
    })

    const [previewUrl, setPreviewUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    // Fetch KitaBisa
    const { data: kitaBisaList, isLoading: loadingKitaBisa } = useQuery<KitaBisa[]>({
        queryKey: ['kitabisa'],
        queryFn: async () => {
            const res = await fetch('/api/admin/kitabisa')
            if (!res.ok) throw new Error('Gagal mengambil data')
            return res.json()
        }
    })

    // Mutations for KitaBisa
    const createKitaBisaMutation = useMutation({
        mutationFn: async (data: Omit<KitaBisa, 'id' | 'createdAt' | 'updatedAt'>) => {
            const res = await fetch('/api/admin/kitabisa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error('Gagal membuat KitaBisa')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kitabisa'] })
            closeModal()
        }
    })

    const updateKitaBisaMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<KitaBisa> }) => {
            const res = await fetch(`/api/admin/kitabisa/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error('Gagal mengupdate KitaBisa')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kitabisa'] })
            closeModal()
        }
    })

    const deleteKitaBisaMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/admin/kitabisa/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Gagal menghapus KitaBisa')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kitabisa'] })
            setIsDeleteModalOpen(false)
            setSelectedKitaBisa(null)
        }
    })

    // Handle functions
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setKitaBisaForm(prev => ({ ...prev, imageFile: file }))
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleUploadImage = async (file: File): Promise<string> => {
        try {
            setIsUploading(true)
            const url = await uploadImage(file, 'kitabisa')
            if (!url) {
                throw new Error('Gagal meng-upload gambar')
            }
            return url
        } catch (error) {
            console.error('Error uploading:', error)
            throw error
        } finally {
            setIsUploading(false)
        }
    }

    const openAddModal = () => {
        setSelectedKitaBisa(null)
        setKitaBisaForm({
            namaProgram: '',
            deskripsi: '',
            imageFile: null,
            imageUrl: '',
            linkKitaBisa: '',
            isActive: true
        })
        setPreviewUrl('')
        setIsModalOpen(true)
    }

    const openEditModal = (item: KitaBisa) => {
        setSelectedKitaBisa(item)
        setKitaBisaForm({
            namaProgram: item.namaProgram,
            deskripsi: item.deskripsi,
            imageFile: null,
            imageUrl: item.imageUrl,
            linkKitaBisa: item.linkKitaBisa,
            isActive: item.isActive
        })
        setPreviewUrl(item.imageUrl)
        setIsModalOpen(true)
    }

    const openDeleteModal = (item: KitaBisa) => {
        setSelectedKitaBisa(item)
        setIsDeleteModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedKitaBisa(null)
        setKitaBisaForm({
            namaProgram: '',
            deskripsi: '',
            imageFile: null,
            imageUrl: '',
            linkKitaBisa: '',
            isActive: true
        })
        setPreviewUrl('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            let imageUrl = kitaBisaForm.imageUrl

            // Upload image if new file selected
            if (kitaBisaForm.imageFile) {
                imageUrl = await handleUploadImage(kitaBisaForm.imageFile)
            }

            if (!imageUrl) {
                alert('Gambar wajib diisi')
                return
            }

            const data = {
                namaProgram: kitaBisaForm.namaProgram,
                deskripsi: kitaBisaForm.deskripsi,
                imageUrl,
                linkKitaBisa: kitaBisaForm.linkKitaBisa,
                isActive: kitaBisaForm.isActive
            }

            if (selectedKitaBisa) {
                await updateKitaBisaMutation.mutateAsync({ id: selectedKitaBisa.id, data })
            } else {
                await createKitaBisaMutation.mutateAsync(data)
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Gagal menyimpan data')
        }
    }

    const handleDelete = async () => {
        if (!selectedKitaBisa) return

        try {
            // Delete image from storage
            if (selectedKitaBisa.imageUrl) {
                await deleteImage(selectedKitaBisa.imageUrl)
            }

            await deleteKitaBisaMutation.mutateAsync(selectedKitaBisa.id)
        } catch (error) {
            console.error('Error:', error)
            alert('Gagal menghapus data')
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Donasi</h1>
                </div>
                
                {/* Info Alert */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <div className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-sm text-blue-700">
                                <strong>Informasi Keamanan:</strong> Data rekening bank dan QRIS telah dijadikan statis untuk keamanan. 
                                Hanya program KitaBisa yang dapat dikelola melalui dashboard ini.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Static Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Bank Account Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Rekening Bank</h3>
                            <p className="text-sm text-gray-600">Data Statis (Aman)</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <p className="text-sm text-gray-600 mb-1">BRI</p>
                        <p className="font-bold text-lg text-gray-800">574601037734534</p>
                        <p className="text-sm text-gray-600 mt-1">a.n. PANTI ASUHAN AMANAH</p>
                    </div>
                </div>

                {/* QRIS Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">QRIS</h3>
                            <p className="text-sm text-gray-600">Data Statis (Aman)</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                        <p className="text-sm text-gray-600 mb-2">QRIS Panti Asuhan Amanah</p>
                        <div className="flex items-center gap-2 text-green-700">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">File: /Qris.png</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* KitaBisa Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">Program KitaBisa</h2>
                        <button
                            onClick={openAddModal}
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                        >
                            + Tambah Program
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {loadingKitaBisa ? (
                        <div className="text-center py-8 text-gray-500">Memuat data...</div>
                    ) : kitaBisaList && kitaBisaList.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {kitaBisaList.map((item) => (
                                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="relative h-48 bg-gray-100">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.namaProgram}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {item.isActive ? 'Aktif' : 'Nonaktif'}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">{item.namaProgram}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.deskripsi}</p>
                                        <a
                                            href={item.linkKitaBisa}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-orange-600 hover:text-orange-700 mb-4 block truncate"
                                        >
                                            {item.linkKitaBisa}
                                        </a>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(item)}
                                                className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(item)}
                                                className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">Belum ada program KitaBisa</div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {selectedKitaBisa ? 'Edit Program KitaBisa' : 'Tambah Program KitaBisa'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Program</label>
                                <input
                                    type="text"
                                    value={kitaBisaForm.namaProgram}
                                    onChange={(e) => setKitaBisaForm(prev => ({ ...prev, namaProgram: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                                <textarea
                                    value={kitaBisaForm.deskripsi}
                                    onChange={(e) => setKitaBisaForm(prev => ({ ...prev, deskripsi: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Link KitaBisa</label>
                                <input
                                    type="url"
                                    value={kitaBisaForm.linkKitaBisa}
                                    onChange={(e) => setKitaBisaForm(prev => ({ ...prev, linkKitaBisa: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="https://kitabisa.com/..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                                {previewUrl && (
                                    <div className="mt-2 relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                        <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={kitaBisaForm.isActive}
                                    onChange={(e) => setKitaBisaForm(prev => ({ ...prev, isActive: e.target.checked }))}
                                    className="w-4 h-4 text-orange-600 rounded"
                                />
                                <label className="text-sm text-gray-700">Aktifkan program ini</label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
                                >
                                    {isUploading ? 'Meng-upload...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && selectedKitaBisa && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Hapus Program?</h3>
                        <p className="text-gray-600 mb-6">
                            Apakah Anda yakin ingin menghapus program <strong>{selectedKitaBisa.namaProgram}</strong>?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false)
                                    setSelectedKitaBisa(null)
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DonasiAdminPage
