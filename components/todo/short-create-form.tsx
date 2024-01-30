"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";

import { shortCreateTask } from "@/lib/actions";

export default function CreateTask() {
    const [title, setTitle] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleCreateTask = async () => {
        startTransition(async () => {
            shortCreateTask(title).then(() => {
                setTitle("");
            });
        });
    };

    return (
        <div>
            <div className="relative flex items-center rounded">
                {isPending ? (
                    <BeatLoader size={9} color="#000" />
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
                    className="grow rounded-r-lg bg-neutral-600 p-2 text-white placeholder:text-gray-300 focus:outline-none"
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
            className="flex rounded-l-lg bg-neutral-600 p-2"
            aria-disabled={pending}
        >
            <PlusIcon className="h-[24px] w-[24px] text-white transition duration-300 hover:rotate-90" />
        </button>
    );
};
