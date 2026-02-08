"use client"

import Navbar from "../components/Navbar"
import GlobeKontak from "../components/GlobeKontak"
import Footer from "../components/Footer"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"


export default function ContactPage() {
    const [loadMapA, setLoadMapA] = useState(false);
    const [loadMapB, setLoadMapB] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow pt-0">
                {/* Hero Section - Islamic Elegant Theme */}
                <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800">
                    {/* Islamic Geometric Pattern Overlay - Simplified */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }} />

                    {/* Decorative Glow Effects - Removed blur */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full" />

                    {/* Gold Accent Lines */}
                    <div className="absolute top-10 left-0 right-0 flex justify-center">
                        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                    </div>
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            {/* Decorative Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                    <svg className="w-8 h-8 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight mb-4">
                                Hubungi Kami
                            </h1>

                            {/* Decorative Divider */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400/70" />
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400/70" />
                            </div>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
                                Kami siap mendengar dari Anda. Jangan ragu untuk menghubungi kami untuk pertanyaan, donasi, atau dukungan.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 54" fill="none" preserveAspectRatio="none">
                            <path d="M0 22L60 16.7C120 11 240 1 360 0.3C480 0 600 11 720 16.7C840 22 960 22 1080 19.3C1200 16 1320 11 1380 8.3L1440 6V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" fill="#f9fafb" />
                        </svg>
                    </div>
                </section>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-16 space-y-8">

                    {/* Contact Channels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Email */}
                        <div>
                            <Link href="mailto:yayasanpantiasuhanamanah@gmail.com" className="relative block h-full bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-green-200 transition-all duration-300 group">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500" />
                                <div className="flex items-center p-5">
                                    <div className="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 text-green-500 mr-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-900 text-sm">Email</h3>
                                        <p className="text-gray-500 text-xs mt-0.5">Kirim pesan kapan saja</p>
                                    </div>
                                    <div className="text-gray-300 group-hover:text-green-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <Link href="https://wa.me/6282180458885" target="_blank" className="relative block h-full bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-green-200 transition-all duration-300 group">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500" />
                                <div className="flex items-center p-5">
                                    <div className="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 text-green-500 mr-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-900 text-sm">WhatsApp</h3>
                                        <p className="text-gray-500 text-xs mt-0.5">Chat langsung dengan kami</p>
                                    </div>
                                    <div className="text-gray-300 group-hover:text-green-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Globe Section */}
                    <GlobeKontak />

                    {/* Maps Section Title */}
                    <div className="text-center pt-8 pb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md border border-green-100 mb-3">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Alamat Lengkap
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            Lokasi Panti Asuhan Amanah
                        </h2>
                        <div className="w-12 h-0.5 bg-green-600 mx-auto rounded-full" />
                        <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">
                            Kunjungi kami di salah satu lokasi berikut
                        </p>
                    </div>

                    {/* Locations Container */}
                    <div className="space-y-6">
                        {/* Location A */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm">Panti Asuhan Amanah (A)</h3>
                                    <p className="text-gray-500 text-xs mt-1">Jl. Bambang Utoyo, Jl. Pusaka No.76, Kota Palembang</p>
                                </div>
                                <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-green-700 font-medium">08.00 - 17.00 WIB</span>
                                </div>
                            </div>
                            <div className="h-56 bg-gray-100 relative">
                                {loadMapA ? (
                                    <iframe
                                        title="Map A"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.5!2d104.7826551!3d-2.9702901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b7716622a1e0f%3A0x7e549b1ff3e7943a!2sYayasan%20panti%20asuhan%20amanah%20dan%20rumah%20Tahfidz%20Qur'an!5e0!3m2!1sid!2sid!4v1706900000000!5m2!1sid!2sid`}
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <button
                                        onClick={() => setLoadMapA(true)}
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Klik untuk muat peta</span>
                                    </button>
                                )}
                            </div>
                            <div className="p-4 border-t border-gray-100">
                                <Link
                                    href="https://maps.app.goo.gl/uU2VEEUtDsKhDWuX9"
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Buka di Google Maps
                                </Link>
                            </div>
                        </div>

                        {/* Location B */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm">Panti Asuhan Amanah (B)</h3>
                                    <p className="text-gray-500 text-xs mt-1">Jl. Lb. Rejo, Sekip Jaya, Kec. Kemuning, Kota Palembang</p>
                                </div>
                                <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-green-700 font-medium">08.00 - 17.00 WIB</span>
                                </div>
                            </div>
                            <div className="h-56 bg-gray-100 relative">
                                {loadMapB ? (
                                    <iframe
                                        title="Map B"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        src={`https://maps.google.com/maps?q=Jl.+Lb.+Rejo,+Sekip+Jaya,+Palembang&z=15&output=embed`}
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <button
                                        onClick={() => setLoadMapB(true)}
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Klik untuk muat peta</span>
                                    </button>
                                )}
                            </div>
                            <div className="p-4 border-t border-gray-100">
                                <Link
                                    href="https://maps.app.goo.gl/TbSSMmTwQCBqLAez5"
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Buka di Google Maps
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Informasi Lainnya Section */}
                    <div className="pt-8">
                        <div className="text-center mb-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md mb-3">
                                Tautan Penting
                            </span>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                Informasi Lainnya
                            </h2>
                            <div className="w-12 h-0.5 bg-gray-400 mx-auto rounded-full" />
                            <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">
                                Temukan informasi lebih lengkap tentang Yayasan Panti Asuhan Amanah
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Tanya Jawab */}
                            <div className="h-full">
                                <Link href="/faq" className="group relative block h-full bg-white rounded-xl p-6 border border-green-200 md:border-gray-100 md:hover:border-green-200 transition-all duration-300 overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500" />
                                    <div className="w-12 h-12 bg-green-600 text-white md:bg-green-50 md:text-green-600 rounded-lg flex items-center justify-center mb-4 md:group-hover:bg-green-600 md:group-hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-green-600 md:text-gray-900 text-base mb-2 md:group-hover:text-green-600 transition-colors">Tanya Jawab (FAQ)</h3>
                                    <p className="text-gray-500 text-sm">Pertanyaan yang sering diajukan</p>
                                </Link>
                            </div>

                            {/* Syarat & Ketentuan */}
                            <div className="h-full">
                                <Link href="/syarat-ketentuan" className="group relative block h-full bg-white rounded-xl p-6 border border-green-200 md:border-gray-100 md:hover:border-green-200 transition-all duration-300 overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500" />
                                    <div className="w-12 h-12 bg-green-600 text-white md:bg-green-50 md:text-green-600 rounded-lg flex items-center justify-center mb-4 md:group-hover:bg-green-600 md:group-hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-green-600 md:text-gray-900 text-base mb-2 md:group-hover:text-green-600 transition-colors">Syarat & Ketentuan</h3>
                                    <p className="text-gray-500 text-sm">Ketentuan penggunaan layanan</p>
                                </Link>
                            </div>

                            {/* Kebijakan Privasi */}
                            <div className="h-full">
                                <Link href="/kebijakan-privasi" className="group relative block h-full bg-white rounded-xl p-6 border border-green-200 md:border-gray-100 md:hover:border-green-200 transition-all duration-300 overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500" />
                                    <div className="w-12 h-12 bg-green-600 text-white md:bg-green-50 md:text-green-600 rounded-lg flex items-center justify-center mb-4 md:group-hover:bg-green-600 md:group-hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-green-600 md:text-gray-900 text-base mb-2 md:group-hover:text-green-600 transition-colors">Kebijakan Privasi</h3>
                                    <p className="text-gray-500 text-sm">Perlindungan data donatur</p>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )
}
