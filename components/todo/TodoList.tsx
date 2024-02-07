import CreateTask from "@/components/todo/short-create-form";
import { fetchTags, fetchTodoList } from "@/lib/data";

import { ListTasks } from "./ListTasks";
import { TabsTask } from "./tabs-tasks";
import { TagsActions } from "./TagsActions";

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
                <div className="flex items-center justify-between">
                    <TabsTask />
                    <TagsActions tags={tags} />
                </div>

                <CreateTask />
            </div>

            <ListTasks tasks={tasks} />
        </div>
    );
}
