import { useContext } from "react";

import { Theme, ThemeContext } from "@/app/contexts/ThemeContext";

interface UseThemeResult {
    theme: Theme;
    switchTheme: (theme: Theme) => void;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const switchTheme = (theme: Theme) => {
        let newTheme: Theme;
        switch (theme) {
            case "dark":
                newTheme = "light";
                break;
            case "light":
                newTheme = "dark";
                break;
            default:
                newTheme = "dark";
                break;
        }
        setTheme?.(newTheme);
    };

    return {
        theme: theme || "dark",
        switchTheme,
    };
}
