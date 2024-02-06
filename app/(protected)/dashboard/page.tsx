import { Metadata } from "next";

import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Home",
};

export default function Page() {
    return (
        <div className="dark:text-white">
            <p>It is page home</p>
            <Button variant="ghost" size="lg">
                Test Variants
            </Button>
        </div>
    );
}
