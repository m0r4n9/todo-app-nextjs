import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div>
            <select
                className="mt-2 bg-transparent"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
            >
                <option value="system">Системная</option>
                <option value="dark">Темная</option>
                <option value="light">Светлая</option>
            </select>
        </div>
    );
}
