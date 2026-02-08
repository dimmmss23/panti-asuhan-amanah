"use client";

import { Skeleton } from "@heroui/skeleton";

export default function GlobeSkeleton() {
    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center w-full h-full bg-transparent">
            {/* Constrain to circle based on height */}
            <div className="relative h-full aspect-square flex items-center justify-center">
                <Skeleton className="w-full h-full rounded-full bg-gray-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="w-3/4 h-3/4 rounded-full bg-gray-300/50" />
                </div>
            </div>
        </div>
    );
}
