import React from "react";
import CreateEventButton from './CreateEventButton';
import SmallCalendar from "./SmallCalendar";
import LabelsCalendar from "./LabelsCalendar";

const CalendarSidebar = () => {
    return (
        <aside className="border p-5 w-64 bg-emerald-600 bg-opacity-20 rounded">
            <CreateEventButton />
            <SmallCalendar />
            <LabelsCalendar />
        </aside>
    );
}

export default CalendarSidebar;