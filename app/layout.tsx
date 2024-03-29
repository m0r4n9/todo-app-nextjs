import "./globals.css";

import type { Metadata } from "next";

import { auth } from "@/auth";
import { Providers } from "@/components/Providers";

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
        <html suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                />
            </head>
            <body>
                <Providers session={session}>
                    {children}
                    <div>{modal}</div>
                </Providers>
            </body>
        </html>
    );
}
