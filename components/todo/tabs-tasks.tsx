"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export const TabsTask = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const optionsTasks = searchParams.get("op");

    const createOptionUrl = (option: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("op", option);
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex gap-4 py-2">
            <Link
                href={createOptionUrl("all")}
                className={clsx({
                    "underline decoration-black dark:decoration-white":
                        optionsTasks === "all" || !optionsTasks,
                })}
            >
                Все
            </Link>
            <Link
                href={createOptionUrl("deadline")}
                className={clsx({
                    "underline decoration-black dark:decoration-white":
                        optionsTasks === "deadline",
                })}
            >
                С дедлайном
            </Link>
            <Link
                href={createOptionUrl("noDeadline")}
                className={clsx({
                    "underline decoration-black dark:decoration-white":
                        optionsTasks === "noDeadline",
                })}
            >
                Без дедлайна
            </Link>
        </div>
    );
};
