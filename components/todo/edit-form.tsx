"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    DateValue,
    getLocalTimeZone,
    parseAbsoluteToLocal,
    toCalendarDate,
    today,
} from "@internationalized/date";
import type { Tag, Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { DatePicker } from "@/components/ui/DatePicker";
import { useShowToast } from "@/hooks/useShowToast";
import { updateTask } from "@/lib/actions";

import { Button } from "../ui/Button";

export const EditForm = (props: { task: Task; tags?: Tag[] }) => {
    const { task, tags } = props;
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState<Task>({ ...task });
    const router = useRouter();
    const { showToast } = useShowToast();

    const onChaneData = (key: keyof Task, value: string) => {
        setFormData((prevState) => ({ ...prevState, [key]: value }));
    };

    const updateDeadline = (value: DateValue) => {
        let dateDeadline = value.toDate(getLocalTimeZone());
        setFormData((prevState) => ({ ...prevState, deadline: dateDeadline }));
    };

    const resetChange = () => {
        setFormData(() => ({ ...task }));
    };

    const handleUpdateTask = () => {
        startTransition(() => {
            updateTask(formData);
            showToast({
                title: "Задача успешно обновлена",
                type: "success",
                timeout: 3500,
            });
        });
    };

    return (
        <div className="relative w-[80vw] rounded bg-gray-100 p-3 text-black dark:bg-zinc-800 dark:text-white md:w-[40vw]">
            <div className="absolute right-1 top-1">
                <Button size="icon" onClick={() => router.back()}>
                    <XMarkIcon />
                </Button>
            </div>
            <div className="pt-2">
                <label htmlFor="title">Задача: </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => onChaneData("title", e.target.value)}
                    placeholder="Введите название задачи"
                    className="ml-2 rounded bg-gray-300 px-2 py-1 dark:bg-neutral-600"
                />
            </div>

            <div className="mt-4 flex flex-col">
                <label htmlFor="desc" className="mb-2 block font-medium">
                    Описание
                </label>
                <textarea
                    id="desc"
                    name="desc"
                    placeholder="Напишите описание задачи."
                    value={formData.desc ?? ""}
                    onChange={(e) => onChaneData("desc", e.target.value)}
                    className="black:bg-neutral-600 block h-40 w-full resize-none rounded-lg bg-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-600"
                />
            </div>

            <div>
                <select
                    id="tag_task"
                    defaultValue={task.tagId || ""}
                    onChange={(e) => onChaneData("tagId", e.target.value)}
                >
                    <option></option>
                    {tags?.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                            {tag.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {!formData.deadline && <p>Вы не указали deadline</p>}
                <DatePicker
                    label="deadline"
                    minValue={today(getLocalTimeZone())}
                    value={
                        formData.deadline
                            ? toCalendarDate(
                                  parseAbsoluteToLocal(
                                      formData.deadline.toISOString()
                                  )
                              )
                            : today(getLocalTimeZone())
                    }
                    onChange={updateDeadline}
                />
            </div>

            <div className="mt-2 flex justify-end gap-2">
                <button
                    disabled={isPending}
                    onClick={handleUpdateTask}
                    className="h-10 rounded-lg px-4 text-sm  transition duration-150 hover:bg-zinc-900 hover:text-white"
                >
                    Сохранить
                </button>
                <button
                    onClick={resetChange}
                    className="h-10 rounded-lg px-4 text-sm  transition duration-150 hover:bg-red-500"
                >
                    Отменить
                </button>
            </div>
        </div>
    );
};
