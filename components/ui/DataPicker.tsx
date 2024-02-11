"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

interface DatePickerProps {
    date?: Date;
    setDate: (date?: Date) => void;

    calendarOpen?: boolean;
    setCalendarOpen?: (bool: boolean) => void;
}

export function DatePicker({
    date,
    calendarOpen,
    setDate,
    setCalendarOpen,
}: DatePickerProps) {
    return (
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, "PPP", {
                            locale: ru,
                        })
                    ) : (
                        <span>Выберите дату</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    locale={ru}
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                        setDate(date);
                        setCalendarOpen?.(false);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
