"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        { src: "/Hero 1.png", alt: "Hero 1" },
        { src: "/Hero 2.png", alt: "Hero 2" },
    ]

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, [slides.length])

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    // Auto slide setiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 5000)

        return () => clearInterval(interval)
    }, [nextSlide])

    return (
        <>
            {/* Hero Slider Section */}
            <section className="relative w-full overflow-hidden group/slider">
                {/* Slides Container */}
                <motion.div
                    className="flex"
                    animate={{ x: `-${currentSlide * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="w-full flex-shrink-0 relative"
                            style={{ minWidth: '100%' }}
                        >
                            {/* Container gambar - height auto mengikuti gambar asli */}
                            <div className="w-full relative">
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    width={1920}
                                    height={1080}
                                    sizes="100vw"
                                    className="w-full h-auto"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Navigation Arrows */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg z-10 hidden group-hover/slider:block"
                    aria-label="Previous slide"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg z-10 hidden group-hover/slider:block"
                    aria-label="Next slide"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.button>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                ? "bg-white scale-125"
                                : "bg-white/50 hover:bg-white/75"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Hero Donasi Section - Attractive Design */}
            <section
                className="w-full bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 relative overflow-hidden"
            >
                {/* Background Pattern - Simplified */}
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                {/* Decorative Circles - Removed blur for better performance */}
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-green-500/20 rounded-full" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-400/20 rounded-full" />

                <div className="container mx-auto px-3 py-4 sm:py-6 md:py-10 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-block mb-2 px-3 py-1 bg-amber-400/20 backdrop-blur-[2px] rounded-full border border-amber-400/30">
                                <span className="text-amber-200 text-xs font-medium flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Berbagi Kebaikan
                                </span>
                            </div>

                            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white mb-2 sm:mb-3 leading-tight">
                                Awali Harimu dengan{" "}
                                <span className="text-amber-300">Doa dari Malaikat</span>
                            </h2>

                            <p className="text-green-100 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 max-w-lg mx-auto md:mx-0 leading-relaxed">
                                &quot;Barangsiapa memberi kemudahan kepada orang yang kesulitan, Allah akan memberi kemudahan di dunia dan akhirat.&quot;
                                <span className="block mt-1.5 text-green-200/80 text-xs font-medium">— HR. Muslim</span>
                            </p>

                            <Link href="/donasi">
                                <motion.button
                                    className="group relative inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 transform hover:scale-105 active:scale-95 text-green-900 font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Donasi Sekarang
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.button>
                            </Link>

                            {/* Trust Badges */}
                            <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-green-200/80 text-xs">
                                <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Aman & Amanah
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    Transfer & QRIS
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Terdaftar Resmi
                                </span>
                            </div>
                        </div>

                        {/* Cartoon Illustration */}
                        <div className="flex-shrink-0 relative">
                            {/* Glow Effect Behind Character - Removed blur */}
                            <div className="absolute inset-0 bg-amber-400/10 rounded-full scale-75" />

                            {/* Cartoon SVG Illustration */}
                            <svg
                                className="w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 relative z-10"
                                viewBox="0 0 300 300"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ animation: 'float 3s ease-in-out infinite' }}
                            >
                                {/* Background Circle */}
                                <circle cx="150" cy="150" r="120" fill="#FCD34D" fillOpacity="0.3" />
                                <circle cx="150" cy="150" r="100" fill="#FCD34D" fillOpacity="0.2" />

                                {/* Character Body */}
                                <ellipse cx="150" cy="200" rx="50" ry="60" fill="#3B82F6" />

                                {/* Robe/Jubah Pattern */}
                                <path d="M100 200 Q150 230 200 200" stroke="#2563EB" strokeWidth="3" fill="none" />
                                <path d="M110 215 Q150 240 190 215" stroke="#2563EB" strokeWidth="2" fill="none" />

                                {/* Head */}
                                <circle cx="150" cy="120" r="45" fill="#FBBF24" />
                                <ellipse cx="150" cy="120" rx="45" ry="45" fill="#FDE68A" />

                                {/* Peci/Kopiah */}
                                <ellipse cx="150" cy="85" rx="35" ry="12" fill="#1F2937" />
                                <rect x="115" y="75" width="70" height="15" rx="2" fill="#1F2937" />

                                {/* Face */}
                                {/* Eyes */}
                                <ellipse cx="135" cy="115" rx="6" ry="7" fill="#1F2937" />
                                <ellipse cx="165" cy="115" rx="6" ry="7" fill="#1F2937" />
                                <circle cx="137" cy="113" r="2" fill="white" />
                                <circle cx="167" cy="113" r="2" fill="white" />

                                {/* Eyebrows */}
                                <path d="M125 105 Q135 100 145 105" stroke="#1F2937" strokeWidth="2" fill="none" />
                                <path d="M155 105 Q165 100 175 105" stroke="#1F2937" strokeWidth="2" fill="none" />

                                {/* Smile */}
                                <path d="M135 135 Q150 150 165 135" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />

                                {/* Cheeks */}
                                <circle cx="120" cy="130" r="8" fill="#FBBF24" fillOpacity="0.5" />
                                <circle cx="180" cy="130" r="8" fill="#FBBF24" fillOpacity="0.5" />

                                {/* Arms */}
                                <ellipse cx="95" cy="190" rx="15" ry="35" fill="#3B82F6" transform="rotate(-20 95 190)" />
                                <ellipse cx="205" cy="190" rx="15" ry="35" fill="#3B82F6" transform="rotate(20 205 190)" />

                                {/* Hands */}
                                <circle cx="80" cy="165" r="12" fill="#FDE68A" />
                                <circle cx="220" cy="165" r="12" fill="#FDE68A" />

                                {/* Phone in Hand */}
                                <rect x="210" y="155" width="20" height="35" rx="3" fill="#374151" />
                                <rect x="212" y="160" width="16" height="25" rx="2" fill="#60A5FA" />

                                {/* Donation Icon floating */}
                                <g style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                                    <circle cx="70" cy="100" r="25" fill="#10B981" />
                                    <path d="M60 100 L70 90 L80 100 L70 110 Z" fill="white" />
                                    <circle cx="70" cy="100" r="8" fill="#10B981" />
                                    <path d="M66 100 Q70 96 74 100 Q70 104 66 100" fill="#FDE68A" />
                                </g>

                                {/* Love Heart floating */}
                                <g style={{ animation: 'pulse 2.5s ease-in-out infinite' }}>
                                    <path d="M240 80 C240 70 250 65 255 75 C260 65 270 70 270 80 C270 95 255 105 255 105 C255 105 240 95 240 80Z" fill="#EF4444" />
                                </g>

                                {/* Sparkles */}
                                <g style={{ animation: 'twinkle 1.5s ease-in-out infinite' }}>
                                    <path d="M50 150 L55 145 L60 150 L55 155 Z" fill="#FCD34D" />
                                    <path d="M250 130 L253 125 L256 130 L253 135 Z" fill="#FCD34D" />
                                    <path d="M90 60 L93 55 L96 60 L93 65 Z" fill="#FCD34D" />
                                </g>
                            </svg>

                            {/* CSS Animations - More performant than Framer Motion */}
                            <style jsx>{`
                                @keyframes float {
                                    0%, 100% { transform: translateY(0); }
                                    50% { transform: translateY(-10px); }
                                }
                                @keyframes pulse {
                                    0%, 100% { opacity: 0.7; transform: scale(1); }
                                    50% { opacity: 1; transform: scale(1.05); }
                                }
                                @keyframes twinkle {
                                    0%, 100% { opacity: 0.5; }
                                    50% { opacity: 1; }
                                }
                            `}</style>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
