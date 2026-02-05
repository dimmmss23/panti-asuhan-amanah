import { auth } from "@/auth"
import prisma from "@/app/libs/prisma"
import Image from "next/image"
import Link from "next/link"

const DashboardPage = async () => {
    const session = await auth()

    // Fetch data untuk statistik
    const [profil, totalGallery, totalKitaBisa, totalUsers] = await Promise.all([
        prisma.profil.findFirst(),
        prisma.gallery.count(),
        prisma.kitaBisa.count(),
        prisma.user.count()
    ])

    return (
        <div className="p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center gap-4">
                        <Image 
                            src="/Logo.png" 
                            alt="Logo" 
                            width={80} 
                            height={80}
                            className="bg-white rounded-full p-2"
                        />
                        <div>
                            <h2 className="text-3xl font-bold mb-2">
                                Selamat Datang, {session?.user?.name}! 👋
                            </h2>
                            <p className="text-indigo-100">
                                Dashboard Admin - Yayasan Panti Asuhan Amanah
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Link href="/dashboard/profil">
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300 cursor-pointer border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Anak Asuh</p>
                                    <p className="text-3xl font-bold text-gray-900">{profil?.AnakAsuh || 0}</p>
                                    <p className="text-xs text-blue-600 mt-2">Lihat profil →</p>
                                </div>
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/gallery">
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300 cursor-pointer border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Foto Galeri</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalGallery}</p>
                                    <p className="text-xs text-purple-600 mt-2">Kelola galeri →</p>
                                </div>
                                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/donasi">
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300 cursor-pointer border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Program KitaBisa</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalKitaBisa}</p>
                                    <p className="text-xs text-green-600 mt-2">Kelola donasi →</p>
                                </div>
                                <div className="p-3 rounded-full bg-green-100 text-green-600">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/users">
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300 cursor-pointer border-l-4 border-orange-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Total Admin</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                                    <p className="text-xs text-orange-600 mt-2">Kelola users →</p>
                                </div>
                                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Info Akun */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Informasi Akun
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-500 w-24 font-medium">Nama:</span>
                                <span className="text-gray-900 font-semibold">{session?.user?.name}</span>
                            </div>
                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-500 w-24 font-medium">Email:</span>
                                <span className="text-gray-900">{session?.user?.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Akses Cepat
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/dashboard/profil" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition duration-200">
                                <div className="text-blue-600 font-semibold mb-1">Profil Panti</div>
                                <div className="text-xs text-gray-600">Edit informasi</div>
                            </Link>
                            <Link href="/dashboard/gallery" className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition duration-200">
                                <div className="text-purple-600 font-semibold mb-1">Galeri</div>
                                <div className="text-xs text-gray-600">Kelola foto</div>
                            </Link>
                            <Link href="/dashboard/donasi" className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition duration-200">
                                <div className="text-green-600 font-semibold mb-1">Donasi</div>
                                <div className="text-xs text-gray-600">Atur metode</div>
                            </Link>
                            <Link href="/dashboard/users" className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition duration-200">
                                <div className="text-orange-600 font-semibold mb-1">Users</div>
                                <div className="text-xs text-gray-600">Kelola admin</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
