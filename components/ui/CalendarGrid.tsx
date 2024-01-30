import { getWeeksInMonth } from "@internationalized/date";
import { AriaCalendarGridProps, useCalendarGrid, useLocale } from "react-aria";
import { CalendarState, RangeCalendarState } from "react-stately";

import { CalendarCell } from "./CalendarCell";

interface CalendarGridProps extends AriaCalendarGridProps {
    state: CalendarState | RangeCalendarState;
}
export function CalendarGrid({ state, ...props }: CalendarGridProps) {
    let { locale } = useLocale();
    let { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

    // Get the number of weeks in the month so we can render the proper number of rows.
    let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

    return (
        <table {...gridProps} cellPadding="0" className="flex-1">
            <thead {...headerProps}>
                <tr>
                    {weekDays.map((day, index) => (
                        <th
                            className="text-muted-foreground text-center text-sm font-semibold"
                            key={index}
                        >
                            {day}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* @ts-ignore */}
                {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
                    <tr key={weekIndex}>
                        {state
                            .getDatesInWeek(weekIndex)
                            .map((date, i) =>
                                date ? (
                                    <CalendarCell
                                        key={i}
                                        state={state}
                                        date={date}
                                    />
                                ) : (
                                    <td key={i} />
                                )
                            )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
