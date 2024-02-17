import { unstable_noStore as noStore } from "next/cache";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function fetchTodoList(option?: string, tagName?: string) {
    noStore();

    try {
        const userData = await currentUser();

        if (!userData || !userData.id) {
            throw new Error("User is not auth.");
        }
        const user = await prisma.user.findUnique({
            where: { id: userData.id },
        });

        if (!user?.id) {
            throw new Error("Database Failed: cannot get user data by email.");
        }

        if (option === "" || !option) {
            return await prisma.task.findMany({
                where: {
                    userId: userData.id,
                    ...(tagName
                        ? {
                              tag: {
                                  name: tagName,
                              },
                          }
                        : {}),
                },
                orderBy: [{ status: "asc" }, { id: "desc" }],
            });
        }

        let optionCondition = null;
        if (option !== "completed" && option !== "active") {
            optionCondition =
                option === "deadline"
                    ? { NOT: { deadline: null } }
                    : {
                          AND: {
                              deadline: null,
                          },
                      };
        } else {
            optionCondition =
                option === "active"
                    ? {
                          status: false,
                      }
                    : { status: true };
        }

        return await prisma.task.findMany({
            where: {
                userId: userData.id,
                ...optionCondition,
                ...(tagName
                    ? {
                          tag: {
                              name: tagName,
                          },
                      }
                    : {}),
            },
            orderBy: [{ status: "asc" }, { deadline: "asc" }, { id: "desc" }],
        });
    } catch (err) {
        console.log("Database error:", err);
    }
}

export async function fetchTasksCount() {
    try {
        const userData = await currentUser();

        if (!userData?.id) {
            return {
                message: "Пользователь не авторизован.",
            };
        }
        const userId = userData.id;

        const countCompletedTask = await prisma.task.count({
            where: {
                userId,
                status: true,
            },
        });

        const activeTasks = await prisma.task.count({
            where: {
                userId,
                status: false,
            },
        });

        const allTasks = await prisma.task.count({
            where: {
                userId,
            },
        });

        return {
            allTasks,
            activeTasks,
            countCompletedTask,
        };
    } catch (e) {
        console.log("Database Error:", e);
    }
}

export async function fetchTags() {
    noStore();

    try {
        const userData = await currentUser();

        if (!userData || !userData.id) {
            throw new Error("User is not auth.");
        }
        const user = await prisma.user.findUnique({
            where: { id: userData.id },
        });

        if (!user?.id) {
            throw new Error("Database Failed: cannot get user data by email.");
        }

        return await prisma.tag.findMany({
            where: {
                userId: user.id,
            },
        });
    } catch (e) {
        console.log(e);
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

export async function getUserDataById(userId: string) {
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
