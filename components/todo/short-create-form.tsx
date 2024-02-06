"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";

import { shortCreateTask } from "@/lib/actions";

export default function CreateTask() {
    const [title, setTitle] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleCreateTask = useCallback(async () => {
        startTransition(async () => {
            shortCreateTask(title).then(() => {
                setTitle("");
            });
        });
    }, [title]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleCreateTask();
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [handleCreateTask]);

    return (
        <div className="rounded bg-gray-100 dark:bg-neutral-600">
            <div className="relative flex items-center rounded">
                {isPending ? (
                    <BeatLoader size={9} className="text-white" />
                ) : (
                    <CreateButton
                        pending={isPending}
                        onSubmit={handleCreateTask}
                    />
                )}

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Добавить новую задачу"
                    className="grow rounded-r-lg bg-inherit p-2 placeholder:text-black focus:outline-none  dark:text-white dark:placeholder:text-gray-300"
                    disabled={isPending}
                />
            </div>
        </div>
    );
}

const CreateButton = ({
    pending,
    onSubmit,
}: {
    pending: boolean;
    onSubmit: () => void;
}) => {
    return (
        <button
            onClick={onSubmit}
            className="flex cursor-pointer rounded-l-lg bg-inherit p-2 "
            aria-disabled={pending}
        >
            <PlusIcon className="h-[24px] w-[24px] transition duration-300 hover:rotate-90 dark:text-white" />
        </button>
    );
};
