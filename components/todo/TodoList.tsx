import CreateTask from "@/components/todo/short-create-form";
import { fetchTodoList } from "@/lib/data";

import { ListTasks } from "./ListTasks";
import { TabsTask } from "./tabs-tasks";

export default async function TodoList({ option }: { option?: string }) {
    const tasks = await fetchTodoList(option);

    return (
        <div className="mt-3">
            <div>
                <TabsTask />
                <CreateTask />
            </div>

            <ListTasks tasks={tasks} />
        </div>
    );
}
