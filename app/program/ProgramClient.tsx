"use client"

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const ProgramClient = () => {
    const programs = [
        {
            title: "Pendidikan",
            description: "Yayasan Amanah menjamin hak pendidikan setiap anak asuh mulai dari jenjang SD, SMP, SMA/SMK, hingga kuliah. Kami memfasilitasi kebutuhan sekolah agar mereka tumbuh menjadi generasi cerdas.",
            icon: (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Book / Education */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            title: "Pembinaan Akhlak & Agama",
            description: "Membentuk karakter islami yang kokoh melalui rutinitas ibadah, sholat berjamaah, tadarus Al-Qur'an, dan hafalan surah pendek untuk mencetak generasi sholeh/sholeha.",
            icon: (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Moon & Star / Religious */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )
        },
        {
            title: "Layanan Kesehatan & Gizi",
            description: "Kami memprioritaskan tumbuh kembang fisik anak dengan menyediakan asupan gizi seimbang serta akses layanan kesehatan rutin dan obat-obatan agar anak-anak selalu sehat dan aktif.",
            icon: (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Heart / Health */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            title: "Pengembangan Bakat & Prestasi",
            description: "Kami mendukung penuh potensi non-akademik anak di bidang olahraga, seni, dan keterampilan hidup. Kami mendorong mereka menggali minat dan meraih prestasi untuk membangun kepercayaan diri.",
            icon: (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Star / Trophy */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )
        },
        {
            title: "Kesejahteraan Sosial & Asrama",
            description: "Menyediakan perlindungan sosial berupa tempat tinggal (asrama) yang layak, pemenuhan kebutuhan sandang (pakaian), dan pangan harian. Kami menciptakan lingkungan asuh berbasis kekeluargaan agar anak-anak merasa aman.",
            icon: (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Home / Family */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-grow pt-0 pb-20">
                {/* Hero Section - Islamic Elegant Theme */}
                <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800">
                    {/* Islamic Geometric Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="islamic-pattern-program" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="1" />
                                    <path d="M30 15L45 30L30 45L15 30Z" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#islamic-pattern-program)" />
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Badge */}
                            <motion.span
                                className="inline-block text-amber-300 font-semibold tracking-wider uppercase text-sm mb-4"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                Program Unggulan
                            </motion.span>

                            {/* Title */}
                            <motion.h1
                                className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight mb-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                Program Kami
                            </motion.h1>

                            {/* Decorative Divider */}
                            <motion.div
                                className="flex items-center justify-center gap-3 mb-6"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400/70" />
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400/70" />
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                Dedikasi kami untuk masa depan anak yatim & dhuafa melalui pilar pendidikan, agama, kesehatan, dan kesejahteraan sosial.
                            </motion.p>
                        </div>
                    </div>

                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 54" fill="none" preserveAspectRatio="none">
                            <path d="M0 22L60 16.7C120 11 240 1 360 0.3C480 0 600 11 720 16.7C840 22 960 22 1080 19.3C1200 16 1320 11 1380 8.3L1440 6V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" fill="white" />
                        </svg>
                    </div>
                </section>

                {/* Programs Grid */}
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-12 md:py-16">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {programs.map((program, index) => (
                            <motion.div
                                key={index}
                                className="group relative bg-white rounded-xl p-6 transition-all duration-300 border border-gray-100 hover:border-green-200 flex flex-col overflow-hidden"
                                variants={itemVariants}
                                whileHover={{ y: -3 }}
                            >
                                {/* Top accent line */}
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

                                {/* Icon */}
                                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors duration-300">
                                    <div className="w-8 h-8 text-green-600">
                                        {program.icon}
                                    </div>
                                </div>

                                <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                                    {program.title}
                                </h3>

                                <p className="text-gray-500 leading-relaxed text-xs flex-grow">
                                    {program.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProgramClient;
