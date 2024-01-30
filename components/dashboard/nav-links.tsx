"use client";

import {
    CheckCircleIcon,
    Cog6ToothIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "My todo list", href: "/todo", icon: CheckCircleIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "mt-2 flex items-center justify-start gap-1 rounded p-4 text-start text-white first:mt-0",
                            {
                                "bg-black text-white": pathname.includes(
                                    link.href
                                ),
                            },
                            {
                                "transition duration-300 hover:bg-zinc-500":
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
