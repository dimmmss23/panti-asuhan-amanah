"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const Footer = () => {
    const currentYear = new Date().getFullYear()

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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <footer className="w-full bg-green-900 border-t border-green-800">
            <div className="max-w-7xl mx-auto py-12 px-6">
                {/* Grid 4 Kolom */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                    {/* Kolom 1 - Tentang Yayasan */}
                    <motion.div className="lg:col-span-1" variants={itemVariants}>
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/Logo.png"
                                alt="Logo Yayasan Panti Asuhan Amanah"
                                width={64}
                                height={64}
                                className="w-14 h-14 object-contain"
                            />
                            <h3 className="text-yellow-400 font-bold text-base leading-tight">
                                Yayasan Panti Asuhan<br />Amanah
                            </h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Lembaga sosial yang berfokus pada pengasuhan, pendidikan, dan pembinaan anak yatim dan dhuafa dengan nilai-nilai keislaman.
                        </p>

                    </motion.div>

                    {/* Kolom 2 - Lokasi */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-yellow-400 font-bold text-lg mb-4">Lokasi Kami</h3>

                        {/* Lokasi 1 */}
                        <div className="mb-4 pb-4 border-b border-green-800">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <span className="text-yellow-400 text-sm font-semibold">(A)</span>
                            </div>
                            <address className="text-gray-300 text-sm not-italic leading-relaxed pl-6">
                                Jl. Bambang Utoyo, Jl. Pusaka No.76,<br />
                                Pasar Lemabang, 3 Ilir, Kec. Ilir Tim. II,<br />
                                Kota Palembang, Sumsel 30111
                            </address>
                        </div>

                        {/* Lokasi 2 */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <span className="text-yellow-400 text-sm font-semibold">(B)</span>
                            </div>
                            <address className="text-gray-300 text-sm not-italic leading-relaxed pl-6">
                                Jl. Lb. Rejo, Sekip Jaya,<br />
                                Kec. Kemuning, Kota Palembang,<br />
                                Sumatera Selatan
                            </address>
                        </div>
                    </motion.div>

                    {/* Kolom 3 - Kontak */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-yellow-400 font-bold text-lg mb-4">Hubungi Kami</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Telepon/WhatsApp</p>
                                    <p className="text-gray-300 text-sm">0821-8045-8885</p>
                                    <p className="text-gray-300 text-sm">0859-3023-3424</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Email</p>
                                    <p className="text-gray-300 text-xs break-all">yayasanpantiasuhanamanah@gmail.com</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Kolom 4 - Jam Operasional */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-yellow-400 font-bold text-lg mb-4">Jam Operasional</h3>
                        <div className="space-y-3">
                            {/* Jam Operasional Anak Panti */}
                            <div className="flex items-center gap-3 p-3 bg-green-800/50 rounded-lg">
                                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="text-gray-300 text-sm font-medium">Anak Panti</p>
                                    <p className="text-yellow-400 text-sm font-semibold">05:00 - 20:00 WIB</p>
                                </div>
                            </div>

                            {/* Jam Operasional Panti */}
                            <div className="flex items-center gap-3 p-3 bg-green-800/50 rounded-lg">
                                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <div>
                                    <p className="text-gray-300 text-sm font-medium">Layanan Panti</p>
                                    <p className="text-yellow-400 text-sm font-semibold">Siap 24 Jam</p>
                                </div>
                            </div>

                            <p className="text-gray-400 text-xs italic leading-relaxed">
                                * Kunjungan di luar jam operasional dapat diatur dengan perjanjian terlebih dahulu melalui WhatsApp.
                            </p>
                        </div>

                        {/* CTA Donasi */}
                        <div className="mt-6">
                            <Link
                                href="/donasi"
                                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-green-900 font-semibold px-4 py-2.5 rounded-lg transition duration-300 text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Donasi Sekarang
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bagian Bawah Footer */}
                <motion.div
                    className="border-t border-green-800 mt-10 pt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-center text-gray-400 text-sm">
                        © {currentYear} Yayasan Panti Asuhan Amanah. Dikelola dengan amanah untuk umat.
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer
