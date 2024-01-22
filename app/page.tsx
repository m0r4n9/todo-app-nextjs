import Link from "next/link";

export default function Home() {
    return (
        <main className="flex h-screen justify-between">
            <div className="bg-hero_patter h-screen w-3/6 bg-black"></div>
            <div className="flex h-screen grow items-center justify-center rounded">
                <div className="p-2">
                    <div className="text-4xl font-bold">
                        <h1>Welcome TODO App</h1>
                    </div>
                    <div className="mt-2">
                        <Link
                            className="block cursor-pointer rounded bg-black p-2 text-center text-white transition duration-300 hover:opacity-80"
                            href="/dashboard"
                        >
                            Join
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
