import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { auth } from "@/auth";
import { Providers } from "@/components/componentsS/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s | TODO App",
        default: "TODO App",
    },
    description: "App For Productivity",
};

export default async function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="ru" dir="ltr">
            <body className={`${inter.className} bg-zinc-900 antialiased`}>
                <Providers session={session}>
                    {children}
                    <div id="modal">{modal}</div>
                </Providers>
            </body>
        </html>
    );
}
