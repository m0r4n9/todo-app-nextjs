import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import prisma from "@/lib/prisma";

import { authConfig } from "./auth.config";

type User = {
    id: number;
    name: string;
    password: string;
    email: string;
};

declare module "next-auth" {
    interface Session {
        user: { id: string; name: string };
    }
}

async function getUser(email: string): Promise<User | null> {
    try {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        // @ts-ignore
        session({ session, token }) {
            return {
                user: {
                    id: token.sub,
                    name: token.name,
                },
                expires: session.expires,
            };
        },
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordMatch)
                        return {
                            name: user.name,
                            id: user.id,
                        } as any;
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
