import Link from "next/link";

export default function Home() {
    return (
        <main className="flex h-screen justify-between">
            <div className="bg-hero_patter h-screen w-3/6 bg-black"></div>
            <div className="flex h-screen grow items-center justify-center rounded">
                <div className="p-2 dark:text-white">
                    <div className="text-center text-4xl font-bold">
                        <h1>Добро Пожаловать TODO App</h1>
                    </div>
                    <div className="mt-4">
                        <Link
                            className="block cursor-pointer rounded bg-gray-200 p-2 text-center transition duration-300 hover:opacity-80 dark:bg-zinc-700"
                            href="/dashboard"
                        >
                            Приступить
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
