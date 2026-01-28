"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

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

    const scrollSlider = (direction: "left" | "right") => {
        if (sliderRef.current) {
            const scrollAmount = 320
            sliderRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            })
        }
    }

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
        <section className="py-16 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Mutiara Hikmah
                    </h2>
                    <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
                </div>

                {/* Main Video - Large */}
                <div className="mb-8">
                    <div 
                        className="relative w-full max-w-4xl mx-auto cursor-pointer group"
                        onClick={() => openModal(mainVideo)}
                    >
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                            {/* Thumbnail */}
                            <Image
                                src={mainVideo.thumbnail}
                                alt={mainVideo.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                            
                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-green-700 transition-all duration-300">
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slider Videos - Smaller Size */}
                <div className="relative mt-8">
                    {/* Videos Slider */}
                    <div
                        ref={sliderRef}
                        className="flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible scroll-smooth pb-4 sm:pb-0 max-w-5xl mx-auto"
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
                            <div
                                key={video.id}
                                className="flex-shrink-0 w-[220px] sm:w-full cursor-pointer group/card"
                                onClick={() => openModal(video)}
                            >
                                <div className="relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-black">
                                    {/* Thumbnail */}
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/40 transition-colors duration-300" />
                                    
                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg opacity-90 group-hover/card:opacity-100 group-hover/card:scale-110 group-hover/card:bg-green-700 transition-all duration-300">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Scroll Progress Bar - Mobile Only */}
                    <div className="mt-6 sm:hidden max-w-5xl mx-auto">
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-green-600 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${33.33 + (scrollProgress * 0.6667)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {isModalOpen && selectedVideo && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
                    
                    {/* Modal Content */}
                    <div 
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
                    </div>
                </div>
            )}
        </section>
    )
}

export default LiterasiPondok
