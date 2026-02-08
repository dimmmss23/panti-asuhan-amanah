"use client";

import { Skeleton } from "@heroui/skeleton";

export default function GlobeSkeleton() {
    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center w-full h-full bg-transparent">
            {/* Constrain to circle based on height */}
            <div className="relative h-full aspect-square flex items-center justify-center">
                {/* Glossy Outer Circle */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-200">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>

                {/* Glossy Inner Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-3/4 h-3/4 rounded-full overflow-hidden bg-gray-300">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    );
}
