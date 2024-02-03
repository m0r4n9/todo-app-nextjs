"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import ThemeContextProviders from "@/app/contexts/ThemeContext";

export function Providers({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    return (
        <ThemeContextProviders>
            <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeContextProviders>
    );
}
