import { auth } from "@/auth"

const DashboardPage = async () => {
    const session = await auth()

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                {/* Welcome Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Selamat Datang di Dashboard! 🎉
                    </h2>
                    <p className="text-gray-600">
                        Anda berhasil login sebagai <span className="font-semibold">{session?.user?.email}</span>
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Penghuni</p>
                                <p className="text-2xl font-semibold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Donasi</p>
                                <p className="text-2xl font-semibold text-gray-900">Rp 0</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Kegiatan</p>
                                <p className="text-2xl font-semibold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Akun</h3>
                    <div className="space-y-3">
                        <div className="flex border-b pb-3">
                            <span className="text-gray-500 w-32">ID:</span>
                            <span className="text-gray-900">{session?.user?.id}</span>
                        </div>
                        <div className="flex border-b pb-3">
                            <span className="text-gray-500 w-32">Nama:</span>
                            <span className="text-gray-900">{session?.user?.name}</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-500 w-32">Email:</span>
                            <span className="text-gray-900">{session?.user?.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
