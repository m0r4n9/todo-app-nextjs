import SideNav from "@/components/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen gap-2">
            <div className="w-60 flex-none">
                <SideNav />
            </div>
            <div className="flex-grow p-6">{children}</div>
        </div>
    );
}
