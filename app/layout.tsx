"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
        <title>Yayasan Panti Asuhan Amanah</title>
        <meta name="description" content="Yayasan Panti Asuhan Amanah - Memuliakan anak yatim, piatu, dan dhuafa melalui pengasuhan berbasis kekeluargaan, pendidikan formal, dan pembinaan akhlak mulia di Palembang, Sumatera Selatan." />
        <meta name="keywords" content="panti asuhan, yayasan amanah, palembang, donasi, anak yatim, rumah tahfidz" />
      </head>
      <body className="overflow-x-hidden">
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
      </body>
    </html>
  );
}
