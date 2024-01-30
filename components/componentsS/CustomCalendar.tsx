"use client";

import "react-calendar/dist/Calendar.css";

import { useState } from "react";
import Calendar from "react-calendar";

export function CustomCalendar({ locale }: { locale: string }) {
    const [value, onChange] = useState<any>(new Date());

    return (
        <div>
            <Calendar
                locale={locale}
                defaultActiveStartDate={new Date()}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}
