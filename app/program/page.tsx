import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Program Kami - Yayasan Panti Asuhan Amanah',
    description: 'Program-program unggulan Yayasan Amanah dalam pendidikan, keagamaan, kesehatan, dan kesejahteraan sosial.',
};

const ProgramPage = () => {
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

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-grow pt-16 pb-20">
                {/* Page Header */}
                {/* Page Header */}
                <section className="bg-gradient-to-br from-green-800 to-green-900 py-16 sm:py-20 mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-green-300 font-semibold tracking-wider uppercase text-sm mb-3 block">Program Unggulan</span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                            Program Kami
                        </h1>
                        <p className="text-green-100 text-lg sm:text-xl max-w-2xl mx-auto">
                            Dedikasi kami untuk masa depan anak yatim & dhuafa melalui pilar pendidikan, agama, kesehatan, dan kesejahteraan sosial.
                        </p>
                    </div>
                </section>

                {/* Programs Grid */}
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-8 transition-all duration-300 border border-sky-100 hover:border-sky-200 hover:shadow-xl hover:-translate-y-1 flex flex-col"
                            >
                                {/* Icon Circle */}
                                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-50 transition-colors duration-300">
                                    {program.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                                    {program.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                                    {program.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProgramPage;
