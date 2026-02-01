import { Metadata } from "next";
import ProfilClient from "./ProfilClient";

export const metadata: Metadata = {
    title: "Profil Yayasan - Yayasan Panti Asuhan Amanah",
    description: "Profil Yayasan Amanah Palembang. Lembaga kesejahteraan sosial yang berkomitmen mengasuh dan membimbing anak-anak yatim, piatu, dan dhuafa.",
};

const AboutPage = () => {
    return <ProfilClient />;
};

export default AboutPage;