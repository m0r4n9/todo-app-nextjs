import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
};

export default function Page() {
    return (
        <div className="text-white">
            <p>It is page home</p>
        </div>
    );
}
