import { unstable_noStore as noStore } from "next/cache";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function fetchTodoList(deadline?: string) {
    noStore();

    try {
        const userData = await currentUser();

        if (!userData || !userData.id) {
            throw new Error("User is not auth.");
        }
        const user = await prisma.user.findUnique({
            where: { id: Number(userData.id) },
        });

        if (!user?.id) {
            throw new Error("Database Failed: cannot get user data by email.");
        }

        if (deadline === "all") {
            return await prisma.task.findMany({
                where: {
                    userId: Number(userData.id),
                },
                orderBy: [{ status: "asc" }, { id: "desc" }],
            });
        }

        const deadlineCondition =
            deadline === "deadline"
                ? { NOT: { deadline: null } }
                : {
                      AND: {
                          deadline: null,
                      },
                  };

        return await prisma.task.findMany({
            where: {
                userId: Number(userData.id),
                ...deadlineCondition,
            },
            orderBy: [{ status: "asc" }, { id: "desc" }],
        });
    } catch (err) {
        console.log("Database error:", err);
    }
}

export async function getTaskById(id: string) {
    noStore();

    try {
        if (!id) {
            throw new Error("Id is not inited.");
        }

        return await prisma.task.findUnique({
            where: {
                id: Number(id),
            },
        });
    } catch (e) {
        console.log(e);
        throw new Error("Test");
    }
}

export async function getUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({ where: { email } });
    } catch {
        return null;
    }
}

export async function getUserDataById(userId: number) {
    try {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch user.");
    }
}
