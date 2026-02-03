"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// Types
interface User {
    id: number
    name: string
    email: string
    createdAt: string
    updatedAt: string
}

interface UserFormData {
    name: string
    email: string
    password: string
}

const UsersAdminPage = () => {
    const queryClient = useQueryClient()
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [deletingUser, setDeletingUser] = useState<User | null>(null)
    
    // Form states
    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState<string | null>(null)

    // Fetch users
    const { data: users = [], isLoading } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("/api/admin/users")
            if (!res.ok) throw new Error("Failed to fetch users")
            return res.json()
        }
    })

    // Create user mutation
    const createMutation = useMutation({
        mutationFn: async (data: UserFormData) => {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error || "Gagal membuat user")
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            closeModal()
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    // Update user mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UserFormData }) => {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error || "Gagal mengupdate user")
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            closeModal()
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    // Delete user mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "DELETE"
            })
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error || "Gagal menghapus user")
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            setIsDeleteModalOpen(false)
            setDeletingUser(null)
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    // Handlers
    const openCreateModal = () => {
        setEditingUser(null)
        setFormData({ name: "", email: "", password: "" })
        setError(null)
        setIsModalOpen(true)
    }

    const openEditModal = (user: User) => {
        setEditingUser(user)
        setFormData({ name: user.name, email: user.email, password: "" })
        setError(null)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingUser(null)
        setFormData({ name: "", email: "", password: "" })
        setError(null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!formData.name || !formData.email) {
            setError("Nama dan email wajib diisi")
            return
        }

        if (!editingUser && !formData.password) {
            setError("Password wajib diisi untuk user baru")
            return
        }

        if (editingUser) {
            updateMutation.mutate({ id: editingUser.id, data: formData })
        } else {
            createMutation.mutate(formData)
        }
    }

    const handleDelete = () => {
        if (deletingUser) {
            deleteMutation.mutate(deletingUser.id)
        }
    }

    return (
        <div className="p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Kelola Users
                    </h1>
                    <p className="text-gray-600">
                        Kelola akun user yang memiliki akses ke dashboard admin
                    </p>
                </div>

                {/* Add Button */}
                <div className="mb-6">
                    <button
                        onClick={openCreateModal}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                        + Tambah User Baru
                    </button>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Dibuat
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            Memuat data...
                                        </td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            Belum ada user
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {user.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(user.createdAt).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric"
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDeletingUser(user)
                                                            setIsDeleteModalOpen(true)
                                                        }}
                                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Create/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {editingUser ? "Edit User" : "Tambah User Baru"}
                                </h2>

                                {error && (
                                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Nama */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Nama lengkap"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="user@email.com"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password {!editingUser && <span className="text-red-500">*</span>}
                                            {editingUser && <span className="text-gray-500 text-xs">(kosongkan jika tidak ingin mengubah)</span>}
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Minimal 6 karakter"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                                            disabled={createMutation.isPending || updateMutation.isPending}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
                                            disabled={createMutation.isPending || updateMutation.isPending}
                                        >
                                            {createMutation.isPending || updateMutation.isPending
                                                ? "Menyimpan..."
                                                : editingUser
                                                ? "Update"
                                                : "Simpan"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && deletingUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Konfirmasi Hapus
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Apakah Anda yakin ingin menghapus user <strong>{deletingUser.name}</strong>?
                                Tindakan ini tidak dapat dibatalkan.
                            </p>

                            {error && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setIsDeleteModalOpen(false)
                                        setDeletingUser(null)
                                        setError(null)
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                                    disabled={deleteMutation.isPending}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 disabled:opacity-50"
                                    disabled={deleteMutation.isPending}
                                >
                                    {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UsersAdminPage
