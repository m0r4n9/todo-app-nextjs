import { fetchTodoList } from "@/app/lib/data";
import CreateTask from "@/app/ui/todo/short-create-form";
import { TaskItem } from "@/app/ui/todo/TaskItem";

export default async function TodoList() {
    const todoList = await fetchTodoList();

    return (
        <div className="mt-3">
            <CreateTask />
            <div className="mt-3 flex flex-col gap-3">
                {todoList?.map((item) => (
                    <TaskItem key={item.id} id={item.id} title={item.title} />
                ))}
            </div>
        </div>
    );
}
