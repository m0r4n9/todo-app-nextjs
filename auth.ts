import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { prisma } from "@/lib/prisma";


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
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    callbacks: {
        ...authConfig,
        // @ts-ignore
        async session({ session, token }) {
            console.log(token);
            return {
                user: {
                    id: token.sub,
                },
                expires: session.expires,
            };
        },
    },
    providers: [
        Credentials({
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

                    return user as any;
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
