"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { Task } from "@prisma/client";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTransition } from "react";
import { ClipLoader } from "react-spinners";

import { deleteTask, updateStatus } from "@/lib/actions";

export const TaskItem = (props: { task: Task }) => {
    const { task } = props;
    const [isPending, startTransition] = useTransition();

    const handleDeleteTask = async () => {
        startTransition(async () => {
            await deleteTask(task.id);
        });
    };

    const updateStatusTask = async (status: boolean) => {
        startTransition(() => {
            updateStatus(task.id, status);
        });
    };

    return (
        <motion.div
            key={task.id}
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{
                height: "auto",
                opacity: 1,
                marginTop: "0.5rem",
                transition: {
                    type: "spring",
                    bounce: 0.3,
                    opacity: { delay: 0.1 },
                },
            }}
            exit={{
                opacity: 0,
                height: 0,
                marginTop: 0,
                x: "100%",
                transition: {
                    type: "keyframes",
                },
            }}
            transition={{
                duration: 0.6,
                type: "spring",
                bounce: 0,
                opacity: { duration: 0.12 },
            }}
            className="rounded border-b-2 bg-gray-100  dark:border-neutral-600 dark:bg-zinc-800"
        >
            <div className="flex justify-between p-2">
                <div className="flex items-center">
                    <div>
                        <input
                            type="checkbox"
                            checked={task.status}
                            onChange={(e) => updateStatusTask(e.target.checked)}
                        />
                    </div>
                    <div>
                        <Link
                            prefetch={false}
                            href={`/todo/${task.id}`}
                            scroll={false}
                        >
                            <h1
                                className={clsx("text-lg font-bold", {
                                    "line-through": task.status,
                                })}
                            >
                                {task.title}
                            </h1>
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
        </motion.div>
    );
};
