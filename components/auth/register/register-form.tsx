"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
    AtSymbolIcon,
    IdentificationIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { register } from "@/lib/actions";

export default function RegisterForm() {
    const [errorMessage, dispatch] = useFormState(register, {
        errors: {
            name: undefined,
            email: undefined,
            password: undefined,
        },
        message: "",
    });

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-100 px-6 pb-4 pt-8 dark:bg-zinc-800 dark:text-white">
                <h1 className={`mb-3 text-2xl`}>Регистрация</h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="name"
                        >
                            Имя
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md py-[9px] pl-10 text-sm outline-2 dark:bg-neutral-600 dark:placeholder:text-gray-300"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Введите имя пользователя"
                                required
                            />
                            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 dark:text-white " />
                        </div>
                        <div>
                            {errorMessage?.errors.name &&
                                errorMessage.errors.name.map(
                                    (error: string) => (
                                        <p
                                            key={error}
                                            className="mt-2 text-sm text-red-500"
                                        >
                                            {error}
                                        </p>
                                    )
                                )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md py-[9px] pl-10 text-sm outline-2 dark:bg-neutral-600 dark:placeholder:text-gray-300"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Введите электронную почту"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 dark:text-white" />
                        </div>
                        <div>
                            {errorMessage?.errors.email &&
                                errorMessage.errors.email.map(
                                    (error: string) => (
                                        <p
                                            key={error}
                                            className="mt-2 text-sm text-red-500"
                                        >
                                            {error}
                                        </p>
                                    )
                                )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="password"
                        >
                            Пароль
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md py-[9px] pl-10 text-sm outline-2 dark:bg-neutral-600 dark:placeholder:text-gray-300"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Введите пароль"
                                required
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 dark:text-white" />
                        </div>
                        <div>
                            {errorMessage?.errors.password &&
                                errorMessage.errors.password.map(
                                    (error: string) => (
                                        <p
                                            key={error}
                                            className="mt-2 text-sm text-red-500"
                                        >
                                            {error}
                                        </p>
                                    )
                                )}
                        </div>
                    </div>
                </div>
                <RegisterButton />
                <div className="mt-2 text-gray-400">
                    Есть аккаунт?
                    <Link href="/login" className="text-blue-400">
                        {" "}
                        Войти
                    </Link>
                </div>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {/*{errorMessage && (*/}
                    {/*    <>*/}
                    {/*        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />*/}
                    {/*        <p className="text-sm text-red-500">*/}
                    {/*            {errorMessage}*/}
                    {/*        </p>*/}
                    {/*    </>*/}
                    {/*)}*/}
                </div>
            </div>
        </form>
    );
}

function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="mt-4 w-full" aria-disabled={pending}>
            Создать аккаунт
            <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}
