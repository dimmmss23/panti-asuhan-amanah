import Navbar from "../components/Navbar"
import GlobeKontak from "../components/GlobeKontak"
import Footer from "../components/Footer"
import FAQ from "../components/FAQ"
import Link from "next/link"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow pt-16">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-green-600 to-teal-500 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>
                    <div className="relative max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
                            Hubungi Kami
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-green-100">
                            Kami siap mendengar dari Anda. Jangan ragu untuk menghubungi kami untuk pertanyaan, donasi, atau dukungan.
                        </p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16 space-y-8">
                    

                    {/* Contact Channels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <Link href="mailto:yayasanpantiasuhanamanah@gmail.com" className="flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 text-red-500 mr-5 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                                <p className="text-gray-500 text-sm mt-1">Kirim pesan kapan saja</p>
                            </div>
                            <div className="text-gray-300 group-hover:text-red-500 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>

                        {/* WhatsApp */}
                        <Link href="https://wa.me/6282180458885" target="_blank" className="flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 text-green-500 mr-5 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-gray-900 text-lg">WhatsApp</h3>
                                <p className="text-gray-500 text-sm mt-1">Chat langsung dengan kami</p>
                            </div>
                            <div className="text-gray-300 group-hover:text-green-500 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    {/* Globe Section */}
                    <GlobeKontak />

                    {/* Maps Section Title */}
                    <div className="text-center pt-8 pb-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                            Lokasi Detail Panti Asuhan Amanah
                        </h2>
                        <div className="w-20 h-1 bg-green-600 mx-auto rounded-full" />
                        <p className="text-gray-600 mt-4 max-w-lg mx-auto">
                            Kunjungi kami di salah satu lokasi berikut
                        </p>
                    </div>

                    {/* Location A */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-6 bg-green-50/50 border-b border-green-100 flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-green-900 text-lg">Panti Asuhan Amanah (A)</h3>
                                <p className="text-gray-600 text-sm mt-1">Jl. Bambang Utoyo, Jl. Pusaka No.76, Kota Palembang</p>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-green-100">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs text-green-700 font-medium">Buka 08.00 - 17.00 WIB</span>
                            </div>
                        </div>
                        {/* Map Frame A */}
                        <div className="h-64 bg-gray-200 relative">
                            <iframe
                                title="Map A"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://maps.google.com/maps?q=Yayasan+panti+asuhan+amanah+dan+rumah+Tahfidz+Qur'an&z=15&output=embed`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Location B */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-6 bg-orange-50/50 border-b border-orange-100 flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-orange-900 text-lg">Panti Asuhan Amanah (B)</h3>
                                <p className="text-gray-600 text-sm mt-1">Jl. Lb. Rejo, Sekip Jaya, Kec. Kemuning, Kota Palembang</p>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-orange-100">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs text-green-700 font-medium">Buka 08.00 - 17.00 WIB</span>
                            </div>
                        </div>
                        {/* Map Frame B */}
                        <div className="h-64 bg-gray-200">
                            <iframe
                                title="Map B"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://maps.google.com/maps?q=Jl.+Lb.+Rejo,+Sekip+Jaya,+Palembang&z=15&output=embed`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* FAQ/Other Info */}
                    <div className="pt-8">
                        <FAQ />
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )
}
