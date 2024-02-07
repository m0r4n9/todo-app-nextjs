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
            className={clsx("flex items-center py-1 md:justify-between", {
                "justify-end": addTagMenu,
                "justify-between": !addTagMenu,
            })}
        >
            <div
                className={`${addTagMenu ? "hidden md:block" : ""} text-nowrap`}
            >
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
