"use client";

import {
    DateFormatter,
    getLocalTimeZone,
    parseAbsoluteToLocal,
    parseDate,
    toCalendarDate,
    today,
} from "@internationalized/date";
import type { Task } from "@prisma/client";
import { useState, useTransition } from "react";
import { DateValue, useLocale } from "react-aria-components";

import { DatePicker } from "@/components/ui/DatePicker";
import { updateTask } from "@/lib/actions";

export const EditForm = (props: { task: Task }) => {
    const { task } = props;
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState<Task>({ ...task });
    const { locale } = useLocale();

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

    const handleUpdateTask = async () => {
        startTransition(async () => {
            await updateTask(formData);
        });
    };

    return (
        <div>
            <div>
                <div>
                        <label htmlFor="title">Задача: </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) =>
                                onChaneData("title", e.target.value)
                            }
                            className="ml-2 rounded bg-neutral-600 px-2 py-1"
                        />
                </div>
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
                    className="block h-40 w-full resize-none rounded-lg bg-neutral-600 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
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
                    className="h-10 rounded-lg px-4 text-sm text-white transition duration-150 hover:bg-zinc-900"
                >
                    Сохранить
                </button>
                <button
                    onClick={resetChange}
                    className="h-10 rounded-lg px-4 text-sm text-white transition duration-150 hover:bg-red-500"
                >
                    Отменить
                </button>
            </div>
        </div>
    );
};
