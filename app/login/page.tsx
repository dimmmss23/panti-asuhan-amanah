"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const LoginPage = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            })

            if (result?.error) {
                setError("Email atau password salah")
                setLoading(false)
                return
            }

            router.push("/dashboard")
            router.refresh()
        } catch {
            setError("Terjadi kesalahan, silakan coba lagi")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 relative">
            {/* Back Button */}
            <Link 
                href="/"
                className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition duration-200 group"
            >
                <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                    />
                </svg>
                <span className="text-sm sm:text-base font-medium">Kembali</span>
            </Link>

            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Selamat Datang
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Silakan login ke akun Anda
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
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                Ingat saya
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                                Lupa password?
                            </a>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Memproses..." : "Masuk"}
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Belum punya akun?{' '}
                            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage