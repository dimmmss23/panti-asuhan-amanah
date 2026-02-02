"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { uploadImage, deleteImage } from "@/app/libs/supabase-storage"
import Image from "next/image"

interface Legalitas {
    id: number
    jenisdokumen: string | null
    nomordokumen: string | null
    profilId: number
    createdAt: string
    updatedAt: string
}

interface Profil {
    id: number
    AnakAsuh: number
    strukturorganisasi_URL: string
    createdAt: string
    updatedAt: string
    Legalitas: Legalitas[]
}

interface ProfilForm {
    AnakAsuh: number
    strukturFile: File | null
    strukturorganisasi_URL: string
}

interface LegalitasForm {
    jenisdokumen: string
    nomordokumen: string
}

const ProfilPage = () => {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLegalitasModalOpen, setIsLegalitasModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedLegalitas, setSelectedLegalitas] = useState<Legalitas | null>(null)
    const [formData, setFormData] = useState<ProfilForm>({
        AnakAsuh: 0,
        strukturFile: null,
        strukturorganisasi_URL: ""
    })
    const [legalitasForm, setLegalitasForm] = useState<LegalitasForm>({
        jenisdokumen: "",
        nomordokumen: ""
    })
    const [previewUrl, setPreviewUrl] = useState<string>("")
    const [isUploading, setIsUploading] = useState(false)

    // Fetch profil
    const { data, isLoading, error } = useQuery<{ profil: Profil | null; legalitas: Legalitas[] }>({
        queryKey: ["profil"],
        queryFn: async () => {
            const res = await fetch("/api/admin/profil")
            if (!res.ok) throw new Error("Gagal mengambil data")
            return res.json()
        }
    })

    // Create/Update profil mutation
    const profilMutation = useMutation({
        mutationFn: async (formData: { AnakAsuh: number; strukturorganisasi_URL: string }) => {
            const res = await fetch("/api/admin/profil", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            if (!res.ok) throw new Error("Gagal menyimpan profil")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profil"] })
            closeModal()
        }
    })

    // Create legalitas mutation
    const createLegalitasMutation = useMutation({
        mutationFn: async (data: { jenisdokumen: string; nomordokumen: string; profilId: number }) => {
            const res = await fetch("/api/admin/legalitas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Gagal membuat legalitas")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profil"] })
            closeLegalitasModal()
        }
    })

    // Update legalitas mutation
    const updateLegalitasMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: { jenisdokumen: string; nomordokumen: string } }) => {
            const res = await fetch(`/api/admin/legalitas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Gagal mengupdate legalitas")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profil"] })
            closeLegalitasModal()
        }
    })

    // Delete legalitas mutation
    const deleteLegalitasMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/admin/legalitas/${id}`, {
                method: "DELETE"
            })
            if (!res.ok) throw new Error("Gagal menghapus legalitas")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profil"] })
            setIsDeleteModalOpen(false)
            setSelectedLegalitas(null)
        }
    })

    const openEditProfilModal = () => {
        if (data?.profil) {
            setFormData({
                AnakAsuh: data.profil.AnakAsuh,
                strukturFile: null,
                strukturorganisasi_URL: data.profil.strukturorganisasi_URL
            })
            setPreviewUrl(data.profil.strukturorganisasi_URL)
        } else {
            setFormData({ AnakAsuh: 0, strukturFile: null, strukturorganisasi_URL: "" })
            setPreviewUrl("")
        }
        setIsModalOpen(true)
    }

    const openCreateLegalitasModal = () => {
        setSelectedLegalitas(null)
        setLegalitasForm({ jenisdokumen: "", nomordokumen: "" })
        setIsLegalitasModalOpen(true)
    }

    const openEditLegalitasModal = (legalitas: Legalitas) => {
        setSelectedLegalitas(legalitas)
        setLegalitasForm({
            jenisdokumen: legalitas.jenisdokumen || "",
            nomordokumen: legalitas.nomordokumen || ""
        })
        setIsLegalitasModalOpen(true)
    }

    const openDeleteLegalitasModal = (legalitas: Legalitas) => {
        setSelectedLegalitas(legalitas)
        setIsDeleteModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setFormData({ AnakAsuh: 0, strukturFile: null, strukturorganisasi_URL: "" })
        setPreviewUrl("")
    }

    const closeLegalitasModal = () => {
        setIsLegalitasModalOpen(false)
        setSelectedLegalitas(null)
        setLegalitasForm({ jenisdokumen: "", nomordokumen: "" })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData(prev => ({ ...prev, strukturFile: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleProfilSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            let imageUrl = formData.strukturorganisasi_URL

            if (formData.strukturFile) {
                // Delete old image if exists
                if (data?.profil?.strukturorganisasi_URL) {
                    await deleteImage(data.profil.strukturorganisasi_URL)
                }
                // Upload new image
                const uploadedUrl = await uploadImage(formData.strukturFile, "strukturpengurus")
                if (uploadedUrl) {
                    imageUrl = uploadedUrl
                }
            }

            await profilMutation.mutateAsync({
                AnakAsuh: formData.AnakAsuh,
                strukturorganisasi_URL: imageUrl
            })
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleLegalitasSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!data?.profil) {
            alert("Profil belum ada, silakan buat profil terlebih dahulu")
            return
        }

        if (selectedLegalitas) {
            await updateLegalitasMutation.mutateAsync({
                id: selectedLegalitas.id,
                data: legalitasForm
            })
        } else {
            await createLegalitasMutation.mutateAsync({
                ...legalitasForm,
                profilId: data.profil.id
            })
        }
    }

    const handleDeleteLegalitas = async () => {
        if (selectedLegalitas) {
            await deleteLegalitasMutation.mutateAsync(selectedLegalitas.id)
        }
    }

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Gagal memuat data profil
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kelola Profil</h1>
                    <p className="text-gray-600 text-sm mt-1">Edit data profil yayasan dan legalitas</p>
                </div>
            </div>

            {/* Profil Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Data Profil</h2>
                    <button
                        onClick={openEditProfilModal}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        {data?.profil ? "Edit Profil" : "Buat Profil"}
                    </button>
                </div>

                {data?.profil ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Jumlah Anak Asuh</p>
                            <p className="text-2xl font-bold text-green-600">{data.profil.AnakAsuh}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-2">Struktur Organisasi</p>
                            {data.profil.strukturorganisasi_URL && (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                                    <Image
                                        src={data.profil.strukturorganisasi_URL}
                                        alt="Struktur Organisasi"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">Belum ada data profil. Klik tombol di atas untuk membuat.</p>
                )}
            </div>

            {/* Legalitas Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Data Legalitas</h2>
                    <button
                        onClick={openCreateLegalitasModal}
                        disabled={!data?.profil}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Tambah Legalitas
                    </button>
                </div>

                {data?.profil?.Legalitas && data.profil.Legalitas.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Jenis Dokumen</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nomor Dokumen</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.profil.Legalitas.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-800">{item.jenisdokumen}</td>
                                        <td className="py-3 px-4 text-sm text-gray-600">{item.nomordokumen}</td>
                                        <td className="py-3 px-4 text-right">
                                            <button
                                                onClick={() => openEditLegalitasModal(item)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => openDeleteLegalitasModal(item)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">
                        {data?.profil ? "Belum ada data legalitas." : "Buat profil terlebih dahulu untuk menambah legalitas."}
                    </p>
                )}
            </div>

            {/* Modal Edit Profil */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {data?.profil ? "Edit Profil" : "Buat Profil"}
                            </h3>
                        </div>
                        <form onSubmit={handleProfilSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jumlah Anak Asuh
                                </label>
                                <input
                                    type="number"
                                    value={formData.AnakAsuh}
                                    onChange={(e) => setFormData(prev => ({ ...prev, AnakAsuh: Number(e.target.value) }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Struktur Organisasi
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                                {previewUrl && (
                                    <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>
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
                                    disabled={isUploading || profilMutation.isPending}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                                >
                                    {isUploading || profilMutation.isPending ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Legalitas */}
            {isLegalitasModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {selectedLegalitas ? "Edit Legalitas" : "Tambah Legalitas"}
                            </h3>
                        </div>
                        <form onSubmit={handleLegalitasSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jenis Dokumen
                                </label>
                                <input
                                    type="text"
                                    value={legalitasForm.jenisdokumen}
                                    onChange={(e) => setLegalitasForm(prev => ({ ...prev, jenisdokumen: e.target.value }))}
                                    placeholder="Contoh: SK Kemenkumham RI"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nomor Dokumen
                                </label>
                                <input
                                    type="text"
                                    value={legalitasForm.nomordokumen}
                                    onChange={(e) => setLegalitasForm(prev => ({ ...prev, nomordokumen: e.target.value }))}
                                    placeholder="Contoh: Nomor AHU-0026878.AH.01.04.Tahun 2021"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeLegalitasModal}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createLegalitasMutation.isPending || updateLegalitasMutation.isPending}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                                >
                                    {createLegalitasMutation.isPending || updateLegalitasMutation.isPending ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Delete Legalitas */}
            {isDeleteModalOpen && selectedLegalitas && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Hapus Legalitas</h3>
                        <p className="text-gray-600 mb-6">
                            Apakah Anda yakin ingin menghapus legalitas &quot;{selectedLegalitas.jenisdokumen}&quot;?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDeleteLegalitas}
                                disabled={deleteLegalitasMutation.isPending}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                            >
                                {deleteLegalitasMutation.isPending ? "Menghapus..." : "Hapus"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilPage
