import React from "react";
import CreateEventButton from './CreateEventButton';
import SmallCalendar from "./SmallCalendar";

const CalendarSidebar = () => {
    return (
        <aside className="border p-5 w-64">
            <CreateEventButton />
            <SmallCalendar />
        </aside>
    );
}

export default CalendarSidebar;