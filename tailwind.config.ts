import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                "text-muted-foreground": "var(--primary-foreground)",
            },
            zIndex: {
                "-1": "-1",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        keyframes: {
            shimmer: {
                "100%": {
                    transform: "translateX(100%)",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
