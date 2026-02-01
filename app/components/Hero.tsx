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
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <div className="w-full relative">
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto block"
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

            {/* Hero Donasi Section */}
            <motion.section
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <Link href="/donasi" className="block relative w-full overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div className="w-full relative">
                        <Image
                            src="/Hero 3.png"
                            alt="Donasi Sekarang"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    {/* Overlay hover effect */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                    {/* Call to action overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.span
                            initial={{ y: 20 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-lg shadow-lg"
                        >
                            Donasi Sekarang →
                        </motion.span>
                    </div>
                </Link>
            </motion.section>
        </>
    )
}

export default Hero
