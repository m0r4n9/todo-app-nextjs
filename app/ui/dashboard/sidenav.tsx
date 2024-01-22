import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav() {
    return (
        <div className="flex h-full flex-col justify-center px-2">
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
                    <button className="flex w-full rounded-md bg-gray-100 p-3">
                        <PowerIcon className="w-6" />
                        <div>Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
