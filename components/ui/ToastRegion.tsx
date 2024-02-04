import type { AriaToastRegionProps } from "@react-aria/toast";
import { useToastRegion } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { useRef } from "react";

import { ToastType } from "../contexts/ToastContext";
import { Toast } from "./Toast";

interface ToastRegionProps<T> extends AriaToastRegionProps {
    state: ToastState<T>;
}

export function ToastRegion<T extends ToastType>({
    state,
    ...props
}: ToastRegionProps<T>) {
    let ref = useRef(null);
    let { regionProps } = useToastRegion(props, state, ref);

    return (
        <div
            {...regionProps}
            ref={ref}
            className="fixed bottom-16 right-3 z-40 flex max-w-[320px] flex-col gap-3 focus:outline-none md:bottom-6 md:right-6"
        >
            {state.visibleToasts.map((toast) => (
                <Toast key={toast.key} toast={toast} state={state} />
            ))}
        </div>
    );
}
