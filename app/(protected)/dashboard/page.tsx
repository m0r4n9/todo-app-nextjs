import { Metadata } from "next";

import { Calendar } from "@/components/ui/Calendar";

export const metadata: Metadata = {
    title: "Home",
};

export default function Page() {
    return (
        <div className="dark:text-white">
            <p>It is page home</p>
            <Calendar />
        </div>
    );
}
