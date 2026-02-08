"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { GlobeConfig } from "./GlobeViz";


// Dynamic import untuk GlobeViz (client-side only)
const GlobeViz = dynamic(() => import("./GlobeViz"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full bg-gray-50/50 rounded-full animate-pulse">
            <div className="w-2/3 h-2/3 bg-gray-100/50 rounded-full" />
        </div>
    ),
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

export default function GlobePanti() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative py-16 sm:py-20 bg-white w-full overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Main Card */}
                <div
                    className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    {/* Subtle Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600" />

                    <div className="relative z-10 p-6 sm:p-10 md:p-12">
                        {/* Header Section */}
                        <div className="text-center relative z-50 flex flex-col items-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md border border-green-100 mb-4">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                Palembang, Sumatera Selatan
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Lokasi Panti Asuhan
                            </h2>
                            <div className="w-12 h-0.5 bg-green-600 mx-auto rounded-full mb-5" />
                            <p className="text-center text-sm sm:text-base font-normal text-gray-600 max-w-lg mx-auto">
                                Kunjungi kami dan lihat langsung kegiatan anak-anak asuh di Panti Asuhan Amanah.
                            </p>
                        </div>

                        {/* Globe Visualization */}
                        <div className="relative w-full h-[280px] sm:h-[320px] md:h-[380px] z-10 pointer-events-auto mt-4">
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent z-40 pointer-events-none" />
                            <GlobeViz data={ARCS_DATA} globeConfig={GLOBE_CONFIG} />
                        </div>

                        {/* Location Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 mb-8">
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3 hover:border-green-200 hover:bg-green-50/30 transition-all duration-300">
                                <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-semibold text-sm mb-0.5">Lokasi Panti Asuhan Amanah (A)</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">Jl. Bambang Utoyo Jl. Pusaka No.76, Pasar Lemabang, 3 Ilir, Kec. Ilir Tim. II, Kota Palembang, Sumatera Selatan</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3 hover:border-green-200 hover:bg-green-50/30 transition-all duration-300">
                                <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-semibold text-sm mb-0.5">Lokasi Panti Asuhan Amanah (B)</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">Jl. Lb. Rejo, Sekip Jaya, Kec. Kemuning, Kota Palembang, Sumatera Selatan</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="relative z-50 flex justify-center">
                            <Link href="/kontak" className="inline-block pointer-events-auto">
                                <button
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm hover:shadow cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm"
                                >
                                    Lihat Lokasi Detail
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
