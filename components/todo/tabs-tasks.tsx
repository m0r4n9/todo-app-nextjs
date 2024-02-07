"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export const TabsTask = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const optionsTasks = searchParams.get("op");

    const createOptionUrl = (option?: string) => {
        const params = new URLSearchParams(searchParams);
        if (option) {
            params.set("op", option);
        } else {
            params.delete("op");
        }
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex gap-4">
            <Link
                href={createOptionUrl()}
                className={clsx({
                    "underline decoration-black dark:decoration-white":
                        !optionsTasks,
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
