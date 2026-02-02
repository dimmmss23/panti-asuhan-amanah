"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQItem {
    question: string
    answer: string
    category: string
}

const faqData: FAQItem[] = [
    {
        category: "Umum",
        question: "Dimana lokasi Panti Asuhan Amanah?",
        answer: "Panti Asuhan Amanah berlokasi di Jl. Contoh No. 123, Kota Palembang, Sumatera Selatan. Kami terbuka untuk kunjungan setiap hari dari pukul 08.00 hingga 17.00 WIB."
    },
    {
        category: "Donasi",
        question: "Bagaimana cara melakukan donasi?",
        answer: "Anda dapat melakukan donasi melalui transfer bank ke rekening yayasan yang tertera di halaman Donasi, atau datang langsung ke panti asuhan kami. Kami juga menerima donasi dalam bentuk barang."
    },
    {
        category: "Donasi",
        question: "Apakah donasi saya dapat dikembalikan?",
        answer: "Mohon maaf, donasi yang sudah masuk tidak dapat dikembalikan karena akan langsung dialokasikan untuk kebutuhan anak-anak panti dan operasional yayasan."
    },
    {
        category: "Program",
        question: "Apa saja program pendidikan di Panti Asuhan Amanah?",
        answer: "Kami memiliki program pendidikan formal (sekolah), pendidikan agama (tahfidz Al-Qur'an), serta pelatihan keterampilan (menjahit, komputer) untuk membekali anak-anak dengan soft skill."
    },
    {
        category: "Relawan",
        question: "Apakah saya bisa menjadi relawan?",
        answer: "Tentu! Kami sangat terbuka bagi siapa saja yang ingin menjadi relawan untuk mengajar atau membantu kegiatan operasional. Silakan hubungi kontak kami untuk informasi lebih lanjut."
    }
]

export default function FAQ() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeindex, setActiveIndex] = useState<number | null>(null)

    const filteredFAQs = faqData.filter((item) =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeindex === index ? null : index)
    }

    // Group by category if needed, or just list them. 
    // The user image description suggests "style pertanyaan lalu ada tombol dropdown", 
    // usually implies a list.
    // I will group them by category if search is empty, or show flat list if searching?
    // Let's stick to a clean flat list with category badges for now, or just a simple list.
    // Actually, often FAQ pages have categories. Let's start simple.

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-3">
                    Tanya Jawab (FAQ)
                </h2>
                <p className="text-gray-600">
                    Temukan jawaban atas pertanyaan yang sering diajukan
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm transition duration-150 ease-in-out shadow-sm"
                    placeholder="Cari pertanyaan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
                {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none bg-white hover:bg-gray-50"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="text-lg font-medium text-gray-900 pr-4">
                                    {item.question}
                                </span>
                                <span className={`ml-6 flex-shrink-0 transition-transform duration-200 ${activeindex === index ? "transform rotate-180" : ""}`}>
                                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <AnimatePresence initial={false}>
                                {activeindex === index && (
                                    <motion.div
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: { opacity: 1, height: "auto" },
                                            collapsed: { opacity: 0, height: 0 }
                                        }}
                                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="px-6 pb-4 text-gray-600 bg-white">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-2 text-gray-500">Pertanyaan tidak ditemukan.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
