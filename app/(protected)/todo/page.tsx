import { Metadata } from "next";
import { Suspense } from "react";

import { TaskSkeleton } from "@/components/skeletons";
import TodoList from "@/components/todo/TodoList";

export const metadata: Metadata = {
    title: "List",
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        op: string;
        tag: string;
    };
}) {
    const option = searchParams?.op || "";
    const tag = searchParams?.tag || "";

    return (
        <main className="dark:text-white">
            <div className="hidden md:block">
                <h1 className="text-4xl font-bold">Список задач</h1>
            </div>
            <div>
                <Suspense fallback={<TaskSkeleton />}>
                    <TodoList option={option} tag={tag} />
                </Suspense>
            </div>
        </main>
    );
}
