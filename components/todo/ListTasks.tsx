"use client";

import { Task } from "@prisma/client";
import { AnimatePresence } from "framer-motion";

import { TaskItem } from "./TaskItem";

export const ListTasks = ({ tasks }: { tasks?: Task[] }) => {
    return (
        <div className="mt-3 flex flex-col">
            <AnimatePresence>
                {tasks?.map((item) => <TaskItem key={item.id} task={item} />)}
            </AnimatePresence>
        </div>
    );
};
