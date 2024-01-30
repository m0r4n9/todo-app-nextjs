import { createCalendar } from "@internationalized/date";
import { clsx } from "clsx";
import { useRef } from "react";
import {
    AriaDateFieldProps,
    DateValue,
    useDateField,
    useDateSegment,
    useLocale,
} from "react-aria";
import { DateFieldState, DateSegment, useDateFieldState } from "react-stately";

export function DateField(props: AriaDateFieldProps<DateValue>) {
    let state = useDateFieldState({
        ...props,
        locale: "ru-RU",
        createCalendar,
    });

    let ref = useRef(null);
    let { fieldProps } = useDateField(props, state, ref);

    return (
        <div {...fieldProps} ref={ref} className="flex">
            {state.segments.map((segment, i) => (
                <DateSegment key={i} segment={segment} state={state} />
            ))}
        </div>
    );
}

function DateSegment({
    segment,
    state,
}: {
    segment: DateSegment;
    state: DateFieldState;
}) {
    let ref = useRef(null);
    let { segmentProps } = useDateSegment(segment, state, ref);

    return (
        <div
            {...segmentProps}
            ref={ref}
            style={{
                ...segmentProps.style,
                minWidth:
                    segment.maxValue != null
                        ? String(segment.maxValue).length + "ch"
                        : undefined,
            }}
            className={`focus:bg-primary focus:text-primary-foreground group box-content rounded-sm px-0.5 text-right tabular-nums outline-none ${
                !segment.isEditable
                    ? "text-muted-foreground/90"
                    : "text-foreground"
            }`}
        >
            {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
            <span
                aria-hidden="true"
                className="text-muted-foreground/90 group-focus:text-primary-foreground group-focus:text-primary-foreground block w-full text-center"
                style={{
                    visibility: segment.isPlaceholder ? undefined : "hidden",
                    height: segment.isPlaceholder ? "" : 0,
                    pointerEvents: "none",
                }}
            >
                {segment.placeholder}
            </span>
            {segment.isPlaceholder ? "" : segment.text}
        </div>
    );
}
