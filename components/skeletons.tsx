const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-zinc-300/60 dark:before:via-zinc-600/60 before:to-transparent";

// 24

export function TaskSkeleton() {
    return (
        <div>
            <div
                className={`${shimmer} relative mt-3 overflow-hidden rounded bg-gray-100 p-5 shadow-sm dark:bg-zinc-800`}
            ></div>

            <div className="mt-3 flex flex-col gap-3">
                {new Array(6).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className={`${shimmer} relative overflow-hidden rounded bg-gray-100 p-12 shadow-sm dark:bg-zinc-800`}
                    />
                ))}
            </div>
        </div>
    );
}
