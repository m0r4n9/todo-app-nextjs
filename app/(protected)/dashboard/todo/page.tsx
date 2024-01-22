import TodoList from "@/app/ui/dashboard/TodoList";
import { Metadata } from "next";
import { Suspense } from "react";
import { TaskSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
    title: "List",
};

export default function Page() {
    return (
        <main>
            <div>
                <h1 className="text-4xl font-bold">List Tasks</h1>
            </div>
            <div>
                <Suspense fallback={<TaskSkeleton/>}>
                    <TodoList />
                </Suspense>
            </div>
        </main>
    );
}
