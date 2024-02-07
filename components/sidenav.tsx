import { PowerIcon } from "@heroicons/react/24/outline";

import { signOut } from "@/auth";
import NavLinks from "@/components/nav-links";

import { SidenavHeader } from "./sidenavHeader";

export default function SideNav() {
    return (
        <nav className="sticky top-0 flex h-screen flex-col justify-center px-2">
            <SidenavHeader />
            <div className="flex grow flex-col justify-center">
                <NavLinks />
            </div>
            <div className="mb-2 w-full">
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <button className="flex w-full gap-2 rounded-md p-3 transition duration-300 hover:bg-gray-200 dark:text-white dark:hover:bg-zinc-500">
                        <PowerIcon className="w-6" />
                        <div>Выйти</div>
                    </button>
                </form>
            </div>
        </nav>
    );
}
