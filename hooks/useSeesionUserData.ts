"use client";

import { useSession } from "next-auth/react";

export function useSessionUserData() {
    const { data: session } = useSession();
    const user = session?.user;

    return { user };
}
