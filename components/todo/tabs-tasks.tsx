"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const listOptionLinks = [
    {
        option: null,
        content: "Все",
    },
    {
        option: "deadline",
        content: "С дейдлайном",
    },
    {
        option: "noDeadline",
        content: "Без дедлайна",
    },
    {
        option: "active",
        content: "Активные",
    },
    {
        option: "completed",
        content: "Завершенные",
    },
];

export const TabsTask = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const optionsTasks = searchParams.get("op");

    const createOptionUrl = (option: string | null) => {
        const params = new URLSearchParams(searchParams);
        if (option) {
            params.set("op", option);
        } else {
            params.delete("op");
        }
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex gap-3 text-nowrap py-3">
            {listOptionLinks.map((link) => (
                <Link
                    key={link.option}
                    href={createOptionUrl(link.option)}
                    className={clsx({
                        "underline decoration-black dark:decoration-white":
                            link.option === optionsTasks,
                    })}
                >
                    {link.content}
                </Link>
            ))}
        </div>
    );
};
