"use client";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import clsx from "clsx";
import { forwardRef, SVGProps } from "react";
import { AriaButtonProps, useButton, useFocusRing } from "react-aria";

export interface ButtonProps extends AriaButtonProps {
    children?: React.ReactNode;
    Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    loading?: boolean;
    className?: string;
}

// Button for adobe libs
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { children, Icon, loading, className, ...rest },
    forwardedRef
) {
    const iconOnly = children === undefined;
    // Support forwarded refs: https://github.com/adobe/react-spectrum/pull/2293#discussion_r714337674
    const ref = useObjectRef(forwardedRef);
    const { buttonProps } = useButton(rest, ref);
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <button
            {...mergeProps(buttonProps, focusProps)}
            ref={ref}
            className={clsx(
                iconOnly && "rounded-full p-3",
                isFocusVisible && "ring-2 ring-violet-500 ring-offset-2",
                className
            )}
            disabled={buttonProps.disabled || loading}
        >
            {!loading ? Icon && <Icon /> : <div>Loading</div>}
            {children}
        </button>
    );
});

export default Button;
