"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { useTheme } from "@/hooks/useTheme";

export function ThemeSwitch() {
    const { theme, switchTheme } = useTheme();

    const onToggleHandler = () => {
        switchTheme(theme);
    };

    return (
        <button onClick={onToggleHandler}>
            {theme === "light" ? (
                <SunIcon className="w-[24px] text-black" />
            ) : (
                <MoonIcon className="w-[24px] text-white" />
            )}
        </button>
    );
}
