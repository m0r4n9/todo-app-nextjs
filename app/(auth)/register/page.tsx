import { Metadata } from "next";

import RegisterForm from "@/components/auth/register/register-form";

export const metadata: Metadata = {
    title: "Login",
};

export default function Page() {
    return <RegisterForm />;
}
