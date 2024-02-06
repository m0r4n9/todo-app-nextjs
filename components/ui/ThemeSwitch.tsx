"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const optionTheme = [
    {
        title: "Автоматически",
        theme: "system",
        img_path: "/auto-theme.png",
        img_alt: "Auto Theme",
    },
    {
        title: "Темное",
        theme: "dark",
        img_path: "/dark-theme.png",
        img_alt: "Dark Theme",
    },
    {
        title: "Светлое",
        theme: "light",
        img_path: "/light-theme.png",
        img_alt: "Light Theme",
    },
];

export function ThemeSwitch() {
    const { setTheme, theme: ThemeCurrent } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h2 className="text-xl font-semibold">Выберите тему</h2>
            </div>
            <div className="flex gap-4">
                {optionTheme.map(({ title, theme, img_path, img_alt }) => (
                    <button
                        key={theme}
                        className={clsx("rounded p-2", {
                            "shadow-[0_0_1px_1px_rgba(0,0,0)] dark:shadow-[0_0_1px_1px_rgba(255,255,255)]":
                                theme === ThemeCurrent,
                        })}
                        onClick={() => setTheme(theme)}
                    >
                        <div>
                            <Image
                                width={100}
                                height={100}
                                src={img_path}
                                alt={img_alt}
                            />
                            {title}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
