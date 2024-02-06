"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastContextProvider } from "@/components/providers/ToastProvider";

export function Providers({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastContextProvider>
                <SessionProvider session={session}>{children}</SessionProvider>
            </ToastContextProvider>
        </ThemeProvider>
    );
}
