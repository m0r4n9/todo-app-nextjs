import { EditForm } from "@/components/todo/edit-form";
import { fetchTags, getTaskById } from "@/lib/data";

export default async function Page({
    params: { id },
}: {
    params: { id: string };
}) {
    const taskData = await getTaskById(id);
    const tags = await fetchTags();

    if (!taskData) {
        return (
            <div className="flex items-center justify-center">
                <h1 className="text-red-500">
                    Не удалось получить данные о задаче
                </h1>
            </div>
        );
    }

    return (
        <main>
            <EditForm task={taskData} tags={tags} />
        </main>
    );
}
