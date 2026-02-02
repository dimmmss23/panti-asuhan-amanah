"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';

const Profil = () => {
    const features = [
        {
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            title: "Pendidikan Formal",
            desc: "Jenjang SD hingga SMA/SMK"
        },
        {
            icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
            title: "Pengasuhan Penuh Kasih",
            desc: "Berbasis kekeluargaan & akhlak mulia"
        },
        {
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
            title: "Pembinaan Karakter",
            desc: "Mencetak generasi sholeh & mandiri"
        }
    ];

    return (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Main Card */}
                <motion.div
                    className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Subtle Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600" />
                    
                    <div className="relative z-10 p-6 sm:p-10 md:p-12">
                        {/* Header */}
                        <motion.div
                            className="text-center mb-10"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md border border-green-100 mb-4">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Tentang Kami
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Yayasan Panti Asuhan Amanah
                            </h2>
                            <div className="w-12 h-0.5 bg-green-600 mx-auto rounded-full mb-5"></div>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                                Hadir sebagai wujud kepedulian nyata terhadap masa depan generasi penerus bangsa.
                                Kami berkomitmen memuliakan anak-anak yatim, piatu, dan dhuafa melalui pengasuhan berbasis kekeluargaan,
                                pendidikan formal, dan pembinaan akhlak mulia.
                            </p>
                        </motion.div>

                        {/* Feature Cards */}
                        <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 flex flex-col items-center sm:items-start"
                                    whileHover={{ y: -3 }}
                                >
                                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-700 transition-colors duration-300">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1 text-sm text-center sm:text-left">{feature.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed text-center sm:text-left">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Link href="/profil">
                                <motion.span
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all duration-300 text-sm"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Selengkapnya
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.span>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Profil;
