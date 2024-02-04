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
import {
    CreateTaskSchema,
    RegisterSchema,
    ShortCreateTaskSchema,
} from "@/schemas";

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

// what for we use prevState?
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

export interface CreateTaskState {
    errors?: {
        title?: string[];
        desc?: string[];
        deadline?: string[];
    };
    message?: string | null;
}

export async function createTask(
    prevState: CreateTaskState,
    formData: FormData
) {
    const validatedFields = CreateTaskSchema.safeParse({
        title: formData.get("title"),
        desc: formData.get("desc"),
        deadline: formData.get("deadline"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid fields.",
        };
    }

    const { title, desc, deadline } = validatedFields.data;
    const userData = await currentUser();

    if (!userData?.id) {
        return {
            message: "User is not auth.",
        };
    }

    const numUserId = Number(userData.id);

    try {
        await prisma.task.create({
            data: {
                title,
                desc,
                deadline,
                userId: numUserId,
            },
        });
    } catch (e) {
        console.log(e);
        return {
            message: "Database Error: Failed to Create Task",
        };
    }

    revalidatePath("/todo");
    redirect("/todo");
}

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

    // const { title } = validatedFields.data;
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
            message: "Missing data",
        };
    }

    try {
        await prisma.task.update({
            where: {
                id: data.id,
            },
            data,
        });
    } catch (e) {
        console.log(e);
        return { message: "Database Errro: Failed to Update Task" };
    }
    redirect(`/todo`);
}
