"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Tentang Kami</h2>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto mb-8">
                        Yayasan Panti Asuhan Amanah hadir sebagai wujud kepedulian nyata terhadap masa depan generasi penerus bangsa.
                        Kami berkomitmen penuh memuliakan anak-anak yatim, piatu, dan dhuafa melalui sistem pengasuhan berbasis kekeluargaan,
                        pendidikan berkualitas, dan pembinaan akhlak mulia.
                    </p>
                    <Link href="/profil">
                        <motion.span
                            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-md"
                            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Profil Yayasan
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
