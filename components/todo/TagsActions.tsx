"use client";

import { Tag } from "@prisma/client";
import { useCallback, useState } from "react";

import { CreateTag } from "./create-tag";
import { TagsDropdown } from "./tags-dropdown";

interface TagsActionsProps {
    tags?: Tag[];
    addTagMenu: boolean;
    toggleTagMenu: () => void;
}

export const TagsActions = (props: TagsActionsProps) => {
    const { tags, addTagMenu, toggleTagMenu } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleOpenDropdown = useCallback(
        () => setDropdownOpen((prevState) => !prevState),
        []
    );

    const onCloseDropdown = useCallback(() => setDropdownOpen(false), []);

    return (
        <div className="flex min-h-7 items-center gap-2">
            {!addTagMenu && (
                <TagsDropdown
                    tags={tags}
                    open={dropdownOpen}
                    toggleOpen={toggleOpenDropdown}
                    onClose={onCloseDropdown}
                />
            )}

            <CreateTag open={addTagMenu} toggleOpen={toggleTagMenu} />
        </div>
    );
};
