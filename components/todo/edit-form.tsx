"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Tag, Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { updateTask } from "@/lib/actions";

import { Button } from "../ui/Button";
import { DatePicker } from "../ui/DataPicker";

export const EditForm = (props: { task: Task; tags?: Tag[] }) => {
    const { task, tags } = props;
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState<Task>({ ...task });
    const router = useRouter();

    const [date, setDate] = useState<Date | undefined>(
        task?.deadline ?? undefined
    );

    const onChangeDate = (newDate?: Date) => {
        setDate(newDate);
        if (newDate) formData.deadline = newDate;
    };

    const onChaneData = (key: keyof Task, value: string) => {
        setFormData((prevState) => ({ ...prevState, [key]: value }));
    };

    const resetChange = () => {
        setFormData(() => ({ ...task }));
    };

    const handleUpdateTask = () => {
        startTransition(async () => {
            const response = await updateTask(formData);

            if (!response) {
                toast.success("Успешно!", {
                    //unstyled: true,
                    //classNames: {
                    //    toast: "p-2 bg-black text-white w-fill",
                    //    title: "text-2xl",
                    //},
                    duration: 3000,
                    description: "Данные обновлены.",
                });
            } else {
                toast.error("Ошибка при обновлении.");
            }
        });
    };

    return (
        <div className="relative w-screen rounded bg-gray-100 p-3 text-black dark:bg-zinc-800 dark:text-white md:w-[40vw]">
            <div className="absolute right-1 top-1 hidden md:block">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                >
                    <XMarkIcon className="size-4 dark:text-white" />
                </Button>
            </div>
            <div className="flex flex-col pt-2 md:flex-row">
                <label htmlFor="title">Задача: </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => onChaneData("title", e.target.value)}
                    placeholder="Введите название задачи"
                    className="rounded bg-gray-300 px-2 py-1 dark:bg-neutral-600 md:ml-2"
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

            <div className="mt-4 flex flex-col">
                <span>Tag:</span>
                <Select
                    value={task.tagId?.toString()}
                    onValueChange={(tagId) => onChaneData("tagId", tagId)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Выберите тег" />
                    </SelectTrigger>
                    <SelectContent
                        ref={(ref) => {
                            if (!ref) return;
                            ref.ontouchstart = (e) => e.preventDefault();
                        }}
                    >
                        <SelectGroup>
                            <SelectLabel>Теги</SelectLabel>
                            {tags?.map((tag) => (
                                <SelectItem key={tag.id} value={`${tag.id}`}>
                                    {tag.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="mt-4 flex flex-col">
                <DatePicker date={date} setDate={onChangeDate} />
            </div>

            <div className="mt-2 flex justify-end gap-2">
                <Button
                    variant="ghost"
                    disabled={isPending}
                    onClick={handleUpdateTask}
                    className="transition duration-150 hover:bg-zinc-900 hover:text-white"
                >
                    Сохранить
                </Button>
                <Button
                    variant="ghost"
                    onClick={resetChange}
                    className="transition duration-150 hover:bg-red-500"
                >
                    Отменить
                </Button>
            </div>
        </div>
    );
};
