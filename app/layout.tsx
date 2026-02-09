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
    siteName: "Panti Asuhan Amanah",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Panti Asuhan Amanah",
    "url": "https://www.pantiasuhanamanah.or.id/"
  };

  return (
    <html lang="id">
      <body className="overflow-x-hidden">
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
