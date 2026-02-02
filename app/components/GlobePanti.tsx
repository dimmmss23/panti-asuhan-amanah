"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { GlobeConfig } from "./GlobeViz";

// Dynamic import untuk GlobeViz (client-side only)
const GlobeViz = dynamic(() => import("./GlobeViz"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-white animate-pulse" />,
});

// Tipe data untuk arc/posisi pada globe
type Position = {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
};

// Koordinat Panti Asuhan Amanah di Palembang
const PALEMBANG_COORDS = {
    lat: -2.9909,
    lng: 104.7567,
};

// Konfigurasi tampilan globe
const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(window.navigator.userAgent);
const GLOBE_CONFIG: GlobeConfig = {
    pointSize: 4,
    globeColor: "#ffffff",
    showAtmosphere: true,
    atmosphereColor: "#ffffff",
    atmosphereAltitude: 0.1,
    emissive: "#ffffff",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "#1a1a1a",
    ambientLight: "#86efac",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: PALEMBANG_COORDS,
    autoRotate: true,
    autoRotateSpeed: isMobile ? 2 : 0.5,
};

// Data arcs kosong (hanya menampilkan satu titik lokasi)
const ARCS_DATA: Position[] = [];

export default function GlobePanti() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="relative flex flex-col items-center justify-center py-16 min-h-screen md:h-auto bg-gray-50 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto w-full relative h-full md:h-[40rem] px-4 flex flex-col justify-start md:justify-center z-20">
                {/* Header Section */}
                <motion.div
                    className="text-center relative z-50 flex flex-col items-center"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Lokasi Panti Asuhan Amanah
                    </h2>
                    <div className="w-24 h-1 bg-green-600 mx-auto rounded-full" />
                    <p className="text-center text-base md:text-lg font-normal text-neutral-700 max-w-md mt-6 mx-auto mb-8">
                        Berlokasi di Palembang, Sumatera Selatan. Kami berkomitmen
                        untuk menebar kebaikan dan kasih sayang ke seluruh penjuru.
                    </p>
                </motion.div>

                {/* Globe Visualization */}
                <div className="relative w-full h-[300px] md:h-[400px] z-10 pointer-events-none md:pointer-events-auto transition-opacity duration-500 -mt-10 md:-mt-20">
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent z-40 pointer-events-none" />
                    <GlobeViz data={ARCS_DATA} globeConfig={GLOBE_CONFIG} />
                </div>

                {/* CTA Button */}
                <div className="relative z-50 mt-12 md:-mt-5 flex justify-center">
                    <Link href="/kontak" className="inline-block pointer-events-auto">
                        <motion.button
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-md cursor-pointer"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Lihat Lokasi Detail
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
