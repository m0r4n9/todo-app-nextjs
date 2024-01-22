"use client";

import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

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
