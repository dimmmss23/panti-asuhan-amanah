"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
    id: string;
    src: string;
    width: number;
    height: number;
}

interface GalleryGridProps {
    images: GalleryItem[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Animate grid items on scroll
            const items = gsap.utils.toArray<HTMLElement>(".gallery-item");

            items.forEach((item, index) => {
                gsap.fromTo(
                    item,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        },
                        // Stagger based on index to create a wave effect
                        delay: (index % 3) * 0.1
                    }
                );
            });
        }, gridRef);

        return () => ctx.revert();
    }, [images]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const img = target.querySelector("img");
        const overlay = target.querySelector(".overlay");
        const icon = target.querySelector(".icon-zoom");

        if (img && overlay && icon) {
            gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power1.out" });
            gsap.to(overlay, { opacity: 1, duration: 0.3 });
            gsap.fromTo(icon, { scale: 0, rotation: -45 }, { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" });
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const img = target.querySelector("img");
        const overlay = target.querySelector(".overlay");
        const icon = target.querySelector(".icon-zoom");

        if (img && overlay && icon) {
            gsap.to(img, { scale: 1, duration: 0.4, ease: "power1.out" });
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
            gsap.to(icon, { scale: 0, duration: 0.2 });
        }
    };

    return (
        <div ref={gridRef} className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4 pb-20">
            {images.map((image, index) => (
                <div
                    key={image.id}
                    className="gallery-item break-inside-avoid relative overflow-hidden rounded-xl shadow-lg cursor-pointer group mb-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative w-full bg-gray-200">
                        <Image
                            src={`/galeriutama/${image.src}`}
                            alt={`Foto Dokumentasi Panti ${index + 1}`}
                            width={image.width}
                            height={image.height}
                            className="w-full h-auto object-cover transform will-change-transform block"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            loading="lazy"
                            quality={75}
                        />
                        {/* Overlay */}
                        <div className="overlay absolute inset-0 bg-black/30 opacity-0 flex items-center justify-center transition-opacity pointer-events-none">
                            <div className="icon-zoom bg-white/30 backdrop-blur-md p-3 rounded-full border border-white/40 shadow-xl opacity-0 scale-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
