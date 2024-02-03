import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { createCalendar } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { AriaCalendarProps, useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";

import Button from "./Button";
import { CalendarGrid } from "./CalendarGrid";

export function Calendar<T extends DateValue>(props: AriaCalendarProps<T>) {
    let { locale } = useLocale();
    let state = useCalendarState({
        ...props,
        locale,
        createCalendar,
    });

    let { calendarProps, prevButtonProps, nextButtonProps, title } =
        useCalendar(props, state);

    return (
        <div
            {...calendarProps}
            className="text-muted-foreground black:text-white inline-block dark:text-white"
        >
            <div className="flex items-center justify-between pb-4">
                <Button
                    {...prevButtonProps}
                    Icon={() => (
                        <ArrowLongLeftIcon className="w-[18px] text-black  dark:text-white" />
                    )}
                />
                <h2 className="ml-2 flex-1 text-center text-xl font-semibold">
                    {title}
                </h2>
                <Button
                    {...nextButtonProps}
                    Icon={() => (
                        <ArrowLongRightIcon className="w-[18px] text-black dark:text-white" />
                    )}
                />
            </div>
            <CalendarGrid state={state} />
        </div>
    );
}
