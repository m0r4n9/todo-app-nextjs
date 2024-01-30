import type { AriaPopoverProps } from "@react-aria/overlays";
import { DismissButton, Overlay, usePopover } from "@react-aria/overlays";
import clsx from "clsx";
import { ReactNode, RefObject, useRef } from "react";
import type { OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
    children: ReactNode;
    state: OverlayTriggerState;
    className?: string;
    popoverRef?: RefObject<HTMLDivElement>;
}

export function Popover(props: PopoverProps) {
    let ref = useRef<HTMLDivElement>(null);
    let { popoverRef = ref, state, children, className, isNonModal } = props;

    let { popoverProps, underlayProps } = usePopover(
        {
            ...props,
            popoverRef,
        },
        state
    );

    return (
        <Overlay>
            {!isNonModal && (
                <div {...underlayProps} className="fixed inset-0" />
            )}
            <div
                {...popoverProps}
                ref={popoverRef}
                className={clsx("z-10 mt-2", className)}
            >
                {!isNonModal && <DismissButton onDismiss={state.close} />}
                {children}
                <DismissButton onDismiss={state.close} />
            </div>
        </Overlay>
    );
}