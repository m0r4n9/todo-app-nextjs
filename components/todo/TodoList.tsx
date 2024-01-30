import CreateTask from "@/components/todo/short-create-form";
import { TaskItem } from "@/components/todo/TaskItem";
import { fetchTodoList } from "@/lib/data";

export default async function TodoList() {
    const todoList = await fetchTodoList();

    return (
        <div className="mt-3">
            <CreateTask />
            <div className="mt-3 flex flex-col gap-3">
                {todoList?.map((item) => (
                    <TaskItem key={item.id} task={item} />
                ))}
            </div>
        </div>
    );
}
