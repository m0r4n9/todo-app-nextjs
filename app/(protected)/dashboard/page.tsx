import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
};

export default function Page() {
    return (
        <div className="dark:text-white">
            <p>It is page home</p>
        </div>
    );
}
