import { Metadata } from "next";
import { Suspense } from "react";

import { TaskSkeleton } from "@/components/skeletons";
import TodoList from "@/components/todo/TodoList";

export const metadata: Metadata = {
    title: "List",
};

export default function Page() {
    return (
        <main className="dark:text-white">
            <div>
                <h1 className="text-4xl font-bold">Список задач</h1>
            </div>
            <div>
                <Suspense fallback={<TaskSkeleton />}>
                    <TodoList />
                </Suspense>
            </div>
        </main>
    );
}
