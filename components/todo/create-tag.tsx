"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useTransition } from "react";

import { useShowToast } from "@/hooks/useShowToast";
import { createTag } from "@/lib/actions";

interface CreateTagProps {
    open: boolean;
    toggleOpen: () => void;
    onClose?: () => void;
}

export const CreateTag = (props: CreateTagProps) => {
    const { open, toggleOpen, onClose } = props;
    const [tagName, setTagName] = useState("");
    const [isPending, startTransition] = useTransition();
    const { showToast } = useShowToast();

    const handleAddTag = () => {
        startTransition(() => {
            createTag(tagName).then((res) => {
                if (!res) {
                    showToast({
                        title: `Метка "${tagName}" успешно создалась`,
                        type: "success",
                        timeout: 3500,
                    });
                    setTagName("");
                    toggleOpen();
                } else {
                    let message = null;
                    if (res.message) message = res.message;
                    showToast({
                        title: `Произошла ошибка, повторите попытку`,
                        message: message || "",
                        type: "error",
                        timeout: 3500,
                    });
                }
            });
        });
    };

    return (
        <div className="flex">
            <button onClick={toggleOpen} className="mr-2">
                {open ? "Скрыть" : "Добавить"}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            width: 0,
                        }}
                        animate={{
                            opacity: 1,
                            width: "auto",
                            transition: {
                                opacity: {
                                    delay: 0.15,
                                },
                            },
                        }}
                        exit={{
                            width: 0,
                            opacity: 0,
                            transition: {
                                width: {
                                    delay: 0.05,
                                },
                                opacity: {
                                    duration: 0.2,
                                },
                            },
                        }}
                        className="flex gap-2"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                id="tagName"
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                                className="peer block w-full appearance-none rounded p-1 text-sm focus:border-blue-600 focus:outline-none focus:ring-0  dark:text-white dark:focus:border-blue-500"
                                placeholder=" "
                            />
                            <label
                                htmlFor="tagName"
                                className="absolute top-1 z-10 origin-[0] -translate-y-4 scale-75 transform px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2  peer-focus:text-white rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                            >
                                Название тега
                            </label>
                        </div>

                        <button
                            aria-disabled={isPending}
                            onClick={handleAddTag}
                            className="rounded px-2 text-sm transition duration-300 hover:bg-zinc-800"
                        >
                            Добавить
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
