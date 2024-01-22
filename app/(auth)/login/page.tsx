import LoginForm from "@/app/ui/auth/login/login-form";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Login'
}

export default function LoginPage() {
    return <LoginForm />;
}
