"use client";

import { shortCreateTask } from "@/app/lib/actions";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState, useTransition } from "react";
import clsx from "clsx";
import { BeatLoader } from "react-spinners";

const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

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
            <div className="relative flex items-center rounded border-2">
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
                    // name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add New Task"
                    className="grow p-2 focus:outline-none"
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
            className="flex p-2 "
            aria-disabled={pending}
        >
            <PlusIcon className="h-[24px] w-[24px] transition duration-300 hover:rotate-90" />
        </button>
    );
};
