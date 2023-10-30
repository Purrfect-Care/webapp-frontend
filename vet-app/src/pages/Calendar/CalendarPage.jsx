import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarSidebar from "./CalendarSidebar";
import Month from "./Month";
import { getMonth } from "../../util";
import GlobalContext from "../../context/GlobalContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import EventModal from "./EventModal";


const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <React.Fragment>
        {showEventModal && <EventModal />}
        <Sidebar />
        <div className="h-screen flex flex-col shadow-inner ml-[-5px] mt-[8px] p-[24px] bg-white rounded-lg">
          <CalendarHeader />
          <div className="flex flex-1">
            <CalendarSidebar />
            <Month month={currentMonth} />
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default CalendarPage;
