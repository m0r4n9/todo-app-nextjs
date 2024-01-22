import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {currentUser} from "@/app/lib/auth";

export async function fetchTodoList() {
    noStore();

    try {
        const userData = await currentUser();

        if (!userData || !userData.id) {
            throw new Error("User is not auth.");
        }
        const user = await prisma.user.findUnique({
            where: { id: Number(userData.id) }
        });

        if (!user?.id) {
            throw new Error("Database Failed: cannot get user data by email.");
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await prisma.task.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                id: 'desc'
            }
        });
    } catch (err) {
        console.log("Database error:", err);
    }
}

export async function getUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({ where: { email } });
    } catch {
        return null;
    }
}
