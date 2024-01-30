"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { Task } from "@prisma/client";
import Link from "next/link";
import { useTransition } from "react";
import { ClipLoader } from "react-spinners";

import { deleteTask } from "@/lib/actions";

export const TaskItem = (props: { task: Task }) => {
    const { task } = props;
    const [isPending, startTransition] = useTransition();

    const handleDeleteTask = async () => {
        startTransition(() => {
            deleteTask(task.id);
        });
    };

    return (
        <div className="flex justify-between rounded border-b-2 border-neutral-600 bg-zinc-800 p-2 first:mt-0">
            <div className="mt-1 flex items-center gap-2">
                <div>
                    <input
                        type="checkbox"
                        checked={task.status}
                        onChange={(e) => console.log(e.target.value)}
                    />
                </div>
                <div>
                    <Link
                        prefetch={false}
                        href={`/todo/${task.id}`}
                        scroll={false}
                    >
                        <h1 className="text-lg font-bold">{task.title}</h1>
                        <div className="text-gray-500">
                            {task.desc ? task.desc : "Описание..."}
                        </div>
                    </Link>
                </div>
            </div>

            <button onClick={handleDeleteTask}>
                {isPending ? (
                    <ClipLoader size={22} color="white" />
                ) : (
                    <TrashIcon className="h-[24px] w-[24px] cursor-pointer text-neutral-600" />
                )}
            </button>
        </div>
    );
};
