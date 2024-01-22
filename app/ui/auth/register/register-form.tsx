"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
    AtSymbolIcon,
    IdentificationIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { register } from "@/app/lib/actions";
import Link from "next/link";

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
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`mb-3 text-2xl`}>
                    Please register to continue.
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-black focus:outline-none"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                required
                            />
                            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-black focus:outline-none"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-black focus:outline-none"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                    Have account?
                    <Link href="/login" className="text-blue-400">
                        Sign Up
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
            Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}