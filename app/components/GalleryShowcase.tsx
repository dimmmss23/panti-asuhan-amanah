"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Images are fetched dynamically from API


interface GalleryShowcaseProps {
    withButton?: boolean;
}

export default function GalleryShowcase({ withButton = false }: GalleryShowcaseProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch images from API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/gallery-showcase');
                if (response.ok) {
                    const data = await response.json();
                    setImages(data.images || []);
                }
            } catch (error) {
                console.error("Failed to fetch gallery images", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    // Intersection Observer untuk mendeteksi kartu aktif (tengah)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || isLoading || images.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: container,
                threshold: 0.6, // 60% element terlihat dianggap aktif
                rootMargin: '0px -10% 0px -10%' // Persempit area deteksi ke tengah
            }
        );

        // Wait a bit for DOM to update after images load
        setTimeout(() => {
            const items = container.querySelectorAll('.gallery-item');
            items.forEach((item) => observer.observe(item));
        }, 100);

        return () => {
            const items = container.querySelectorAll('.gallery-item');
            items.forEach((item) => observer.unobserve(item));
            observer.disconnect();
        };
    }, [isLoading, images]);

    if (isLoading) {
        return (
            <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gray-50 rounded-2xl animate-pulse">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400 text-sm">Memuat galeri...</p>
                </div>
            </div>
        );
    }

    if (images.length === 0) {
        return null; // Or return a "No images" placeholder if preferred
    }

    return (
        <div className="w-full bg-white py-8 md:py-12 relative group flex justify-center">

            {/* Navigasi Kiri/Kanan (Opsional, untuk desktop) */}
            <div className="absolute top-1/2 left-2 md:left-8 z-20 -translate-y-1/2 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => {
                        const container = scrollContainerRef.current;
                        if (container) {
                            const itemWidth = container.clientWidth;
                            container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
                        }
                    }}
                    className="bg-white/80 hover:bg-white text-emerald-600 p-3 rounded-full shadow-lg backdrop-blur-sm border border-emerald-100 transition-transform hover:scale-110"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
            </div>
            <div className="absolute top-1/2 right-2 md:right-8 z-20 -translate-y-1/2 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => {
                        const container = scrollContainerRef.current;
                        if (container) {
                            const itemWidth = container.clientWidth;
                            container.scrollBy({ left: itemWidth, behavior: 'smooth' });
                        }
                    }}
                    className="bg-white/80 hover:bg-white text-emerald-600 p-3 rounded-full shadow-lg backdrop-blur-sm border border-emerald-100 transition-transform hover:scale-110"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            {/* Scroll Container - Manual Swipe/Scroll - Single Item View */}
            {/* Wrapper width terbatas (max-w-4xl) untuk "perkecil ukuran" */}
            <div className="w-full max-w-4xl px-4 md:px-0">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto py-4 px-0 gap-0 snap-x snap-mandatory scrollbar-hide items-center rounded-2xl"
                    style={{
                        scrollBehavior: 'smooth',
                    }}
                >
                    {/* No Spacers needed for full width items */}

                    {images.map((src, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={index}
                                data-index={index}
                                onClick={() => {
                                    // Scroll to this item on click (helper for edge cases)
                                    const container = scrollContainerRef.current;
                                    const items = container?.querySelectorAll('.gallery-item');
                                    if (items && items[index]) {
                                        items[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                                    }
                                }}
                                className="gallery-item relative flex-shrink-0 w-full aspect-[4/3] md:aspect-[3/2] snap-center cursor-pointer overflow-hidden p-1"
                            >
                                {/* Active State Logic restored for fade effect */}
                                <div className={`relative w-full h-full transition-all duration-1000 ease-in-out ${isActive ? 'opacity-100 scale-100 blur-0' : 'opacity-40 scale-95 blur-[2px]'}`}>
                                    <Image
                                        src={src}
                                        alt={`Galeri Panti ${index + 1}`}
                                        fill
                                        className="object-cover rounded-xl shadow-sm"
                                        sizes="(max-width: 768px) 90vw, 800px"
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {/* Optional "View All" Card - Rendered as a full slide if enabled */}
                    {withButton && (
                        <div className="gallery-item relative flex-shrink-0 w-full aspect-[4/3] md:aspect-[3/2] snap-center flex items-center justify-center p-4">
                            <div className="w-full h-full bg-gray-50 rounded-xl border-2 border-dashed border-emerald-200 flex flex-col items-center justify-center transition-colors cursor-pointer group">
                                <Link href="/galeri/album/full-album" className="absolute inset-0 z-10" />
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                                <span className="text-emerald-700 font-bold text-xl">Lihat Semua Album</span>
                                <p className="text-emerald-600/70 text-base mt-2">Jelajahi dokumentasi lengkap kami</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Indikator Dots - Pindah ke bawah container */}
                <div className="flex justify-center gap-2 mt-6 flex-wrap px-4">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const container = scrollContainerRef.current;
                                const items = container?.querySelectorAll('.gallery-item');
                                if (items && items[i]) {
                                    items[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                                }
                            }}
                            className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-emerald-500 opacity-100' : 'w-2 bg-gray-300 opacity-50 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {withButton && (
                    <div className="flex justify-center mt-6">
                        <Link
                            href="/galeri/album/full-album"
                            className="text-emerald-600 text-sm font-medium hover:text-emerald-700 hover:underline flex items-center gap-1"
                        >
                            Lihat Seluruh Arsip
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
