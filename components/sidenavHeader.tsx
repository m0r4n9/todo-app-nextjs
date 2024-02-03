"use client";

import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

import { ThemeSwitch } from "@/components/ui/ThemeSwitch";

export function SidenavHeader() {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col items-center pt-4 dark:text-white">
            WORKSPACE
            <div className="flex gap-1 ">
                <BriefcaseIcon className="h-[24px] w-[24px]" />
                <p>{session?.user?.name}</p>
            </div>
            <div>
                <ThemeSwitch />
            </div>
        </div>
    );
}
