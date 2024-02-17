"use client";

import { useRouter } from "next/navigation";
import { GridLoader } from "react-spinners";

import { useIsMatch } from "@/hooks/useIsMatch";

const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-zinc-300/60 dark:before:via-zinc-600/60 before:to-transparent";

// 24

export function TaskSkeleton() {
    return (
        <div className="mt-8">
            <div className="flex justify-between">
                <div
                    className={`${shimmer} relative h-[25px] w-[380px] overflow-hidden bg-gray-100 shadow-sm dark:bg-zinc-800`}
                ></div>
                <div
                    className={`${shimmer} relative h-[25px] w-12 overflow-hidden bg-gray-100 shadow-sm dark:bg-zinc-800`}
                ></div>
            </div>
            <div
                className={`${shimmer} relative mt-3 overflow-hidden rounded bg-gray-100 p-5 shadow-sm dark:bg-zinc-800`}
            ></div>

            <div className="mt-3 flex flex-col gap-3">
                {new Array(6).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className={`${shimmer} relative overflow-hidden rounded bg-gray-100 p-12 shadow-sm dark:bg-zinc-800`}
                    />
                ))}
            </div>
        </div>
    );
}

export function ModalSkeleton() {
    const router = useRouter();
    const { isMatch } = useIsMatch();

    let content = (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`${shimmer} absolute  left-1/2 top-1/2 h-[455px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded p-6 dark:bg-zinc-800 dark:text-white md:w-[43vw]`}
        ></div>
    );

    if (isMatch) {
        content = (
            <GridLoader
                className="absolute  left-1/2 top-1/2 h-[455px] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                color="white"
            />
        );
    }

    return (
        <div
            className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/60"
            onClick={() => router.back()}
        >
            {content}
        </div>
    );
}
