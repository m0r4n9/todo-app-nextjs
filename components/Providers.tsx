"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/contexts/ThemeContext";

import { ToastContextProvider } from "./contexts/ToastContext";

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
