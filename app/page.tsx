import Hero from "./components/Hero";
import Profil from "./components/Profil";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MutiaraHikmah from "./components/MutiaraHikmah";
import Galeri from "./components/Galeri";
import GlobePanti from "./components/GlobePanti";
import GalleryShowcase from "./components/GalleryShowcase";

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