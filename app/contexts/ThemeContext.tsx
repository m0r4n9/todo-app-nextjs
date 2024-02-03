"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";

const LOCAL_STORAGE_THEME_KEY = "theme";

interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export default function ThemeContextProviders({
    children,
}: {
    children: ReactNode;
}) {
    const [theme, setTheme] = useState<Theme>("dark");

    const setDarkTheme = () => {
        document.documentElement.classList.add("dark");
        //document.documentElement.style.colorScheme = "dark";
    };

    const setLightTheme = () => {
        document.documentElement.classList.remove("dark");
        //document.documentElement.style.colorScheme = "light";
    };

    // auto swtich theme when user change mode on device
    const handleThemeChange = (theme: Theme) => {
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
        setTheme(theme);

        switch (theme) {
            case "light":
                setLightTheme();
                break;
            case "dark":
                setDarkTheme();
                break;
            case "system":
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? setDarkTheme()
                    : setLightTheme();
                break;
        }
    };

    useEffect(() => {
        const themeLocal = localStorage.getItem(
            LOCAL_STORAGE_THEME_KEY
        ) as Theme;

        handleThemeChange(themeLocal);
    });

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
}
