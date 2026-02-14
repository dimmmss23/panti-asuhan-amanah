import Hero from "./components/Hero";
import Profil from "./components/Profil";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MutiaraHikmah from "./components/MutiaraHikmah";
import Galeri from "./components/Galeri";
import GlobePanti from "./components/GlobePanti";
import GalleryShowcase from "./components/GalleryShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Yayasan Panti Asuhan Amanah hadir sebagai wujud kepedulian nyata terhadap anak-anak yatim, piatu, dan dhuafa.",
  openGraph: {
    description: "Yayasan Panti Asuhan Amanah hadir sebagai wujud kepedulian nyata terhadap anak-anak yatim, piatu, dan dhuafa.",
  },
};

const Page = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-24 md:pt-28">
        <Hero />
        <MutiaraHikmah />
        <Profil />
        <GlobePanti />
        <Galeri />
      </main>
      <Footer />
    </div>
  )
}

export default Page;