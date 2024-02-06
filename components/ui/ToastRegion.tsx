import type { AriaToastRegionProps } from "@react-aria/toast";
import { useToastRegion } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

import { ToastType } from "../providers/ToastProvider";
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
            <AnimatePresence>
                {state.visibleToasts.map((toast) => (
                    <motion.div
                        key={`animation-${toast.key}`}
                        initial={{ opacity: 0, y: "120%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: "120%",
                        }}
                    >
                        <Toast toast={toast} state={state} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
