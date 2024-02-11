"use server";

import { Task } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { currentUser } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data";
import prisma from "@/lib/prisma";
import { CreateTag, RegisterSchema, ShortCreateTaskSchema } from "@/schemas";

// AUTH
export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData);
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw e;
    }
}

export interface RegisterState {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
}

export async function register(prevState: RegisterState, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid fields.",
        };
    }

    const { email, password, name } = validatedFields.data;

    const candidate = await getUserByEmail(email);
    if (candidate) {
        return {
            errors: {
                email: ["This email already is exist."],
            },
            message: "Invalid fields.",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    revalidatePath("/register");
    redirect("/login");
}

// Tasks
export async function shortCreateTask(title: string) {
    const validatedFields = ShortCreateTaskSchema.safeParse({
        title,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid Fields.",
        };
    }

    const userData = await currentUser();

    if (!userData?.id) {
        return {
            message: "User is not auth.",
        };
    }

    try {
        await prisma.task.create({
            data: {
                title,
                userId: Number(userData.id),
            },
        });
    } catch (e) {
        return {
            message: "Database Error: Failed to Create Task.",
        };
    }

    revalidatePath("/todo");
}

export async function deleteTask(id: number) {
    try {
        await prisma.task.delete({
            where: {
                id,
            },
        });
    } catch (e) {
        console.log(e);
        return { message: "Database Error: Failed to Delete Task" };
    }

    revalidatePath("/todo");
}

export async function updateTask(data: Task) {
    if (!data || !data.id) {
        return {
            message: "Данные отсутствуют",
        };
    }

    try {
        await prisma.task.update({
            where: {
                id: data.id,
            },
            data: {
                ...data,
                ...(data.tagId
                    ? { tagId: Number(data.tagId) }
                    : { tagId: null }),
            },
        });
    } catch (e) {
        console.log(e);
        return { message: "Database Error: Не удалось обновить задачу" };
    }

    redirect("/todo");
}

export async function updateStatus(taskId: number, newStatus: boolean) {
    if (!taskId) {
        return {
            message: "Missing Task ID.",
        };
    }

    try {
        await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                status: newStatus,
            },
        });
    } catch (e) {
        console.log(e);
        return { message: "Database Error: Failed to Compleate Task" };
    }
    revalidatePath("/todo");
}

// Tag
export async function createTag(tagName: string) {
    const validatedFields = CreateTag.safeParse({
        name: tagName,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Некорректные данные.",
        };
    }

    const { name } = validatedFields.data;

    const hasTag = await prisma.tag.findFirst({
        where: {
            name: {
                contains: name,
                mode: "insensitive",
            },
        },
    });

    if (hasTag) {
        return {
            message: "Данный тег уже существует",
        };
    }

    const userData = await currentUser();

    if (!userData?.id) {
        return {
            message: "User is not auth.",
        };
    }

    try {
        await prisma.tag.create({
            data: {
                name,
                userId: Number(userData.id),
            },
        });
    } catch (e) {
        return {
            message: "Database Error: Failed to Create Task.",
        };
    }

    revalidatePath("/todo");
}

export async function deleteTag(id: number) {
    try {
        await prisma.tag.delete({
            where: {
                id,
            },
        });
    } catch (e) {
        console.log(e);
        return {
            message: "Database Error: Failed to Delete Tag.",
        };
    }
    revalidatePath("/todo");
}
