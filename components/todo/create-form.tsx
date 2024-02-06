"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { createTask } from "@/lib/actions";

export default function Form() {
    const [state, dispatch] = useFormState(createTask, {
        errors: undefined,
        message: "",
    });

    return (
        <form action={dispatch}>
            <div>
                <div>
                    <label htmlFor="title">Choose Title Task</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Title Task"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title">Enter Description Task</label>
                    <input
                        type="text"
                        name="desc"
                        placeholder="Enter Description Task"
                    />
                </div>
            </div>
            <div>
                <CreateTaskButton />
            </div>
        </form>
    );
}

function CreateTaskButton() {
    const { pending } = useFormStatus();

    return (
        <div>
            <Button type="submit" aria-disabled={pending}>
                Create Task
            </Button>
        </div>
    );
}
