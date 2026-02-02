import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FAQ from "../components/FAQ"

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                {/* Page Header */}
                <div className="bg-green-600 text-white py-12 text-center">
                    <h1 className="text-3xl font-bold sm:text-4xl">Pusat Bantuan</h1>
                    <p className="mt-2 text-green-100">Kami siap membantu menjawab pertanyaan Anda</p>
                </div>
                <FAQ />
            </main>
            <Footer />
        </div>
    )
}
