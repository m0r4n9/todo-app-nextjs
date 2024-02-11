import { MobileSidebar } from "@/components/MobileSidebar";
import SideNav from "@/components/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col gap-2 md:flex-row">
            {/* Mobile  */}
            <div className="block px-4 py-2 md:hidden">
                <MobileSidebar />
            </div>
            {/* Desktop */}
            <div className="hidden w-52 md:block">
                <SideNav />
            </div>
            <div className="flex-grow px-4 py-2 md:p-6">{children}</div>
        </div>
    );
}
