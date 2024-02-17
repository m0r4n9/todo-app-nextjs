import { Metadata } from "next";
import Link from "next/link";

import { fetchTasksCount, fetchTodoList } from "@/lib/data";

export const metadata: Metadata = {
    title: "Home",
};

export default async function Page() {
    const taskCounterInfo = await fetchTasksCount();

    return (
        <div className="dark:text-white">
            <div>
                <h1 className="text-3xl font-semibold dark:text-white">
                    Главная
                </h1>
            </div>

            <div className="mt-3 flex gap-4 text-lg dark:text-white">
                <Link
                    href="/todo"
                    className="flex-1 cursor-pointer rounded px-8 py-4 dark:bg-zinc-800"
                >
                    Все задачи: {taskCounterInfo?.allTasks}
                </Link>

                <Link
                    href="/todo?op=completed"
                    className="flex-1 cursor-pointer rounded px-8 py-4 dark:bg-zinc-800"
                >
                    Выполненых задач: {taskCounterInfo?.countCompletedTask}
                </Link>

                <Link
                    href="/todo"
                    className="flex-1 cursor-pointer rounded px-8 py-4 dark:bg-zinc-800"
                >
                    Активных задач: {taskCounterInfo?.activeTasks}
                </Link>
            </div>
        </div>
    );
}
