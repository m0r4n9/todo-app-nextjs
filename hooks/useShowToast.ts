import { useContext } from "react";

import { ToastContext } from "@/components/contexts/ToastContext";

interface UseShowToastProps {
    title: string;
    message?: string;
    type?: "default" | "success" | "warning" | "error";
    timeout?: number;
}

export const useShowToast = () => {
    const { addToast } = useContext(ToastContext);

    const showToast = ({
        title,
        message,
        type,
        timeout = 2000,
    }: UseShowToastProps) => {
        if (!addToast) return;
        addToast(
            { title, message, type },
            {
                timeout,
            }
        );
    };

    return {
        showToast,
    };
};
