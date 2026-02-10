import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import GalleryGrid from './GalleryGrid';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const dynamic = 'force-dynamic';

interface GalleryItem {
    id: string;
    src: string;
    width: number;
    height: number;
}

export default async function Page({ params }: { params: Promise<{ fullfoto: string }> }) {
    const galleryDir = path.join(process.cwd(), 'public', 'galeriutama');
    let images: GalleryItem[] = [];

    try {
        const files = fs.readdirSync(galleryDir);
        const imageFiles = files.filter((file) =>
            /\.(jpg|jpeg|png|webp)$/i.test(file)
        );

        images = imageFiles.map((file, index) => {
            const filePath = path.join(galleryDir, file);
            let dimensions = { width: 800, height: 600 };

            try {
                const buffer = fs.readFileSync(filePath);
                const size = sizeOf(buffer);
                if (size.width && size.height) {
                    dimensions = { width: size.width, height: size.height };
                }
            } catch (e) {
                console.error(`Error getting size for ${file}:`, e);
            }

            return {
                id: `img-${index}-${file}`,
                src: file,
                width: dimensions.width,
                height: dimensions.height
            };
        });
    } catch (error) {
        console.error("Error reading gallery directory:", error);
    }

    const resolvedParams = await params;
    const title = resolvedParams.fullfoto === 'full-album' ? 'Galeri Lengkap' : 'Dokumentasi Panti Lama';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow pt-24 pb-12">
                {/* Header Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-block mb-3 p-2 px-4 rounded-full bg-emerald-100 text-emerald-800 text-xs md:text-sm font-semibold tracking-wide uppercase">
                            Arsip Foto
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            {title}
                        </h1>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 px-4">
                            Kumpulan momen berharga dan kenangan indah dari kegiatan Panti Asuhan Amanah.
                        </p>
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="max-w-[1920px] mx-auto px-2 sm:px-6 lg:px-8">
                    {images.length > 0 ? (
                        <GalleryGrid images={images} />
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm mx-4">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xl text-gray-500">Belum ada foto yang ditampilkan.</p>
                        </div>
                    )}
                </section>

                {/* Navigation Actions */}
                <div className="mt-12 text-center pb-8">
                    <Link
                        href="/galeri"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm md:text-base font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:px-10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Kembali ke Galeri Utama
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
