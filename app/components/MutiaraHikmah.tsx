"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Video {
    id: string
    title: string
    thumbnail: string
}

const LiterasiPondok = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    // Video data with YouTube IDs
    const videos: Video[] = [
        {
            id: "UfK4FrCpUyc",
            title: "9 Keutamaan Shodaqoh | Surau Addin",
            thumbnail: `https://img.youtube.com/vi/UfK4FrCpUyc/maxresdefault.jpg`
        },
        {
            id: "hHN58L5vevk",
            title: "Video Literasi Pondok",
            thumbnail: `https://img.youtube.com/vi/hHN58L5vevk/maxresdefault.jpg`
        },
        {
            id: "tQjGHzT-tl8",
            title: "Literasi Pondok 2",
            thumbnail: `https://img.youtube.com/vi/tQjGHzT-tl8/maxresdefault.jpg`
        },
        {
            id: "P3M1veFP3Z8",
            title: "Keutamaan Sedekah dengan Harta Halal",
            thumbnail: `https://img.youtube.com/vi/P3M1veFP3Z8/maxresdefault.jpg`
        },
    ]

    const mainVideo = videos[0]
    const sliderVideos = videos.slice(1)

    const openModal = (video: Video) => {
        setSelectedVideo(video)
        setIsModalOpen(true)
        document.body.style.overflow = "hidden"
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedVideo(null)
        document.body.style.overflow = "auto"
    }

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal()
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [])


    // Track scroll position
    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return

        const handleScroll = () => {
            const scrollLeft = slider.scrollLeft
            const scrollWidth = slider.scrollWidth - slider.clientWidth
            const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0
            setScrollProgress(progress)
        }

        slider.addEventListener("scroll", handleScroll)
        handleScroll() // Initial calculation

        return () => slider.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section className="py-16 sm:py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Main Card */}
                <div
                    className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    {/* Subtle Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600" />

                    <div className="relative z-10 p-6 sm:p-10 md:p-12">
                        {/* Section Title */}
                        <div className="text-center mb-10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md border border-green-100 mb-4">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Kajian Islami
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Mutiara Hikmah
                            </h2>
                            <div className="w-12 h-0.5 bg-green-600 mx-auto rounded-full mb-5"></div>
                            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                                Kumpulan video kajian dan nasihat islami untuk menambah wawasan keagamaan serta memotivasi kita dalam berbuat kebaikan.
                            </p>
                        </div>

                        {/* Main Video - Large */}
                        <div className="mb-6">
                            <div
                                className="relative w-full max-w-4xl mx-auto cursor-pointer group"
                                onClick={() => openModal(mainVideo)}
                            >
                                <div className="relative aspect-video rounded-xl overflow-hidden shadow-md bg-gray-900 border border-gray-200">
                                    {/* Thumbnail */}
                                    <Image
                                        src={mainVideo.thumbnail}
                                        alt={mainVideo.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 896px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300" />

                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/90 rounded-full flex items-center justify-center shadow-lg group-hover/card:bg-green-600 group-hover/card:scale-110 transition-all duration-300 transform"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    {/* Video Title Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                        <h3 className="text-white font-bold text-sm sm:text-lg line-clamp-2">{mainVideo.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slider Videos - Smaller Size */}
                        <div className="relative mt-6">
                            {/* Videos Slider */}
                            <div
                                ref={sliderRef}
                                className="flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible scroll-smooth pb-4 sm:pb-0 max-w-4xl mx-auto"
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    WebkitOverflowScrolling: 'touch'
                                }}
                            >
                                <style jsx>{`
                                    div::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>
                                {sliderVideos.map((video) => (
                                    <motion.div
                                        key={video.id}
                                        className="flex-shrink-0 w-[200px] sm:w-full cursor-pointer group/card hover:-translate-y-1 transition-transform duration-300"
                                        onClick={() => openModal(video)}
                                    >
                                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-black ring-2 ring-white/30 hover:ring-green-400/50">
                                            {/* Thumbnail */}
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                sizes="200px"
                                                className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover/card:from-black/70 transition-colors duration-300" />

                                            {/* Play Button */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/90 rounded-full flex items-center justify-center shadow-lg group-hover/card:bg-green-600 group-hover/card:scale-110 transition-all duration-300">
                                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Scroll Progress Bar - Mobile Only */}
                            <div className="mt-6 sm:hidden max-w-4xl mx-auto">
                                <div className="w-full h-1.5 bg-green-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-600 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${33.33 + (scrollProgress * 0.6667)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Video Modal */}
            <AnimatePresence>
                {isModalOpen && selectedVideo && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative w-full max-w-5xl z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute -top-12 right-0 sm:top-0 sm:-right-12 p-2 text-white hover:text-gray-300 transition-colors"
                                aria-label="Tutup video"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Video Container */}
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                                    title={selectedVideo.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    )
}

export default LiterasiPondok
