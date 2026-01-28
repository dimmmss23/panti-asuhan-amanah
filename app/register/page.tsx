"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const RegisterPage = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string

        // Validasi password
        if (password !== confirmPassword) {
            setError("Password tidak cocok")
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError("Password minimal 6 karakter")
            setLoading(false)
            return
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Terjadi kesalahan")
                setLoading(false)
                return
            }

            // Redirect ke halaman login setelah berhasil register
            router.push("/login?registered=true")
        } catch {
            setError("Terjadi kesalahan, silakan coba lagi")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Buat Akun Baru
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Daftar untuk mulai menggunakan layanan kami
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                placeholder="nama@email.com"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Konfirmasi Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Memproses..." : "Daftar"}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Sudah punya akun?{' '}
                            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                                Masuk sekarang
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
