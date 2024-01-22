import { fetchTodoList } from "@/app/lib/data";

export default async function TodoList() {
    const todoList = await fetchTodoList();

    if (!todoList || !todoList.length) {
        return <p>Список пуст!</p>;
    }

    return (
        <div>
            <h2>Todo List</h2>
            <div>
                {todoList?.map((item) => (
                    <p key={item.id}>{item.title}</p>
                ))}
            </div>
        </div>
    );
}
