import { PowerIcon } from "@heroicons/react/24/outline";

import { signOut } from "@/auth";
import NavLinks from "@/components/dashboard/nav-links";

import { SidenavHeader } from "./dashboard/sidenavHeader";

export default function SideNav() {
    return (
        <div className="flex h-full flex-col justify-center px-2">
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
                    <button className="flex w-full gap-2 rounded-md p-3 text-white transition duration-300 hover:bg-zinc-500">
                        <PowerIcon className="w-6" />
                        <div>Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}