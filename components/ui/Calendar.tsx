"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "bg-zinc-800/90 w-8 font-normal text-[0.9rem]",
                row: "flex w-full mt-2",
                cell: "relative p-0 hover:bg-white/30 rounded transition text-center text-sm focus-within:relative focus-within:z-20 dark:[&:has([aria-selected])]:bg-white dark:[&:has([aria-selected])]:text-black [&:has([aria-selected].day-outside)]:bg-accent/50",
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                ),
                day_selected:
                    "hover:bg-white hover:text-primary-foreground focus:bg-white focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside:
                    "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon className="h-4 w-4" />
                ),
                IconRight: ({ ...props }) => (
                    <ChevronRightIcon className="h-4 w-4" />
                ),
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
