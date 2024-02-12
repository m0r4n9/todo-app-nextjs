"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export const Modal = ({ children }: { children: React.ReactNode }) => {
    const overlay = useRef(null);
    const wrapper = useRef(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick: React.MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [onKeyDown]);

    return (
        <div
            ref={overlay}
            className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/60"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="absolute
                left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-gray-100 p-6 dark:bg-zinc-800"
            >
                {children}
            </div>
        </div>
    );
};
