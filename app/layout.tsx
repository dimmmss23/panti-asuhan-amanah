import type { Metadata } from "next";
import Providers from "./components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Yayasan Panti Asuhan Amanah",
    default: "Panti Asuhan Amanah - Yayasan Panti Asuhan Amanah",
  },
  description: "Yayasan Panti Asuhan Amanah - Memuliakan anak yatim, piatu, dan dhuafa melalui pengasuhan berbasis kekeluargaan, pendidikan formal, dan pembinaan akhlak mulia di Palembang, Sumatera Selatan.",
  keywords: ["panti asuhan", "yayasan amanah", "palembang", "donasi", "anak yatim", "rumah tahfidz"],
  openGraph: {
    siteName: "Panti Asuhan Amanah Palembang",
    type: "website",
    locale: "id_ID",
  },
  verification: {
    google: "TdIB4lhbLG9a8tJXGuRtGK4ob8jU9of2YWF-fBhj33w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Yayasan Panti Asuhan Amanah",
      "url": "https://www.pantiasuhanamanah.or.id/"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Yayasan Panti Asuhan Amanah",
      "alternateName": [
        "Panti Asuhan Amanah",
        "Yayasan Amanah Palembang",
        "Panti Asuhan Amanah Palembang"
      ],
      "url": "https://www.pantiasuhanamanah.or.id/",
      "logo": "https://www.pantiasuhanamanah.or.id/icon.png",
      "description": "Yayasan Panti Asuhan Amanah hadir sebagai wujud kepedulian nyata terhadap anak-anak yatim, piatu, dan dhuafa.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Palembang",
        "addressRegion": "Sumatera Selatan",
        "addressCountry": "ID"
      },
      "sameAs": [
        "https://www.instagram.com/pantiasuhanamanah/",
        "https://www.facebook.com/pantiasuhanamanah/"
      ]
    }
  ];

  return (
    <html lang="id">
      <body className="overflow-x-hidden">
        {/* JSON-LD untuk Google Site Name */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}