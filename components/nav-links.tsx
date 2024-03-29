"use client";

import {
    Cog6ToothIcon,
    HomeIcon,
    QueueListIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Главная", href: "/dashboard", icon: HomeIcon },
    { name: "Список задач", href: "/todo", icon: QueueListIcon },
    { name: "Настройки", href: "/settings", icon: Cog6ToothIcon },
];

export default function NavLinks({
    toggleSidebar,
}: {
    toggleSidebar?: () => void;
}) {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={toggleSidebar}
                        className={clsx(
                            "mt-2 flex items-center justify-start gap-1 rounded p-4 text-start first:mt-0 dark:text-white",
                            {
                                "bg-black text-white": pathname.includes(
                                    link.href
                                ),
                            },
                            {
                                "transition duration-300 hover:bg-gray-200 dark:hover:bg-zinc-500":
                                    pathname !== link.href,
                            }
                        )}
                    >
                        {LinkIcon && <LinkIcon className="w-4" />}
                        <p className="text-base">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
