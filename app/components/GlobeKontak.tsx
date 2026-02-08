"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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
    autoRotateSpeed: 0.5,
};

// Data arcs kosong (hanya menampilkan satu titik lokasi)
const ARCS_DATA: Position[] = [];

export default function GlobeKontak() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="w-full">
            <div className="relative w-full flex flex-col items-center">
                {/* Header Section */}
                <div className="text-center relative z-10 flex flex-col items-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Palembang, Sumatera Selatan
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Lokasi Panti Asuhan Amanah
                    </h3>
                    <div className="w-20 h-1 bg-green-600 mx-auto rounded-full" />
                    <p className="text-center text-sm md:text-base font-normal text-gray-600 max-w-md mt-4 mx-auto">
                        Kunjungi kami dan lihat langsung kegiatan anak-anak asuh di Panti Asuhan Amanah.
                    </p>
                </div>

                {/* Globe Visualization */}
                <div className="relative w-full h-[280px] md:h-[320px] z-0 pointer-events-auto transition-opacity duration-500 mt-2">
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent z-40 pointer-events-none" />
                    <GlobeViz data={ARCS_DATA} globeConfig={GLOBE_CONFIG} />
                </div>
            </div>
        </section>
    );
}
