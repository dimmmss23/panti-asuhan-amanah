"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DonationPage = () => {
    const [copied, setCopied] = useState(false);
    const accountNumber = "574601037734534";

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow pb-12">
                {/* Hero Section */}
                <div className="w-full h-[250px] md:h-[300px] mb-8 md:mb-12 bg-green-900 flex items-center justify-center relative overflow-hidden">

                    {/* Pattern overlay for some texture (optional) */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center px-4 relative z-10"
                    >
                        <h1 className="text-white text-2xl md:text-5xl font-bold tracking-wide drop-shadow-md mb-2">
                            Salurkan Kebaikan Anda
                        </h1>
                        <p className="text-green-100 text-sm md:text-lg max-w-2xl mx-auto">
                            Bersama kita wujudkan masa depan cerah bagi anak-anak Panti Asuhan Amanah
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">

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
                                "Perumpamaan (nafkah yang dikeluarkan oleh) orang-orang yang menafkahkan hartanya di jalan Allah adalah serupa dengan sebutir benih yang menumbuhkan tujuh bulir, pada tiap-tiap bulir seratus biji. Allah melipat gandakan (ganjaran) bagi siapa yang Dia kehendaki. Dan Allah Maha Luas (karunia-Nya) lagi Maha Mengetahui." (QS. Al-Baqarah: 261)
                            </p>
                            <p>
                                Bantuan Anda sangat berarti bagi masa depan anak-anak asuh kami di Panti Asuhan Amanah. Setiap rupiah yang Anda dermakan akan menjadi cahaya harapan bagi mereka.
                            </p>
                        </motion.div>
                    </section>

                    {/* Bank Account Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-lg mx-auto"
                    >
                        <div className="bg-blue-600 p-6 text-white text-center">
                            <h2 className="text-xl font-semibold">Rekening Bank Resmi</h2>
                            <p className="text-blue-100 text-sm mt-1">Donasi Panti Asuhan Amanah</p>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Bank Info */}
                            <div className="text-center space-y-4">
                                <div className="relative w-32 h-12 mx-auto">
                                    <Image
                                        src="/Logo BRI.png"
                                        alt="Bank BRI"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm mb-2">Nomor Rekening</p>
                                    <div className="flex items-center justify-center gap-3 bg-blue-50/50 py-4 px-6 rounded-xl border border-blue-100">
                                        <span className="font-sans text-2xl md:text-3xl font-bold text-blue-900 tracking-widest drop-shadow-sm">
                                            {accountNumber}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    {copied ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Berhasil Disalin!
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

                                <div className="pt-2">
                                    <p className="text-gray-500 text-sm">Atas Nama</p>
                                    <p className="font-semibold text-lg text-gray-800">Panti Asuhan Amanah</p>
                                </div>
                            </div>

                            {/* QRIS */}
                            <div className="border-t border-gray-100 pt-8 flex flex-col items-center">
                                <div className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                                    Scan QRIS
                                </div>
                                <p className="text-center text-gray-600 mb-6 font-medium max-w-xs mx-auto">
                                    Buka aplikasi e-wallet atau mobile banking Anda dan scan kode di bawah ini.
                                </p>
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                    <div className="relative bg-white p-4 rounded-xl border border-gray-100 shadow-xl">
                                        <div className="aspect-square relative w-[300px] md:w-[350px] bg-white">
                                            <Image
                                                src="/Qris.png"
                                                alt="QRIS Donasi"
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Instructions & Notes */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* Steps */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">?</span>
                                Cara Donasi
                            </h3>
                            <ol className="space-y-3 text-gray-600 text-sm">
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-600">1.</span>
                                    <span>Salin nomor rekening BRI di atas atau siapkan aplikasi e-wallet untuk scan QRIS.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-600">2.</span>
                                    <span>Buka aplikasi mobile banking atau ATM terdekat.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-600">3.</span>
                                    <span>Lakukan transfer sesuai dengan nominal yang Anda ikhlaskan.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-600">4.</span>
                                    <span>Periksa kembali nama penerima adalah <strong>Panti Asuhan Amanah</strong>.</span>
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
            </main>

            <Footer />
        </div>
    );
};

export default DonationPage;
