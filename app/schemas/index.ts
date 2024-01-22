import {z} from "zod";


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required.",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required.",
    }),
    name: z.string().min(4, {
        message: "Name 4 characters required.",
    }),
});

export const CreateTaskSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required."
    }),
    desc: z.string().optional(),
    deadline: z.coerce.date()
});

export const ShortCreateTaskSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required."
    })
});