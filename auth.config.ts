import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            // We can use array for many protected routes
            const isOnDashboard =
                nextUrl.pathname.startsWith("/dashboard") ||
                nextUrl.pathname.startsWith("/todo") ||
                nextUrl.pathname.startsWith("/settings");
            if (isOnDashboard) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            // Don't redirect if on an unprotected page, or if logged in and is on a protected page
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
