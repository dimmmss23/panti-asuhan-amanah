"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { uploadImage, deleteImage } from "@/app/libs/supabase-storage"
import Image from "next/image"

// Types
interface Donasi {
    id: number
    namaBank: string
    nomorRekening: string
    atasNama: string
    logoUrl: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

interface Qris {
    id: number
    nama: string
    imageUrl: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

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

type ActiveTab = 'bank' | 'qris' | 'kitabisa'

const DonasiAdminPage = () => {
    const queryClient = useQueryClient()
    const [activeTab, setActiveTab] = useState<ActiveTab>('bank')

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [modalType, setModalType] = useState<ActiveTab>('bank')

    // Selected items for edit/delete
    const [selectedDonasi, setSelectedDonasi] = useState<Donasi | null>(null)
    const [selectedQris, setSelectedQris] = useState<Qris | null>(null)
    const [selectedKitaBisa, setSelectedKitaBisa] = useState<KitaBisa | null>(null)

    // Form states
    const [donasiForm, setDonasiForm] = useState({
        namaBank: '',
        nomorRekening: '',
        atasNama: '',
        logoFile: null as File | null,
        logoUrl: '',
        isActive: true
    })

    const [qrisForm, setQrisForm] = useState({
        nama: '',
        imageFile: null as File | null,
        imageUrl: '',
        isActive: true
    })

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

    // Fetch queries
    const { data: donasiList, isLoading: loadingDonasi } = useQuery<Donasi[]>({
        queryKey: ['donasi'],
        queryFn: async () => {
            const res = await fetch('/api/admin/donasi')
            if (!res.ok) throw new Error('Gagal mengambil data')
            return res.json()
        }
    })

    const { data: qrisList, isLoading: loadingQris } = useQuery<Qris[]>({
        queryKey: ['qris'],
        queryFn: async () => {
            const res = await fetch('/api/admin/qris')
            if (!res.ok) throw new Error('Gagal mengambil data')
            return res.json()
        }
    })

    const { data: kitaBisaList, isLoading: loadingKitaBisa } = useQuery<KitaBisa[]>({
        queryKey: ['kitabisa'],
        queryFn: async () => {
            const res = await fetch('/api/admin/kitabisa')
            if (!res.ok) throw new Error('Gagal mengambil data')
            return res.json()
        }
    })

    // Mutations for Donasi
    const createDonasiMutation = useMutation({
        mutationFn: async (data: Omit<Donasi, 'id' | 'createdAt' | 'updatedAt'>) => {
            const res = await fetch('/api/admin/donasi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error('Gagal membuat donasi')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donasi'] })
            closeModal()
        }
    })

    const updateDonasiMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Donasi> }) => {
            const res = await fetch(`/api/admin/donasi/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error('Gagal mengupdate donasi')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donasi'] })
            closeModal()
        }
    })

    const deleteDonasiMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/admin/donasi/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Gagal menghapus donasi')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donasi'] })
            setIsDeleteModalOpen(false)
            setSelectedDonasi(null)
        }
    })

    // Mutations for QRIS
    const createQrisMutation = useMutation({
        mutationFn: async (data: Omit<Qris, 'id' | 'createdAt' | 'updatedAt'>) => {
            const res = await fetch('/api/admin/qris', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error('Gagal membuat QRIS')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qris'] })
            closeModal()
        }
    })

    const updateQrisMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Qris> }) => {
            const res = await fetch(`/api/admin/qris/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error('Gagal mengupdate QRIS')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qris'] })
            closeModal()
        }
    })

    const deleteQrisMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/admin/qris/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Gagal menghapus QRIS')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qris'] })
            setIsDeleteModalOpen(false)
            setSelectedQris(null)
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

    // Modal handlers
    const openCreateModal = (type: ActiveTab) => {
        setModalType(type)
        setSelectedDonasi(null)
        setSelectedQris(null)
        setSelectedKitaBisa(null)
        resetForms()
        setIsModalOpen(true)
    }

    const openEditModal = (type: ActiveTab, item: Donasi | Qris | KitaBisa) => {
        setModalType(type)
        setPreviewUrl('')

        if (type === 'bank') {
            const donasi = item as Donasi
            setSelectedDonasi(donasi)
            setDonasiForm({
                namaBank: donasi.namaBank,
                nomorRekening: donasi.nomorRekening,
                atasNama: donasi.atasNama,
                logoFile: null,
                logoUrl: donasi.logoUrl,
                isActive: donasi.isActive
            })
            setPreviewUrl(donasi.logoUrl)
        } else if (type === 'qris') {
            const qris = item as Qris
            setSelectedQris(qris)
            setQrisForm({
                nama: qris.nama,
                imageFile: null,
                imageUrl: qris.imageUrl,
                isActive: qris.isActive
            })
            setPreviewUrl(qris.imageUrl)
        } else {
            const kitabisa = item as KitaBisa
            setSelectedKitaBisa(kitabisa)
            setKitaBisaForm({
                namaProgram: kitabisa.namaProgram,
                deskripsi: kitabisa.deskripsi,
                imageFile: null,
                imageUrl: kitabisa.imageUrl,
                linkKitaBisa: kitabisa.linkKitaBisa,
                isActive: kitabisa.isActive
            })
            setPreviewUrl(kitabisa.imageUrl)
        }

        setIsModalOpen(true)
    }

    const openDeleteModal = (type: ActiveTab, item: Donasi | Qris | KitaBisa) => {
        setModalType(type)
        if (type === 'bank') setSelectedDonasi(item as Donasi)
        else if (type === 'qris') setSelectedQris(item as Qris)
        else setSelectedKitaBisa(item as KitaBisa)
        setIsDeleteModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedDonasi(null)
        setSelectedQris(null)
        setSelectedKitaBisa(null)
        resetForms()
    }

    const resetForms = () => {
        setDonasiForm({
            namaBank: '',
            nomorRekening: '',
            atasNama: '',
            logoFile: null,
            logoUrl: '',
            isActive: true
        })
        setQrisForm({
            nama: '',
            imageFile: null,
            imageUrl: '',
            isActive: true
        })
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: ActiveTab) => {
        const file = e.target.files?.[0]
        if (file) {
            if (type === 'bank') {
                setDonasiForm({ ...donasiForm, logoFile: file })
            } else if (type === 'qris') {
                setQrisForm({ ...qrisForm, imageFile: file })
            } else {
                setKitaBisaForm({ ...kitaBisaForm, imageFile: file })
            }
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            if (modalType === 'bank') {
                let logoUrl = donasiForm.logoUrl

                if (donasiForm.logoFile) {
                    if (selectedDonasi?.logoUrl) {
                        await deleteImage(selectedDonasi.logoUrl)
                    }
                    logoUrl = await uploadImage(donasiForm.logoFile, 'Donasi') || ''
                }

                if (!logoUrl) {
                    alert('Gagal mengupload gambar')
                    return
                }

                const data = {
                    namaBank: donasiForm.namaBank,
                    nomorRekening: donasiForm.nomorRekening,
                    atasNama: donasiForm.atasNama,
                    logoUrl,
                    isActive: donasiForm.isActive
                }

                if (selectedDonasi) {
                    await updateDonasiMutation.mutateAsync({ id: selectedDonasi.id, data })
                } else {
                    await createDonasiMutation.mutateAsync(data)
                }
            } else if (modalType === 'qris') {
                let imageUrl = qrisForm.imageUrl

                if (qrisForm.imageFile) {
                    if (selectedQris?.imageUrl) {
                        await deleteImage(selectedQris.imageUrl)
                    }
                    imageUrl = await uploadImage(qrisForm.imageFile, 'Donasi') || ''
                }

                if (!imageUrl) {
                    alert('Gagal mengupload gambar')
                    return
                }

                const data = {
                    nama: qrisForm.nama || 'QRIS Donasi',
                    imageUrl,
                    isActive: qrisForm.isActive
                }

                if (selectedQris) {
                    await updateQrisMutation.mutateAsync({ id: selectedQris.id, data })
                } else {
                    await createQrisMutation.mutateAsync(data)
                }
            } else {
                let imageUrl = kitaBisaForm.imageUrl

                if (kitaBisaForm.imageFile) {
                    if (selectedKitaBisa?.imageUrl) {
                        await deleteImage(selectedKitaBisa.imageUrl)
                    }
                    imageUrl = await uploadImage(kitaBisaForm.imageFile, 'Donasi') || ''
                }

                if (!imageUrl) {
                    alert('Gagal mengupload gambar')
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
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Terjadi kesalahan')
        } finally {
            setIsUploading(false)
        }
    }

    const handleDelete = async () => {
        try {
            if (modalType === 'bank' && selectedDonasi) {
                if (selectedDonasi.logoUrl) {
                    await deleteImage(selectedDonasi.logoUrl)
                }
                await deleteDonasiMutation.mutateAsync(selectedDonasi.id)
            } else if (modalType === 'qris' && selectedQris) {
                if (selectedQris.imageUrl) {
                    await deleteImage(selectedQris.imageUrl)
                }
                await deleteQrisMutation.mutateAsync(selectedQris.id)
            } else if (modalType === 'kitabisa' && selectedKitaBisa) {
                if (selectedKitaBisa.imageUrl) {
                    await deleteImage(selectedKitaBisa.imageUrl)
                }
                await deleteKitaBisaMutation.mutateAsync(selectedKitaBisa.id)
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Gagal menghapus data')
        }
    }

    const isLoading = loadingDonasi || loadingQris || loadingKitaBisa

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Kelola Donasi</h1>
                <p className="text-gray-600 mt-2">Atur rekening bank, QRIS, dan program KitaBisa</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('bank')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'bank'
                            ? 'border-emerald-500 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Rekening Bank
                </button>
                <button
                    onClick={() => setActiveTab('qris')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'qris'
                            ? 'border-emerald-500 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    QRIS
                </button>
                <button
                    onClick={() => setActiveTab('kitabisa')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'kitabisa'
                            ? 'border-emerald-500 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    KitaBisa
                </button>
            </div>

            {/* Add Button */}
            <div className="mb-6">
                <button
                    onClick={() => openCreateModal(activeTab)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Tambah {activeTab === 'bank' ? 'Rekening Bank' : activeTab === 'qris' ? 'QRIS' : 'Program KitaBisa'}
                </button>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
            ) : (
                <>
                    {/* Bank Accounts Tab */}
                    {activeTab === 'bank' && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {donasiList?.map((donasi) => (
                                <div key={donasi.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-4">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative w-16 h-10 bg-gray-50 rounded overflow-hidden">
                                                <Image
                                                    src={donasi.logoUrl}
                                                    alt={donasi.namaBank}
                                                    fill
                                                    sizes="200px"
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{donasi.namaBank}</h3>
                                                <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${donasi.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {donasi.isActive ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <p className="text-gray-600">
                                                <span className="text-gray-400">No. Rekening:</span>
                                                <br />
                                                <span className="font-mono font-semibold text-gray-900">{donasi.nomorRekening}</span>
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="text-gray-400">Atas Nama:</span>
                                                <br />
                                                <span className="font-medium text-gray-900">{donasi.atasNama}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex border-t border-gray-100">
                                        <button
                                            onClick={() => openEditModal('bank', donasi)}
                                            className="flex-1 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal('bank', donasi)}
                                            className="flex-1 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-l border-gray-100"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {donasiList?.length === 0 && (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    Belum ada rekening bank. Klik tombol &quot;Tambah&quot; untuk menambahkan.
                                </div>
                            )}
                        </div>
                    )}

                    {/* QRIS Tab */}
                    {activeTab === 'qris' && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {qrisList?.map((qris) => (
                                <div key={qris.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-4">
                                        <div className="relative aspect-square w-full max-w-[200px] mx-auto bg-white rounded-lg overflow-hidden mb-4">
                                            <Image
                                                src={qris.imageUrl}
                                                alt={qris.nama}
                                                fill
                                                sizes="200px"
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-semibold text-gray-900">{qris.nama}</h3>
                                            <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${qris.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {qris.isActive ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex border-t border-gray-100">
                                        <button
                                            onClick={() => openEditModal('qris', qris)}
                                            className="flex-1 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal('qris', qris)}
                                            className="flex-1 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-l border-gray-100"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {qrisList?.length === 0 && (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    Belum ada QRIS. Klik tombol &quot;Tambah&quot; untuk menambahkan.
                                </div>
                            )}
                        </div>
                    )}

                    {/* KitaBisa Tab */}
                    {activeTab === 'kitabisa' && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {kitaBisaList?.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="relative aspect-video w-full bg-gray-100">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.namaProgram}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="font-semibold text-gray-900">{item.namaProgram}</h3>
                                            <span className={`shrink-0 px-2 py-0.5 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {item.isActive ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.deskripsi}</p>
                                        <a
                                            href={item.linkKitaBisa}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline truncate block"
                                        >
                                            {item.linkKitaBisa}
                                        </a>
                                    </div>
                                    <div className="flex border-t border-gray-100">
                                        <button
                                            onClick={() => openEditModal('kitabisa', item)}
                                            className="flex-1 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal('kitabisa', item)}
                                            className="flex-1 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-l border-gray-100"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {kitaBisaList?.length === 0 && (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    Belum ada program KitaBisa. Klik tombol &quot;Tambah&quot; untuk menambahkan.
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {modalType === 'bank'
                                    ? (selectedDonasi ? 'Edit Rekening Bank' : 'Tambah Rekening Bank')
                                    : modalType === 'qris'
                                        ? (selectedQris ? 'Edit QRIS' : 'Tambah QRIS')
                                        : (selectedKitaBisa ? 'Edit Program KitaBisa' : 'Tambah Program KitaBisa')
                                }
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Bank Form */}
                            {modalType === 'bank' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Bank</label>
                                        <input
                                            type="text"
                                            value={donasiForm.namaBank}
                                            onChange={(e) => setDonasiForm({ ...donasiForm, namaBank: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Contoh: Bank BRI"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Rekening</label>
                                        <input
                                            type="text"
                                            value={donasiForm.nomorRekening}
                                            onChange={(e) => setDonasiForm({ ...donasiForm, nomorRekening: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Contoh: 574601037734534"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Atas Nama</label>
                                        <input
                                            type="text"
                                            value={donasiForm.atasNama}
                                            onChange={(e) => setDonasiForm({ ...donasiForm, atasNama: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Contoh: Panti Asuhan Amanah"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Logo Bank</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'bank')}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            required={!selectedDonasi}
                                        />
                                        {previewUrl && (
                                            <div className="mt-2 relative w-32 h-16 bg-gray-50 rounded overflow-hidden">
                                                <Image src={previewUrl} alt="Preview" fill sizes="200px" className="object-contain" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isActiveDonasi"
                                            checked={donasiForm.isActive}
                                            onChange={(e) => setDonasiForm({ ...donasiForm, isActive: e.target.checked })}
                                            className="rounded text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <label htmlFor="isActiveDonasi" className="text-sm text-gray-700">Aktifkan rekening ini</label>
                                    </div>
                                </>
                            )}

                            {/* QRIS Form */}
                            {modalType === 'qris' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama QRIS</label>
                                        <input
                                            type="text"
                                            value={qrisForm.nama}
                                            onChange={(e) => setQrisForm({ ...qrisForm, nama: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Contoh: QRIS Donasi Panti Asuhan"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gambar QRIS</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'qris')}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            required={!selectedQris}
                                        />
                                        {previewUrl && (
                                            <div className="mt-2 relative w-48 h-48 bg-white border rounded overflow-hidden mx-auto">
                                                <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isActiveQris"
                                            checked={qrisForm.isActive}
                                            onChange={(e) => setQrisForm({ ...qrisForm, isActive: e.target.checked })}
                                            className="rounded text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <label htmlFor="isActiveQris" className="text-sm text-gray-700">Aktifkan QRIS ini</label>
                                    </div>
                                </>
                            )}

                            {/* KitaBisa Form */}
                            {modalType === 'kitabisa' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Program</label>
                                        <input
                                            type="text"
                                            value={kitaBisaForm.namaProgram}
                                            onChange={(e) => setKitaBisaForm({ ...kitaBisaForm, namaProgram: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Contoh: Bantu Anak Yatim Panti Amanah"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                        <textarea
                                            value={kitaBisaForm.deskripsi}
                                            onChange={(e) => setKitaBisaForm({ ...kitaBisaForm, deskripsi: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            rows={3}
                                            placeholder="Deskripsi singkat program donasi..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Link KitaBisa</label>
                                        <input
                                            type="url"
                                            value={kitaBisaForm.linkKitaBisa}
                                            onChange={(e) => setKitaBisaForm({ ...kitaBisaForm, linkKitaBisa: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="https://kitabisa.com/campaign/..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Program</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'kitabisa')}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            required={!selectedKitaBisa}
                                        />
                                        {previewUrl && (
                                            <div className="mt-2 relative w-full aspect-video bg-gray-100 rounded overflow-hidden">
                                                <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isActiveKitaBisa"
                                            checked={kitaBisaForm.isActive}
                                            onChange={(e) => setKitaBisaForm({ ...kitaBisaForm, isActive: e.target.checked })}
                                            className="rounded text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <label htmlFor="isActiveKitaBisa" className="text-sm text-gray-700">Aktifkan program ini</label>
                                    </div>
                                </>
                            )}

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
                                    disabled={isUploading}
                                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Konfirmasi Hapus</h3>
                            <p className="text-gray-600 text-center">
                                Apakah Anda yakin ingin menghapus {
                                    modalType === 'bank' ? `rekening ${selectedDonasi?.namaBank}` :
                                        modalType === 'qris' ? `QRIS ${selectedQris?.nama}` :
                                            `program ${selectedKitaBisa?.namaProgram}`
                                }? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex border-t border-gray-100">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-l border-gray-100"
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
