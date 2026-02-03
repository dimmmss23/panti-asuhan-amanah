import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Link from "next/link"
import prisma from "../libs/prisma"

export default async function SyaratKetentuanPage() {
    // Fetch data rekening bank yang aktif dari database
    const rekeningBank = await prisma.donasi.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'asc' },
        select: {
            namaBank: true,
            nomorRekening: true,
            atasNama: true
        }
    })

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
                                <pattern id="islamic-pattern-terms" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="1"/>
                                    <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="1"/>
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="1"/>
                                    <path d="M30 15L45 30L30 45L15 30Z" fill="none" stroke="white" strokeWidth="0.5"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#islamic-pattern-terms)"/>
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Title */}
                            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight mb-4">
                                Syarat & Ketentuan
                            </h1>
                            
                            {/* Decorative Divider */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400/70" />
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400/70" />
                            </div>
                            
                            {/* Description */}
                            <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
                                Ketentuan penggunaan layanan dan donasi Yayasan Panti Asuhan Amanah
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

                {/* Content */}
                <section className="py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
                            
                            {/* Last Updated */}
                            <div className="flex items-center gap-2 text-sm text-gray-500 pb-6 border-b border-gray-100">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Terakhir diperbarui: 1 Februari 2026</span>
                            </div>

                            {/* Section 1 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">1</span>
                                    Ketentuan Umum
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Dengan mengakses dan menggunakan website Yayasan Panti Asuhan Amanah, Anda menyetujui untuk terikat dengan syarat dan ketentuan yang berlaku.</p>
                                    <p>Yayasan Panti Asuhan Amanah adalah lembaga sosial yang bergerak dalam bidang kesejahteraan anak yatim, piatu, dan dhuafa yang terdaftar secara resmi di Kementerian Hukum dan HAM Republik Indonesia.</p>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">2</span>
                                    Ketentuan Donasi
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Donasi yang diberikan kepada Yayasan Panti Asuhan Amanah bersifat sukarela dan tidak dapat diminta kembali (non-refundable).</p>
                                    <p>Seluruh donasi akan digunakan untuk keperluan operasional yayasan, pendidikan anak asuh, kebutuhan sehari-hari, dan program pemberdayaan sesuai dengan visi dan misi yayasan.</p>
                                    <p>Donatur berhak mendapatkan informasi mengenai penggunaan donasi melalui laporan berkala yang dipublikasikan oleh yayasan.</p>
                                    <p>Rekening resmi donasi adalah:</p>
                                    {rekeningBank.length > 0 ? (
                                        <ul className="list-disc pl-5 space-y-2">
                                            {rekeningBank.map((rek, index) => (
                                                <li key={index}>
                                                    <strong>{rek.namaBank} {rek.nomorRekening}</strong> a.n. <strong>{rek.atasNama}</strong>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p><strong>Silakan hubungi kami untuk informasi rekening donasi.</strong></p>
                                    )}
                                    <p className="mt-3 text-red-600 font-medium">Yayasan tidak bertanggung jawab atas donasi yang ditransfer ke rekening selain yang tercantum di atas.</p>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">3</span>
                                    Hak dan Kewajiban Donatur
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p><strong>Hak Donatur:</strong></p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Mendapatkan konfirmasi penerimaan donasi</li>
                                        <li>Memperoleh informasi penggunaan donasi secara transparan</li>
                                        <li>Mengunjungi lokasi yayasan dengan perjanjian terlebih dahulu</li>
                                        <li>Mendapatkan bukti donasi untuk keperluan pelaporan pajak (jika diperlukan)</li>
                                    </ul>
                                    <p className="mt-4"><strong>Kewajiban Donatur:</strong></p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Memberikan informasi yang benar dan akurat</li>
                                        <li>Menggunakan jalur donasi resmi yang disediakan</li>
                                        <li>Menghormati privasi anak-anak asuh</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">4</span>
                                    Penggunaan Konten Website
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Seluruh konten yang terdapat dalam website ini, termasuk teks, gambar, logo, dan foto merupakan milik Yayasan Panti Asuhan Amanah atau telah mendapat izin penggunaan.</p>
                                    <p>Penggunaan konten untuk keperluan komersial tanpa izin tertulis dari yayasan tidak diperbolehkan.</p>
                                    <p>Penyebaran informasi dari website ini untuk tujuan kebaikan dan sosial diperbolehkan dengan mencantumkan sumber.</p>
                                </div>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">5</span>
                                    Perubahan Ketentuan
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Yayasan Panti Asuhan Amanah berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu.</p>
                                    <p>Perubahan akan berlaku efektif sejak dipublikasikan di website resmi yayasan.</p>
                                </div>
                            </div>

                            {/* Section 6 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">6</span>
                                    Kontak
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li className="break-words">Email: yayasanpantiasuhanamanah@gmail.com</li>
                                        <li>WhatsApp: +62 821-8045-8885</li>
                                        <li>Alamat Lokasi A:<br />
                                            Jl. Bambang Utoyo, Jl. Pusaka No.76,<br />
                                            Pasar Lemabang, 3 Ilir, Kec. Ilir Tim. II,<br />
                                            Kota Palembang, Sumatera Selatan
                                        </li>
                                        <li>Alamat Lokasi B:<br />
                                            Jl. Lb. Rejo, Sekip Jaya,<br />
                                            Kec. Kemuning, Kota Palembang,<br />
                                            Sumatera Selatan
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        {/* Back to Contact */}
                        <div className="mt-8 text-center">
                            <Link
                                href="/kontak"
                                className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Kembali ke Halaman Kontak
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
