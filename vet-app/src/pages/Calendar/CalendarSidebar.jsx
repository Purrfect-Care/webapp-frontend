import React from "react";
import CreateEventButton from './CreateEventButton';
import SmallCalendar from "./SmallCalendar";
import LabelsCalendar from "./LabelsCalendar";

const CalendarSidebar = () => {
    return (
        <aside className="border p-5 w-64">
            <CreateEventButton />
            <SmallCalendar />
            <LabelsCalendar />
        </aside>
    );
}

export default CalendarSidebar;