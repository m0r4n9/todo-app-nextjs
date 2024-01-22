"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/app/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required.",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required..",
    }),
    name: z.string().min(1, {
        message: "Name is required.",
    }),
});

export interface RegisterState {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};


export async function register(prevState: RegisterState, formData: FormData) {
    console.log("Register!");
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
            errors: {},
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

    revalidatePath("/dashboard/login");
    redirect("/dashboard/login");
}
