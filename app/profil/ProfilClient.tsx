"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

interface Legalitas {
    id: number
    jenisdokumen: string | null
    nomordokumen: string | null
}

interface Profil {
    id: number
    AnakAsuh: number
    strukturorganisasi_URL: string
    Legalitas: Legalitas[]
}

interface ProfilClientProps {
    profil: Profil | null
    legalitas: Legalitas[]
}

// Icon mapping untuk legalitas
const getIconForLegalitas = (jenisdokumen: string | null): string => {
    const iconMap: { [key: string]: string } = {
        "SK Kemenkumham": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        "Akta Notaris": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        "Dinas Sosial": "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
        "Kelurahan": "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
        "NPWP": "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    }
    // Cari icon yang cocok berdasarkan kata kunci
    for (const [key, icon] of Object.entries(iconMap)) {
        if (jenisdokumen?.toLowerCase().includes(key.toLowerCase())) {
            return icon
        }
    }
    // Default icon
    return "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
}

const ProfilClient = ({ profil, legalitas }: ProfilClientProps) => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    const scaleVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative w-full">
                    <motion.div
                        className="relative w-full h-[400px] md:h-[500px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Image
                            src="/Hero Profil.png"
                            alt="Hero Profil"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </motion.div>
                </div>

                {/* Main Content Card */}
                <div className="container mx-auto px-4 max-w-6xl pb-20">
                    <motion.div
                        className="relative bg-white rounded-3xl shadow-xl -mt-10 md:-mt-16 p-6 md:p-12 border-t border-gray-100 flex flex-col items-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        {/* Floating Logo */}
                        <motion.div
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                        >
                            <div className="bg-white p-2 md:p-3 rounded-full shadow-lg border-4 border-white">
                                <Image
                                    src="/Logo.png"
                                    alt="Logo Yayasan"
                                    width={128}
                                    height={128}
                                    className="w-20 h-20 md:w-32 md:h-32 object-contain"
                                />
                            </div>
                        </motion.div>

                        {/* Judul & Deskripsi + Sejarah Merged */}
                        <motion.div
                            className="text-center mt-10 md:mt-16 max-w-4xl mx-auto space-y-6"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.h1
                                className="text-2xl md:text-4xl lg:text-5xl font-bold text-green-800 leading-tight"
                                variants={itemVariants}
                            >
                                Yayasan Panti Asuhan Amanah
                            </motion.h1>

                            <motion.p
                                className="text-gray-600 text-base md:text-lg leading-relaxed text-justify md:text-center"
                                variants={itemVariants}
                            >
                                Yayasan Panti Asuhan Amanah hadir sebagai wujud kepedulian nyata terhadap masa depan generasi penerus bangsa. Sejak awal berdiri, kami terus tumbuh menjadi lembaga kesejahteraan sosial terpercaya di Palembang yang berkomitmen penuh memuliakan anak-anak yatim, piatu, dan dhuafa.
                                <br /><br />
                                Melalui sistem pengasuhan asrama yang berbasis kekeluargaan, kami tidak hanya memenuhi kebutuhan dasar, tetapi juga memprioritaskan pendidikan formal berkualitas, pembinaan akhlak mulia, serta pengembangan bakat. Tujuan utama kami adalah memastikan setiap anak asuh tumbuh menjadi pribadi yang sholeh, mandiri, dan siap berprestasi.
                            </motion.p>
                        </motion.div>

                        {/* Legalitas */}
                        <div className="w-full mt-12 max-w-5xl">
                            <motion.div
                                className="text-center mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Legalitas Yayasan</h2>
                                <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
                                <p className="text-gray-600 max-w-2xl mx-auto">Dokumen resmi yang menjamin kredibilitas Yayasan Panti Asuhan Amanah</p>
                            </motion.div>
                            {legalitas.length > 0 ? (
                                <motion.div
                                    className="grid md:grid-cols-2 gap-4 md:gap-6"
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {legalitas.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4"
                                            variants={scaleVariants}
                                        >
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0">
                                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getIconForLegalitas(item.jenisdokumen)} />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 text-sm">{item.jenisdokumen}</h3>
                                                <p className="text-gray-600 font-medium text-xs md:text-sm break-all">{item.nomordokumen}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    <p>Data legalitas belum tersedia</p>
                                </div>
                            )}
                        </div>

                        {/* Visi & Misi Section */}
                        <motion.div
                            className="w-full mt-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Visi & Misi</h2>
                            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
                            <p className="text-gray-600 max-w-2xl mx-auto">Landasan dan tujuan Yayasan Panti Asuhan Amanah</p>
                        </motion.div>
                        <div className="w-full mt-8 grid md:grid-cols-2 gap-6 md:gap-10">
                            {/* Visi Card */}
                            <motion.div
                                className="bg-green-50 rounded-2xl p-6 md:p-8 border border-green-100 flex flex-col items-center text-center hover:bg-green-100 transition-colors duration-300"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-green-100 p-3 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-3">Visi</h3>
                                <p className="text-gray-700 leading-relaxed italic text-sm md:text-base">
                                    &quot;Membekali para anak yatim piatu sebuah sistem pemberdayaan dan pendidikan yang kokoh agar menghasilkan anak anak yang sholeh/sholeha (Generasi Cerdas dan Mandiri) sehingga mempunyai daya saing yang tinggi, dan semua pihak menjadikannya sebagai sumber pertumbuhan anak andalan serta memperoleh hasil SDM yang standar dan berkualitas.&quot;
                                </p>
                            </motion.div>

                            {/* Misi Card */}
                            <motion.div
                                className="bg-orange-50 rounded-2xl p-6 md:p-8 border border-orange-100 flex flex-col items-center text-center hover:bg-orange-100 transition-colors duration-300"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-orange-100 p-3 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-orange-800 mb-3">Misi</h3>
                                <p className="text-gray-700 leading-relaxed italic text-sm md:text-base">
                                    &quot;Menciptakan generasi cerdas dan mandiri, berperestasi yang di dukung untuk tumbuh secara individual dan profesional untuk melakukan pembangunan dalam arti luas dengan sumber daya manusia yang di dasari dengan iman dan taqwa.&quot;
                                </p>
                            </motion.div>
                        </div>

                        {/* Struktur Pengurus */}
                        <motion.div
                            className="w-full mt-12 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Struktur Pengurus</h2>
                            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
                            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                                Yayasan Amanah dikelola oleh tim pengurus yang berdedikasi tinggi, amanah, dan profesional di bidangnya.
                            </p>
                            <div className="max-w-4xl mx-auto">
                                <div className="relative w-full aspect-[4/3]">
                                    <Image
                                        src={profil?.strukturorganisasi_URL || "/struktur organisasi.png"}
                                        alt="Struktur Organisasi Yayasan Amanah"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>

                {/* Data Yayasan (Infografis) */}
                <motion.section
                    className="bg-green-900 py-16 text-white mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ y: -20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Data Yayasan</h2>
                            <div className="w-24 h-1 bg-green-400 mx-auto rounded-full"></div>
                        </motion.div>
                        <motion.div
                            className="grid md:grid-cols-3 gap-8 text-center"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                { label: "Anak Asuh", value: profil?.AnakAsuh?.toString() || "0", sub: "Yatim, Piatu, Dhuafa", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                                { label: "Jenjang Usia", value: "3 - 17", sub: "Tahun", detail: "SD hingga SMA/SMK", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                                { label: "Program Unggulan", value: "3", sub: "Program Utama", detail: "Pendidikan, Tahfidz, Minat Bakat", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="p-4 px-2 hover:transform hover:scale-105 transition-transform duration-300"
                                    variants={scaleVariants}
                                >
                                    <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-green-300 shadow-lg">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
                                    </div>
                                    <div className="text-4xl font-bold mb-2 text-white">{item.value}</div>
                                    <div className="text-lg font-medium text-green-200">{item.label}</div>
                                    <div className="text-sm text-green-300 mt-1">{item.sub}</div>
                                    {item.detail && <div className="text-xs text-green-400 mt-1">({item.detail})</div>}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

            </main>

            <Footer />
        </div>
    )
}

export default ProfilClient
