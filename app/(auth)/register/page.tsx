import RegisterForm from "@/app/ui/auth/register/register-form";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Login'
}

export default function Page() {
    return <RegisterForm/>
}