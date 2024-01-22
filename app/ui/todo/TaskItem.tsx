"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import {deleteTask} from "@/app/lib/actions";

interface TaskItemFields {
    id: number;
    title: string
}

export const TaskItem = (item: TaskItemFields) => {

    const handleDeleteTask = async () => {
        await deleteTask(item.id)
    }

    return (
        <div className="flex">
            <button onClick={handleDeleteTask}>
                <TrashIcon className="w-[24px] h-[24px] cursor-pointer"/>
            </button>
            <p>{item.title}</p>
        </div>
    )
}