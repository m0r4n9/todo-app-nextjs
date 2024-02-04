export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-center justify-center rounded-lg bg-gray-100 p-3 dark:bg-zinc-800 md:h-36">
                    <p className="text-xl font-bold dark:text-white">
                        TODO APP
                    </p>
                </div>
                {children}
            </div>
        </main>
    );
}
