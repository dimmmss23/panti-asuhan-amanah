import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: "Profil Yayasan - Yayasan Panti Asuhan Amanah",
    description: "Profil Yayasan Amanah Palembang. Lembaga kesejahteraan sosial yang berkomitmen mengasuh dan membimbing anak-anak yatim, piatu, dan dhuafa.",
};

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow pt-20 pb-12">
                {/* Header Section */}
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
                        Profil Yayasan Amanah Palembang
                    </h1>
                    <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                </div>

                {/* Story Section */}
                <section className="container mx-auto px-4 mb-16">
                    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Sejarah & Deskripsi
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Berdiri sejak <strong>7 Januari 2019</strong>, Yayasan Amanah Palembang adalah lembaga kesejahteraan sosial yang berkomitmen mengasuh dan membimbing anak-anak yatim, piatu, dan dhuafa. Kami menerapkan sistem pengasuhan asrama yang menekankan pada pendidikan formal, akhlak mulia, dan pengembangan bakat.
                            </p>
                            <div className="flex items-start gap-2 mt-4 bg-green-50 p-4 rounded-lg">
                                <svg className="w-5 h-5 text-green-600 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>
                                    <strong>Lokasi:</strong> Berbasis di Palembang dengan dua lokasi asrama (Jl. Bambang Utoyo dan Jl. Lebak Rejo).
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Legalitas (Trust Section) */}
                <section className="container mx-auto px-4 mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800">Legalitas & Izin</h2>
                        <p className="text-gray-500 text-sm mt-2">Dokumen resmi yang menjamin kredibilitas lembaga kami</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { title: "Nama Resmi", value: "Yayasan Panti Asuhan Amanah", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                            { title: "SK Kemenkumham", value: "AHU-0036248.AH.01.12.Tahun 2021", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                            { title: "Izin Dinas Sosial (STPLKS)", value: "467/STPLKS/0026/DPMPTSP-PPK/2024", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 mx-auto">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-lg mb-2 text-center">{item.title}</h3>
                                <p className="text-gray-600 text-center font-medium word-break-break-all">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Visi Misi Section */}
                <section className="container mx-auto px-4 mb-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Visi */}
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5 10 5 10-5-5-2.5-5 2.5z" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 relative z-10">
                                <span className="bg-white/20 p-2 rounded-lg">VISI</span>
                            </h2>
                            <p className="text-green-50 text-lg leading-relaxed relative z-10">
                                &quot;Membekali anak yatim piatu dengan pendidikan kokoh untuk menghasilkan generasi cerdas, mandiri, dan berdaya saing tinggi.&quot;
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="bg-white rounded-2xl p-8 border-t-4 border-green-600 shadow-lg group hover:bg-green-50 transition-colors">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-green-100 text-green-700 p-2 rounded-lg">MISI</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                &quot;Menciptakan generasi berprestasi yang didukung pertumbuhan individual dan profesional berdasar iman dan taqwa.&quot;
                            </p>
                        </div>
                    </div>
                </section>

                {/* Data Yayasan (Infografis) */}
                <section className="bg-green-900 py-16 text-white mb-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Data Yayasan</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            {[
                                { label: "Anak Asuh", value: "38", sub: "Yatim, Piatu, Dhuafa", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                                { label: "Jenjang Usia", value: "3 - 17", sub: "Tahun", detail: "SD hingga Kuliah", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                                { label: "Program Unggulan", value: "3", sub: "Program Utama", detail: "Pendidikan, Tahfidz, Bela Diri", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                            ].map((item, index) => (
                                <div key={index} className="p-4 px-2">
                                    <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-green-300">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
                                    </div>
                                    <div className="text-4xl font-bold mb-2 text-white">{item.value}</div>
                                    <div className="text-lg font-medium text-green-200">{item.label}</div>
                                    <div className="text-sm text-green-300 mt-1">{item.sub}</div>
                                    {item.detail && <div className="text-xs text-green-400 mt-1">({item.detail})</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Struktur Pengurus */}
                <section className="container mx-auto px-4 mb-16 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8">Struktur Pengurus</h2>
                    <div className="max-w-4xl mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-gray-500 font-medium">Foto Struktur Organisasi</p>
                        <p className="text-gray-400 text-sm mt-2">(Akan segera diperbarui)</p>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;