"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
    AtSymbolIcon,
    ExclamationCircleIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/button";
import { authenticate } from "@/lib/actions";

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-zinc-800 px-6 pb-4 pt-8 text-white">
                <h1 className={`mb-3 text-2xl font-bold`}>Авторизация</h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md bg-neutral-600 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-300 focus:border-black focus:outline-none"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Введите электронную почту"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="password"
                        >
                            Пароль
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md bg-neutral-600 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-300 focus:border-black focus:outline-none"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Введите пароль"
                                required
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white" />
                        </div>
                    </div>
                </div>
                <LoginButton />
                <div className="mt-2 text-gray-400">
                    Нет аккаунта?
                    <Link
                        href="/register"
                        className="cursor-pointer text-blue-400"
                    >
                        {" "}
                        Регистрация
                    </Link>
                </div>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">
                                {errorMessage}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full cursor-pointer" aria-disabled={pending}>
            Войти <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}
