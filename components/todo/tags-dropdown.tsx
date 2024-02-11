"use client";

import { TagIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Tag } from "@prisma/client";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { deleteTag } from "@/lib/actions";

interface TagsDropdownProps {
    tags?: Tag[];
    open: boolean;
    toggleOpen: () => void;
    onClose: () => void;
}

export const TagsDropdown = ({
    tags,
    open,
    toggleOpen,
    onClose,
}: TagsDropdownProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tagsTasks = searchParams.get("tag");
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const createTagUrl = (tag?: string) => {
        const params = new URLSearchParams(searchParams);
        if (tag) {
            params.set("tag", tag);
        } else {
            params.delete("tag");
        }
        return `${pathname}?${params.toString()}`;
    };

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button className="flex" onClick={toggleOpen}>
                <TagIcon className="size-4" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            height: 0,
                        }}
                        animate={{
                            height: "auto",
                        }}
                        exit={{
                            height: 0,
                            transition: {
                                delay: 0.05,
                            },
                        }}
                        className="absolute right-0 top-6 z-40 max-h-80 min-w-36 overflow-hidden overflow-y-auto rounded bg-gray-100 shadow-2xl dark:bg-zinc-800"
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    opacity: {
                                        delay: 0.2,
                                    },
                                },
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    opacity: {
                                        duration: 0.15,
                                    },
                                },
                            }}
                            className="p-3"
                        >
                            <ul className="flex flex-col items-center justify-center gap-2">
                                <li
                                    className={clsx(
                                        "flex w-full justify-between gap-2 "
                                    )}
                                >
                                    <Link
                                        href={createTagUrl()}
                                        className={clsx(
                                            "cursor-pointer hover:underline",
                                            {
                                                "text-violet-300": !tagsTasks,
                                            }
                                        )}
                                    >
                                        Все
                                    </Link>
                                </li>
                                {tags?.map((tag) => (
                                    <li
                                        key={tag.id}
                                        className={clsx(
                                            "flex w-full justify-between gap-2 "
                                        )}
                                    >
                                        <Link
                                            href={createTagUrl(tag.name)}
                                            className={clsx(
                                                "cursor-pointer hover:underline",
                                                {
                                                    "text-violet-300":
                                                        tagsTasks === tag.name,
                                                }
                                            )}
                                        >
                                            {tag.name}
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Do you delete this tag?"
                                                    )
                                                )
                                                    deleteTag(tag.id);
                                            }}
                                        >
                                            <XCircleIcon className="w-[18px] cursor-pointer transition duration-300 hover:scale-125" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
