"use client";

import { Tag } from "@prisma/client";
import { useCallback, useState } from "react";

import { CreateTag } from "./create-tag";
import { TagsDropdown } from "./tags-dropdown";

export const TagsActions = ({ tags }: { tags?: Tag[] }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addTagMenu, setAddTagMenu] = useState(false);

    const toggleOpenDropdown = useCallback(
        () => setDropdownOpen((prevState) => !prevState),
        []
    );

    const onCloseDropdown = useCallback(() => setDropdownOpen(false), []);

    const toggleOpenMenu = useCallback(() => {
        setAddTagMenu((prevState) => !prevState);
    }, []);

    return (
        <div className="flex gap-2">
            {!addTagMenu && (
                <TagsDropdown
                    tags={tags}
                    open={dropdownOpen}
                    toggleOpen={toggleOpenDropdown}
                    onClose={onCloseDropdown}
                />
            )}

            <CreateTag open={addTagMenu} toggleOpen={toggleOpenMenu} />
        </div>
    );
};
