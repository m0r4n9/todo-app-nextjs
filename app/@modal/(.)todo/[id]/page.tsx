import { Modal } from "@/components/Modal";
import { EditForm } from "@/components/todo/edit-form";
import { getTaskById } from "@/lib/data";

export default async function ModalEditTask({
    params: { id },
}: {
    params: { id: string };
}) {
    const taskData = await getTaskById(id);

    if (!taskData) {
        return (
            <Modal>
                <div className="flex items-center justify-center">
                    <h1 className="text-red-500">
                        Не удалось получить данные о задаче
                    </h1>
                </div>
            </Modal>
        );
    }

    return (
        <Modal>
            <EditForm task={taskData} />
        </Modal>
    );
}
