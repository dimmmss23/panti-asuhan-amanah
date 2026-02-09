"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SmoothScrolling } from "./SmoothScrolling";
import NextTopLoader from "nextjs-toploader";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
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
    );
}
