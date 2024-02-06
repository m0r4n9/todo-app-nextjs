import { XMarkIcon } from "@heroicons/react/24/outline";
import { type AriaToastProps, useToast } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { useRef } from "react";

import Button from "@/components/ui/ButtonAria";

import { ToastType } from "../providers/ToastProvider";

interface ToastProps<T> extends AriaToastProps<T> {
    state: ToastState<T>;
}

export function Toast<T extends ToastType>({ state, ...props }: ToastProps<T>) {
    let ref = useRef(null);
    let { toastProps, titleProps, descriptionProps, closeButtonProps } =
        useToast(props, state, ref);

    const { title, message } = props.toast.content;

    return (
        <div
            {...toastProps}
            ref={ref}
            className="flex justify-between gap-4 rounded-xl border bg-gray-100 px-2 py-2  dark:bg-neutral-600 dark:text-white"
        >
            <div>
                <div>
                    <h4 {...titleProps} className="text-lg font-semibold">
                        {title}
                    </h4>
                </div>

                <div className="flex justify-between gap-2">
                    {message && <p {...descriptionProps}>{message}</p>}
                </div>
            </div>
            <Button {...closeButtonProps}>
                <XMarkIcon className="w-[20px]" />
            </Button>
        </div>
    );
}
