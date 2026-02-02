import { Metadata } from "next";
import ProfilClient from "./ProfilClient";
import prisma from "../libs/prisma";

export const metadata: Metadata = {
    title: "Profil Yayasan - Yayasan Panti Asuhan Amanah",
    description: "Profil Yayasan Amanah Palembang. Lembaga kesejahteraan sosial yang berkomitmen mengasuh dan membimbing anak-anak yatim, piatu, dan dhuafa.",
};

const AboutPage = async () => {
    const profil = await prisma.profil.findFirst({
        include: { Legalitas: true }
    });
    
    return <ProfilClient profil={profil} legalitas={profil?.Legalitas || []} />;
};

export default AboutPage;