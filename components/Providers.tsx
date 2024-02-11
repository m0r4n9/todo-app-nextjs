"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export function Providers({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider session={session}>
                {children}
                <Toaster />
            </SessionProvider>
        </ThemeProvider>
    );
}
