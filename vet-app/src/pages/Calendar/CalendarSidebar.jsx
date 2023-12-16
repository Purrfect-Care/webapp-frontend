import React from "react";
import CreateEventButton from './CreateEventButton';
import SmallCalendar from "./SmallCalendar";
import LabelsCalendar from "./LabelsCalendar";
import FilterAdminVisits from "./FilterAdminVisits";

const CalendarSidebar = () => {
    const userRole = localStorage.getItem('role');

    return (
        <aside className="border p-5 w-64 bg-emerald-600 bg-opacity-20 rounded">
            <CreateEventButton />
            <SmallCalendar />
            {userRole === 'Administrator' && <FilterAdminVisits />}
            <LabelsCalendar />
        </aside>
    );
}

export default CalendarSidebar;
