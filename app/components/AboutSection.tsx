import Link from 'next/link';

const AboutSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Tentang Kami</h2>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto mb-8">
                        Yayasan Panti Asuhan Amanah hadir sebagai wujud kepedulian nyata terhadap masa depan generasi penerus bangsa.
                        Kami berkomitmen penuh memuliakan anak-anak yatim, piatu, dan dhuafa melalui sistem pengasuhan berbasis kekeluargaan,
                        pendidikan berkualitas, dan pembinaan akhlak mulia.
                    </p>
                    <Link href="/profil" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg">
                        Profil Yayasan
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
