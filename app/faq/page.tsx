"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Link from "next/link"

interface FAQItem {
    q: string
    a: string
}

interface FAQCategory {
    category: string
    questions: FAQItem[]
}

const getStaticFAQData = (jumlahAnakAsuh: number): FAQCategory[] => [
    {
        category: "Umum",
        questions: [
            {
                q: "Apa itu Yayasan Panti Asuhan Amanah?",
                a: "Yayasan Panti Asuhan Amanah adalah lembaga kesejahteraan sosial yang berlokasi di Palembang, Sumatera Selatan. Kami berkomitmen untuk memberikan perlindungan, pendidikan, dan pembinaan akhlak bagi anak-anak yatim, piatu, dan dhuafa agar mereka tumbuh menjadi generasi yang sholeh, mandiri, dan berprestasi."
            },
            {
                q: "Kapan Yayasan Panti Asuhan Amanah didirikan?",
                a: "Yayasan Panti Asuhan Amanah telah terdaftar secara resmi dengan SK Kemenkumham RI Nomor AHU-0026878.AH.01.04.Tahun 2021 dan terus berkembang melayani anak-anak asuh dengan penuh dedikasi."
            },
            {
                q: "Di mana lokasi Panti Asuhan Amanah?",
                a: "Kami memiliki dua lokasi: (A) Jl. Bambang Utoyo, Jl. Pusaka No.76, Kota Palembang dan (B) Jl. Lb. Rejo, Sekip Jaya, Kec. Kemuning, Kota Palembang. Keduanya buka setiap hari pukul 08.00 - 17.00 WIB."
            }
        ]
    },
    {
        category: "Donasi",
        questions: [
            {
                q: "Bagaimana cara berdonasi ke Panti Asuhan Amanah?",
                a: "Anda dapat berdonasi melalui transfer bank ke rekening BRI 574601037734534 a.n. Panti Asuhan Amanah, atau scan QRIS yang tersedia di halaman Donasi kami. Anda juga dapat mengunjungi langsung lokasi panti untuk donasi tunai."
            },
            {
                q: "Apakah donasi saya aman dan terpercaya?",
                a: "Ya, Yayasan Panti Asuhan Amanah telah terdaftar secara resmi di Kemenkumham RI dan Dinas Sosial. Setiap donasi akan dikelola secara transparan dan amanah sesuai dengan program yang telah ditentukan."
            },
            {
                q: "Selain uang, apakah bisa donasi dalam bentuk lain?",
                a: "Tentu saja! Kami menerima donasi berupa sembako, pakaian layak pakai, perlengkapan sekolah, Al-Qur'an, buku-buku islami, dan kebutuhan anak-anak lainnya. Silakan hubungi kami terlebih dahulu untuk koordinasi."
            },
            {
                q: "Apakah saya akan mendapat bukti donasi?",
                a: "Ya, kami akan memberikan konfirmasi dan bukti penerimaan donasi melalui WhatsApp atau email. Untuk donasi dalam jumlah tertentu, kami juga dapat memberikan tanda terima resmi."
            }
        ]
    },
    {
        category: "Program & Kegiatan",
        questions: [
            {
                q: "Apa saja program unggulan Panti Asuhan Amanah?",
                a: "Program unggulan kami meliputi: (1) Pendidikan formal dari SD hingga SMA/SMK, (2) Pembinaan akhlak dan keagamaan termasuk tahfidz Al-Qur'an, (3) Pengembangan bakat dan minat, (4) Layanan kesehatan dan gizi, serta (5) Kesejahteraan sosial dan asrama."
            },
            {
                q: "Berapa jumlah anak asuh di Panti Asuhan Amanah?",
                a: `Saat ini kami mengasuh ${jumlahAnakAsuh} anak dengan rentang usia 3-17 tahun, terdiri dari anak yatim, piatu, dan dhuafa dari berbagai latar belakang.`
            },
            {
                q: "Apakah bisa berkunjung ke Panti Asuhan?",
                a: "Tentu! Kami sangat terbuka untuk kunjungan dari masyarakat. Silakan hubungi kami terlebih dahulu melalui WhatsApp atau email untuk mengatur jadwal kunjungan."
            }
        ]
    },
    {
        category: "Kerjasama & Relawan",
        questions: [
            {
                q: "Bagaimana cara menjadi relawan di Panti Asuhan Amanah?",
                a: "Kami menyambut siapa saja yang ingin berkontribusi sebagai relawan. Anda dapat membantu dalam kegiatan belajar mengajar, pembinaan keagamaan, atau kegiatan sosial lainnya. Silakan hubungi kami untuk informasi lebih lanjut."
            },
            {
                q: "Apakah perusahaan/organisasi bisa bekerjasama dengan Panti?",
                a: "Ya, kami terbuka untuk kerjasama dalam bentuk CSR, sponsorship program, atau kegiatan sosial bersama. Silakan hubungi kami untuk membahas bentuk kerjasama yang sesuai."
            }
        ]
    }
]

export default function FAQPage() {
    const [jumlahAnakAsuh, setJumlahAnakAsuh] = useState<number>(38) // Default value
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProfil = async () => {
            try {
                const res = await fetch("/api/profil")
                const data = await res.json()
                if (data.profil && data.profil.AnakAsuh) {
                    setJumlahAnakAsuh(data.profil.AnakAsuh)
                }
            } catch (error) {
                console.error("Error fetching profil:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProfil()
    }, [])

    const faqData = getStaticFAQData(jumlahAnakAsuh)
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                {/* Hero Section - Islamic Elegant Theme */}
                <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800">
                    {/* Islamic Geometric Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="islamic-pattern-faq" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="1"/>
                                    <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="1"/>
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="1"/>
                                    <path d="M30 15L45 30L30 45L15 30Z" fill="none" stroke="white" strokeWidth="0.5"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#islamic-pattern-faq)"/>
                        </svg>
                    </div>
                    
                    {/* Decorative Glow Effects */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl" />
                    
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Title */}
                            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight mb-4">
                                Tanya Jawab (FAQ)
                            </h1>
                            
                            {/* Decorative Divider */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400/70" />
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400/70" />
                            </div>
                            
                            {/* Description */}
                            <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
                                Temukan jawaban atas pertanyaan yang sering diajukan seputar Yayasan Panti Asuhan Amanah
                            </p>
                        </div>
                    </div>

                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 54" fill="none" preserveAspectRatio="none">
                            <path d="M0 22L60 16.7C120 11 240 1 360 0.3C480 0 600 11 720 16.7C840 22 960 22 1080 19.3C1200 16 1320 11 1380 8.3L1440 6V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" fill="#f9fafb"/>
                        </svg>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {faqData.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="mb-12">
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <span className="font-bold text-lg">{categoryIndex + 1}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                                </div>

                                {/* Questions */}
                                <div className="space-y-4">
                                    {category.questions.map((item, questionIndex) => (
                                        <details
                                            key={questionIndex}
                                            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                                        >
                                            <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                                                <span className="font-semibold text-gray-800 pr-4">{item.q}</span>
                                                <span className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-open:bg-green-600 group-open:text-white transition-colors">
                                                    <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </summary>
                                            <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                                {item.a}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Contact CTA */}
                        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Masih Ada Pertanyaan?</h3>
                            <p className="text-gray-600 mb-6">Jangan ragu untuk menghubungi kami langsung</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="https://wa.me/6282180458885"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    WhatsApp
                                </Link>
                                <Link
                                    href="/kontak"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-50 transition-colors"
                                >
                                    Halaman Kontak
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
