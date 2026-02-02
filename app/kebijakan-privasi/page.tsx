import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Link from "next/link"

export default function KebijakanPrivasiPage() {
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
                                <pattern id="islamic-pattern-privacy" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="1"/>
                                    <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="1"/>
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="1"/>
                                    <path d="M30 15L45 30L30 45L15 30Z" fill="none" stroke="white" strokeWidth="0.5"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#islamic-pattern-privacy)"/>
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Title */}
                            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight mb-4">
                                Kebijakan Privasi
                            </h1>
                            
                            {/* Decorative Divider */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400/70" />
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400/70" />
                            </div>
                            
                            {/* Description */}
                            <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
                                Komitmen kami dalam melindungi privasi dan data pribadi Anda
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

                            {/* Intro */}
                            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                                <p className="text-gray-700 leading-relaxed">
                                    Yayasan Panti Asuhan Amanah berkomitmen untuk melindungi privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika menggunakan layanan kami.
                                </p>
                            </div>

                            {/* Section 1 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">1</span>
                                    Informasi yang Kami Kumpulkan
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Kami dapat mengumpulkan informasi berikut:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Informasi Identitas:</strong> Nama lengkap, alamat email, nomor telepon</li>
                                        <li><strong>Informasi Donasi:</strong> Riwayat donasi, jumlah donasi, metode pembayaran (tanpa detail kartu)</li>
                                        <li><strong>Informasi Teknis:</strong> Alamat IP, jenis browser, waktu akses untuk keperluan keamanan</li>
                                        <li><strong>Informasi Komunikasi:</strong> Pesan yang Anda kirimkan melalui formulir kontak atau email</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">2</span>
                                    Penggunaan Informasi
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Informasi yang dikumpulkan digunakan untuk:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Memproses dan mengkonfirmasi donasi Anda</li>
                                        <li>Mengirimkan informasi terkait program dan kegiatan yayasan</li>
                                        <li>Menyediakan laporan penggunaan donasi</li>
                                        <li>Menanggapi pertanyaan dan permintaan Anda</li>
                                        <li>Meningkatkan layanan dan pengalaman pengguna website</li>
                                        <li>Memenuhi kewajiban hukum dan perpajakan</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">3</span>
                                    Perlindungan Data
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Kami menerapkan langkah-langkah keamanan untuk melindungi informasi Anda:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Enkripsi data untuk transaksi sensitif</li>
                                        <li>Pembatasan akses hanya kepada pengurus yang berwenang</li>
                                        <li>Penyimpanan data di server yang aman</li>
                                        <li>Peninjauan berkala terhadap praktik keamanan</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">4</span>
                                    Berbagi Informasi
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Kami <strong>tidak akan</strong> menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga untuk tujuan komersial.</p>
                                    <p>Informasi dapat dibagikan dalam situasi berikut:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Dengan persetujuan eksplisit dari Anda</li>
                                        <li>Untuk memenuhi kewajiban hukum atau perintah pengadilan</li>
                                        <li>Kepada penyedia layanan yang membantu operasional yayasan (dengan perjanjian kerahasiaan)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">5</span>
                                    Perlindungan Privasi Anak Asuh
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Kami sangat memperhatikan privasi dan keselamatan anak-anak asuh kami:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Foto dan identitas anak asuh hanya dipublikasikan dengan izin wali sah</li>
                                        <li>Informasi pribadi anak asuh tidak dibagikan kepada publik</li>
                                        <li>Kunjungan ke panti asuhan harus melalui prosedur yang ditetapkan</li>
                                        <li>Pengambilan foto/video saat berkunjung harus mendapat izin terlebih dahulu</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 6 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">6</span>
                                    Hak Anda
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Anda memiliki hak untuk:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Mengakses informasi pribadi yang kami simpan tentang Anda</li>
                                        <li>Meminta koreksi atas informasi yang tidak akurat</li>
                                        <li>Meminta penghapusan data pribadi Anda (dengan batasan tertentu)</li>
                                        <li>Berhenti berlangganan dari komunikasi pemasaran</li>
                                        <li>Mengajukan keluhan terkait penanganan data pribadi Anda</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 7 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">7</span>
                                    Cookie dan Teknologi Pelacakan
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Website kami dapat menggunakan cookie untuk:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Menyimpan preferensi pengguna</li>
                                        <li>Menganalisis lalu lintas website untuk peningkatan layanan</li>
                                        <li>Memastikan keamanan sesi pengguna</li>
                                    </ul>
                                    <p className="mt-3">Anda dapat mengatur browser untuk menolak cookie, namun beberapa fitur website mungkin tidak berfungsi optimal.</p>
                                </div>
                            </div>

                            {/* Section 8 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">8</span>
                                    Perubahan Kebijakan Privasi
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan diberitahukan melalui website atau email.</p>
                                    <p>Tanggal &quot;Terakhir diperbarui&quot; di bagian atas halaman ini menunjukkan kapan kebijakan ini terakhir direvisi.</p>
                                </div>
                            </div>

                            {/* Section 9 */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">9</span>
                                    Hubungi Kami
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-3 pl-11">
                                    <p>Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi ini atau penanganan data pribadi Anda, silakan hubungi:</p>
                                    <div className="bg-gray-50 rounded-lg p-4 mt-3">
                                        <p className="font-semibold text-gray-800">Yayasan Panti Asuhan Amanah</p>
                                        <ul className="mt-2 space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="break-all">yayasanpantiasuhanamanah@gmail.com</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span>+62 821-8045-8885</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span>+62 859-3023-3424</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>
                                                    <strong>Alamat Lokasi A:</strong><br />
                                                    Jl. Bambang Utoyo, Jl. Pusaka No.76,<br />
                                                    Pasar Lemabang, 3 Ilir, Kec. Ilir Tim. II,<br />
                                                    Kota Palembang, Sumatera Selatan
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>
                                                    <strong>Alamat Lokasi B:</strong><br />
                                                    Jl. Lb. Rejo, Sekip Jaya,<br />
                                                    Kec. Kemuning, Kota Palembang,<br />
                                                    Sumatera Selatan
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
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
