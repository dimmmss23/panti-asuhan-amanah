import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LiterasiPondok from "./components/LiterasiPondok";
import Galeri from "./components/Galeri";

const Page = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <LiterasiPondok />
        <Galeri />
      </main>
      <Footer />
    </div>
  )
}

export default Page;