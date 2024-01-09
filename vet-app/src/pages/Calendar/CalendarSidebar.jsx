import React from "react";
import CreateEventButton from './CreateEventButton';
import SmallCalendar from "./SmallCalendar";
import LabelsCalendar from "./LabelsCalendar";
import FilterAdminVisits from "./FilterAdminVisits";
import { jwtDecode } from "jwt-decode";

const CalendarSidebar = () => {
    const authToken = localStorage.getItem('authToken');
    const employeeData = jwtDecode(authToken); // replace 'employeeData' with the key you used to store the employee data

    return (
        <aside className="border p-5 w-64 bg-emerald-600 bg-opacity-20 rounded">
            <CreateEventButton />
            <SmallCalendar />
            <LabelsCalendar />
            {employeeData && employeeData.employee_role === 'Administrator' || employeeData.employee_role === 'SuperAdmin' && <FilterAdminVisits />}
            
        </aside>
    );
}

export default CalendarSidebar;
