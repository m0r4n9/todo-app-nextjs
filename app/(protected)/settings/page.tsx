import { Suspense } from "react";

import { ThemeSwitch } from "@/components/ui/ThemeSwitch";

export default function Page() {
    return (
        <div>
            <h1 className="text-5xl font-semibold">Настройки</h1>
            <div className="mt-4">
                <Suspense fallback="Loading themes...">
                    <ThemeSwitch />
                </Suspense>
            </div>
        </div>
    );
}
