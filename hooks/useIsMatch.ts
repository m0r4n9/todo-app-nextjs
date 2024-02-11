"use client";

import { useEffect, useState } from "react";

export function useIsMatch() {
    const [isMatch, setIsMatch] = useState(false);

    const checkMediaQuery = () => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        setIsMatch(mediaQuery.matches);
    };

    useEffect(() => {
        checkMediaQuery();

        const resizeHandler = () => {
            checkMediaQuery();
        };

        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return {
        isMatch,
    };
}
