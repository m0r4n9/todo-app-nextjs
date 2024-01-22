const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


// 24
export function TaskSkeleton() {
    return (
        <div>
            <div className={`${shimmer} mt-3 relative overflow-hidden rounded bg-gray-100 p-5 shadow-sm`}>

            </div>

            <div className="mt-3 flex flex-col gap-3">
                <div className={`${shimmer} relative overflow-hidden rounded bg-gray-100 p-3 shadow-sm`}></div>
                <div className={`${shimmer} relative overflow-hidden rounded bg-gray-100 p-3 shadow-sm`}></div>
                <div className={`${shimmer} relative overflow-hidden rounded bg-gray-100 p-3 shadow-sm`}></div>
                <div className={`${shimmer} relative overflow-hidden rounded bg-gray-100 p-3 shadow-sm`}></div>
                <div className={`${shimmer} relative overflow-hidden rounded bg-gray-100 p-3 shadow-sm`}></div>
            </div>
        </div>

    )
}