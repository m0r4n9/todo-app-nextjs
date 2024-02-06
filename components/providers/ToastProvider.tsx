"use client";

import { ToastState, useToastState } from "@react-stately/toast";
import { createContext, ReactNode, useMemo } from "react";

import { ToastRegion } from "../ui/ToastRegion";

export interface ToastType {
    title: string;
    message?: string;
    type?: "default" | "success" | "warning" | "error";
}

export const ToastContext = createContext<{
    addToast: ToastState<ToastType>["add"] | null;
}>({ addToast: null });

export function ToastContextProvider({ children }: { children: ReactNode }) {
    let state = useToastState<ToastType>({
        maxVisibleToasts: 3,
    });

    const memoziedValue = useMemo(
        () => ({
            addToast: state.add,
        }),
        /* eslint-disable react-hooks/exhaustive-deps */
        []
    );

    return (
        <ToastContext.Provider value={memoziedValue}>
            {children}
            {state.visibleToasts.length > 0 && <ToastRegion state={state} />}
        </ToastContext.Provider>
    );
}
