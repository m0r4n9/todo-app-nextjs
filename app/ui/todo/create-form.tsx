"use client";

import { useFormState } from "react-dom";
import { Button } from "@/app/ui/button";

export default function Form() {
    // const [state, dispatch] = useFormState(createTodo, {
    //     errors: undefined,
    //     message: "",
    // });

    return (
        <form>
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
                    <input type="hidden" name="authorId" value="2" />
                </div>
                <Button type="submit">Create Task</Button>
            </div>
        </form>
    );
}
