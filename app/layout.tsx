"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SmoothScrolling } from "./components/SmoothScrolling"
import "./globals.css";

import NextTopLoader from "nextjs-toploader";

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <title>Panti Asuhan Amanah</title>
        <meta name="description" content="Yayasan Panti Asuhan Amanah - Memuliakan anak yatim, piatu, dan dhuafa melalui pengasuhan berbasis kekeluargaan, pendidikan formal, dan pembinaan akhlak mulia di Palembang, Sumatera Selatan." />
        <meta name="keywords" content="panti asuhan, yayasan amanah, palembang, donasi, anak yatim, rumah tahfidz" />
        <meta name="google-site-verification" content="TdIB4lhbLG9a8tJXGuRtGK4ob8jU9of2YWF-fBhj33w" />
      </head>
      <body className="overflow-x-hidden">
        <SmoothScrolling>
          <NextTopLoader
            color="#10B981"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #10B981,0 0 5px #10B981"
          />
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
