import { CalendarIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef } from "react";
import { AriaDatePickerProps, DateValue, useDatePicker } from "react-aria";
import { useDatePickerState } from "react-stately";

import Button from "./ButtonAria";
import { ButtonNaked } from "./ButtonNaked";
import { Calendar } from "./Calendar";
import { DateField } from "./DateField";
import { DatePickerDialog } from "./DatePickerDialog";
import { Popover } from "./Popover";

export function DatePicker(props: AriaDatePickerProps<DateValue>) {
    let state = useDatePickerState(props);
    let ref = useRef(null);
    let {
        groupProps,
        labelProps,
        fieldProps,
        buttonProps,
        dialogProps,
        calendarProps,
        errorMessageProps,
    } = useDatePicker(props, state, ref);
    const isError = props.errorMessage !== undefined;

    // For clearing value: https://github.com/adobe/react-spectrum/issues/4986#issuecomment-1703337523
    const clear = () => {
        state.setDateValue(null!);
    };

    return (
        <>
            <div
                className={clsx(
                    "bg-input ring-foreground relative flex-col rounded-2xl pb-2 pr-5 pt-8 text-left outline-none focus-within:ring-2",
                    isError &&
                        "bg-destructive ring-destructive-foreground focus-within:ring-4"
                )}
            >
                <span
                    {...labelProps}
                    className={clsx(
                        "absolute left-16 top-[9px] text-sm",
                        isError
                            ? "text-destructive-foreground"
                            : "text-muted-foreground"
                    )}
                >
                    {props.label}
                </span>

                <ButtonNaked
                    {...buttonProps}
                    className="absolute left-5 top-[50%] translate-y-[-50%]"
                >
                    <CalendarIcon className="h-[24px] w-[24px]" />
                </ButtonNaked>
                <div {...groupProps} ref={ref} className="group ml-16 flex">
                    <div className="border-muted group-focus-within:border-muted-foreground group-hover:border-muted-foreground group-focus-within:group-hover:border-muted-foreground relative flex items-center rounded-md border p-1 transition-colors">
                        <DateField {...fieldProps} />
                    </div>
                </div>
                {state.isOpen && (
                    <Popover
                        triggerRef={ref}
                        state={state}
                        placement="bottom start"
                    >
                        <DatePickerDialog {...dialogProps}>
                            <Calendar {...calendarProps} />
                        </DatePickerDialog>
                    </Popover>
                )}
                <Button
                    Icon={() => <div>Close svg</div>}
                    onPress={clear}
                    className={clsx(
                        "absolute right-5 top-[50%] z-[1] hidden translate-y-[-50%]",
                        state.value !== null && "block"
                    )}
                    aria-label="Clear"
                />
            </div>
            {isError && (
                <p
                    className="text-foreground mt-2 font-medium"
                    {...errorMessageProps}
                >
                    Errors props
                </p>
            )}
        </>
    );
}
