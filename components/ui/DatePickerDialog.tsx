import { ReactNode, useRef } from "react";
import { AriaDialogProps, useDialog } from "react-aria";

interface DialogProps extends AriaDialogProps {
    children: ReactNode;
}

export function DatePickerDialog({ children, ...props }: DialogProps) {
    let ref = useRef(null);
    let { dialogProps } = useDialog(props, ref);

    return (
        <div
            {...dialogProps}
            ref={ref}
            className="bg-popover origin-top scale-95 rounded-xl bg-gray-100 p-6 shadow-2xl transition-transform focus-within:scale-100 dark:bg-neutral-900"
        >
            {children}
        </div>
    );
}
