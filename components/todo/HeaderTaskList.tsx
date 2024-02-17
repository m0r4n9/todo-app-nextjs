"use client";

import { Tag } from "@prisma/client";
import clsx from "clsx";
import { useCallback, useState } from "react";

import { TabsTask } from "./tabs-tasks";
import { TagsActions } from "./TagsActions";

interface HeaderTaskListProps {
    tags?: Tag[];
}

export const HeaderTaskList = ({ tags }: HeaderTaskListProps) => {
    const [addTagMenu, setAddTagMenu] = useState(false);

    const toggleTagMenu = useCallback(() => {
        setAddTagMenu((prevState) => !prevState);
    }, []);

    return (
        <div
            className={clsx(
                "flex flex-col items-end py-1 lg:flex-row lg:items-center lg:justify-between"
            )}
        >
            <div className="self-end">
                <TabsTask />
            </div>

            <TagsActions
                tags={tags}
                addTagMenu={addTagMenu}
                toggleTagMenu={toggleTagMenu}
            />
        </div>
    );
};
