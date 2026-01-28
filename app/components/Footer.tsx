import Link from "next/link"
import Image from "next/image"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full bg-green-900">
            <div className="max-w-7xl mx-auto py-12 px-6">
                {/* Grid 4 Kolom */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    
                    {/* Kolom 1 - Tentang Yayasan */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Image 
                                src="/logo.png"
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
                        {/* Social Media */}
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-9 h-9 bg-green-800 hover:bg-yellow-500 rounded-full flex items-center justify-center text-gray-300 hover:text-green-900 transition duration-300" aria-label="Facebook">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-9 h-9 bg-green-800 hover:bg-yellow-500 rounded-full flex items-center justify-center text-gray-300 hover:text-green-900 transition duration-300" aria-label="Instagram">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-9 h-9 bg-green-800 hover:bg-yellow-500 rounded-full flex items-center justify-center text-gray-300 hover:text-green-900 transition duration-300" aria-label="YouTube">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-9 h-9 bg-green-800 hover:bg-yellow-500 rounded-full flex items-center justify-center text-gray-300 hover:text-green-900 transition duration-300" aria-label="WhatsApp">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Kolom 2 - Lokasi */}
                    <div>
                        <h3 className="text-yellow-400 font-bold text-lg mb-4">Lokasi Kami</h3>
                        
                        {/* Lokasi 1 */}
                        <div className="mb-4 pb-4 border-b border-green-800">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                <span className="text-yellow-400 text-sm font-semibold">Kantor Pusat</span>
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
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                <span className="text-yellow-400 text-sm font-semibold">Cabang</span>
                            </div>
                            <address className="text-gray-300 text-sm not-italic leading-relaxed pl-6">
                                Jl. Lb. Rejo, Sekip Jaya,<br />
                                Kec. Kemuning, Kota Palembang,<br />
                                Sumatera Selatan
                            </address>
                        </div>
                    </div>

                    {/* Kolom 3 - Kontak */}
                    <div>
                        <h3 className="text-yellow-400 font-bold text-lg mb-4">Hubungi Kami</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Telepon</p>
                                    <p className="text-gray-300 text-sm">+62 812-3456-7890</p>
                                    <p className="text-gray-300 text-sm">+62 711-123456</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Email</p>
                                    <p className="text-gray-300 text-sm">info@pantiamanah.org</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">WhatsApp</p>
                                    <p className="text-gray-300 text-sm">+62 812-3456-7890</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 4 - Jam Operasional */}
                    <div>
                        <h3 className="text-yellow-400 font-bold text-lg mb-4">Jam Operasional</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-green-800/50 rounded-lg">
                                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="text-gray-300 text-sm font-medium">Senin - Minggu</p>
                                    <p className="text-yellow-400 text-sm font-semibold">08:00 - 17:00 WIB</p>
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
                    </div>
                </div>

                {/* Bagian Bawah Footer */}
                <div className="border-t border-green-800 mt-10 pt-6">
                    <p className="text-center text-gray-400 text-sm">
                        © {currentYear} Yayasan Panti Asuhan Amanah. Dikelola dengan amanah untuk umat.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
