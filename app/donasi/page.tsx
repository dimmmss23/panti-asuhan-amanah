"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const poppins = Poppins({
    weight: ["400", "600", "700"],
    subsets: ["latin"]
});

interface Donasi {
    id: number;
    namaBank: string;
    nomorRekening: string;
    atasNama: string;
    logoUrl: string;
    isActive: boolean;
}

interface Qris {
    id: number;
    nama: string;
    imageUrl: string;
    isActive: boolean;
}

interface KitaBisa {
    id: number;
    namaProgram: string;
    deskripsi: string;
    imageUrl: string;
    linkKitaBisa: string;
    isActive: boolean;
}

interface DonationData {
    donasi: Donasi[];
    qris: Qris[];
    kitabisa: KitaBisa[];
}

const DonationPage = () => {
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [data, setData] = useState<DonationData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/donasi');
                if (res.ok) {
                    const result = await res.json();
                    setData(result);
                }
            } catch (error) {
                console.error('Error fetching donation data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCopy = (accountNumber: string, id: number) => {
        navigator.clipboard.writeText(accountNumber);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow pb-12">
                {/* Hero Section - Islamic Elegant Theme */}
                <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 mb-8 md:mb-12">
                    {/* Islamic Geometric Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="islamic-pattern-donasi" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="1" />
                                    <path d="M30 15L45 30L30 45L15 30Z" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#islamic-pattern-donasi)" />
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
                            <motion.div
                                className="flex justify-center mb-6"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                    <svg className="w-8 h-8 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                Salurkan Kebaikan Anda
                            </motion.h1>

                            {/* Decorative Divider */}
                            <motion.div
                                className="flex items-center justify-center gap-3 mb-6"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400/70" />
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400/70" />
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Bersama kita wujudkan masa depan cerah bagi anak-anak Panti Asuhan Amanah
                            </motion.p>
                        </div>
                    </div>

                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 54" fill="none" preserveAspectRatio="none">
                            <path d="M0 22L60 16.7C120 11 240 1 360 0.3C480 0 600 11 720 16.7C840 22 960 22 1080 19.3C1200 16 1320 11 1380 8.3L1440 6V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" fill="#f9fafb" />
                        </svg>
                    </div>
                </section>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">

                        {/* Welcome Text */}
                        <section className="text-center space-y-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="max-w-2xl mx-auto text-gray-600 leading-relaxed space-y-4"
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Mari Berbagi Kebahagiaan</h2>
                                <p>
                                    &quot;Perumpamaan (nafkah yang dikeluarkan oleh) orang-orang yang menafkahkan hartanya di jalan Allah adalah serupa dengan sebutir benih yang menumbuhkan tujuh bulir, pada tiap-tiap bulir seratus biji. Allah melipat gandakan (ganjaran) bagi siapa yang Dia kehendaki. Dan Allah Maha Luas (karunia-Nya) lagi Maha Mengetahui.&quot; (QS. Al-Baqarah: 261)
                                </p>
                                <p>
                                    Bantuan Anda sangat berarti bagi masa depan anak-anak asuh kami di Panti Asuhan Amanah. Setiap rupiah yang Anda dermakan akan menjadi cahaya harapan bagi mereka.
                                </p>
                            </motion.div>
                        </section>

                        {/* KitaBisa Cards Section */}
                        {data?.kitabisa && data.kitabisa.length > 0 && (
                            <section>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-center mb-8"
                                >
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Donasi via KitaBisa</h2>
                                    <p className="text-gray-600">Pilih program donasi dan salurkan bantuan Anda melalui platform KitaBisa</p>
                                </motion.div>

                                <div className="flex flex-wrap justify-center gap-6">
                                    {data.kitabisa.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow w-full max-w-lg"
                                        >
                                            <div className="relative aspect-video w-full bg-gray-100">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.namaProgram}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-6 text-center">
                                                <h3 className="font-bold text-xl text-gray-900 mb-3">{item.namaProgram}</h3>
                                                <p className="text-gray-600 text-base mb-5">{item.deskripsi}</p>
                                                <a
                                                    href={item.linkKitaBisa}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                    Donasi Sekarang
                                                </a>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Bank Account Cards */}
                        {data?.donasi && data.donasi.length > 0 && (
                            <section>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-center mb-8"
                                >
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Transfer Bank</h2>
                                    <p className="text-gray-600">Pilih rekening bank yang tersedia untuk melakukan transfer donasi</p>
                                </motion.div>

                                <div className="flex flex-wrap justify-center gap-6">
                                    {data.donasi.map((bank, index) => (
                                        <motion.div
                                            key={bank.id}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 w-full max-w-md"
                                        >
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500" />
                                            <div className="p-6 space-y-5">
                                                {/* Bank Info */}
                                                <div className="flex flex-col items-center text-center gap-3">
                                                    <div className="relative w-32 h-14 bg-gray-50 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={bank.logoUrl}
                                                            alt={bank.namaBank}
                                                            fill
                                                            className="object-contain p-2"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-gray-900">{bank.namaBank}</h3>
                                                        <p className="font-bold text-gray-700">a.n {bank.atasNama}</p>
                                                    </div>
                                                </div>

                                                {/* Account Number */}
                                                <div className="bg-blue-50/50 py-4 px-5 rounded-xl border border-blue-100 text-center">
                                                    <p className="text-xs text-gray-500 mb-2">Nomor Rekening</p>
                                                    <p className={`${poppins.className} text-2xl font-bold text-blue-900 tracking-wider mb-3`}>
                                                        {bank.nomorRekening}
                                                    </p>
                                                    <button
                                                        onClick={() => handleCopy(bank.nomorRekening, bank.id)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                                                    >
                                                        {copiedId === bank.id ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                                Tersalin!
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                                </svg>
                                                                Salin Nomor
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* QRIS Section */}
                        {data?.qris && data.qris.length > 0 && (
                            <section>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-center mb-8"
                                >
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Scan QRIS</h2>
                                    <p className="text-gray-600">Buka aplikasi e-wallet atau mobile banking dan scan kode QR</p>
                                </motion.div>

                                <div className="flex flex-wrap justify-center gap-6">
                                    {data.qris.map((qris, index) => (
                                        <motion.div
                                            key={qris.id}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            className="relative group"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                            <div className="relative bg-white p-4 rounded-xl border border-gray-100 shadow-xl">
                                                <p className="text-center text-sm font-medium text-gray-700 mb-3">{qris.nama}</p>
                                                <div className="aspect-square relative w-[280px] md:w-[320px] bg-white">
                                                    <Image
                                                        src={qris.imageUrl}
                                                        alt={qris.nama}
                                                        fill
                                                        className="object-contain p-2"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Instructions & Notes */}
                        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                            {/* Steps */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative bg-white p-5 rounded-xl border border-gray-100 overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
                                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm">?</span>
                                    Cara Donasi
                                </h3>
                                <ol className="space-y-3 text-gray-600 text-sm">
                                    <li className="flex gap-3">
                                        <span className="font-bold text-blue-600">1.</span>
                                        <span>Pilih metode donasi yang tersedia (KitaBisa, Transfer Bank, atau QRIS).</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-bold text-blue-600">2.</span>
                                        <span>Untuk transfer bank, salin nomor rekening atau buka aplikasi mobile banking.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-bold text-blue-600">3.</span>
                                        <span>Lakukan transfer sesuai dengan nominal yang Anda ikhlaskan.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-bold text-blue-600">4.</span>
                                        <span>Periksa kembali nama penerima sudah sesuai sebelum melakukan transfer.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-bold text-blue-600">5.</span>
                                        <span>Simpan bukti transfer sebagai dokumentasi Anda.</span>
                                    </li>
                                </ol>
                            </motion.div>

                            {/* Important Notes */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-amber-50 p-6 rounded-xl border border-amber-100"
                            >
                                <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Penting Diperhatikan
                                </h3>
                                <ul className="space-y-3 text-amber-900 text-sm">
                                    <li className="flex gap-2 items-start">
                                        <span className="mt-1">•</span>
                                        <span>Mohon pastikan nomor rekening yang dituju sudah benar sesuai yang tertera di halaman ini.</span>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <span className="mt-1">•</span>
                                        <span>Hati-hati terhadap penipuan yang mengatasnamakan Panti Asuhan Amanah dengan nomor rekening berbeda.</span>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <span className="mt-1">•</span>
                                        <span>Konfirmasi donasi dapat dilakukan dengan menghubungi kontak kami yang tersedia di bagian bawah website.</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>

                        {/* Butuh Bantuan Section */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center space-y-6 shadow-sm">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Butuh Bantuan?</h3>
                                <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                                    Jika ada pertanyaan tentang rekening atau proses donasi, silakan hubungi kami
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="https://wa.me/6282180458885"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white border border-green-500 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    WhatsApp
                                </a>

                                <a
                                    href="mailto:yayasanpantiasuhanamanah@gmail.com"
                                    className="flex items-center gap-2 px-6 py-3 bg-white border border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    Email
                                </a>
                            </div>
                        </div>

                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default DonationPage;
