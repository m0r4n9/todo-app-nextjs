import CreateTask from "@/components/todo/short-create-form";
import { fetchTags, fetchTodoList } from "@/lib/data";

import { HeaderTaskList } from "./HeaderTaskList";
import { ListTasks } from "./ListTasks";

export default async function TodoList({
    option,
    tag,
}: {
    option?: string;
    tag: string;
}) {
    const tasks = await fetchTodoList(option, tag);
    const tags = await fetchTags();

    return (
        <div className="mt-3">
            <div>
                <HeaderTaskList tags={tags} />
                <CreateTask />
            </div>

            <ListTasks tasks={tasks} />
        </div>
    );
}
