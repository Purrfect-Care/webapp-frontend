import React, { useContext, useEffect } from "react";
import * as BiIcons from "react-icons/bi";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { BsWindowSidebar } from "react-icons/bs";
import { getMonth} from "../../util";

const CalendarHeaderWeek = () => {
  const {
    weekIndex,
    monthIndex,
    setMonthIndex,
    setWeekIndex,
    showCalendarSidebar,
    setShowCalendarSidebar,
    monthSelected,
    setMonthSelected,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);

 let monthName;
  monthName = dayjs(daySelected).format("MMMM YYYY").replace(/^[a-ząćęłńóśżź]/, (match) => match.toUpperCase());

  function handleReset() {
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
    setDaySelected(dayjs());
  }
  
  

  dayjs.locale("pl");

  return (
    <header className="px-5 py-3 flex items-center bg-emerald-600/25 bg-opacity-20 rounded-md mb-3">

      <button
        onClick={handleReset}
        className="border rounded bg-white text-customGreen py-2 px-4 mr-5 select-none transition duration-300 shadow-2xl hover:shadow-md hover:font-bold"
      >
        Dzisiaj
      </button>
      <div className="flex items-center justify-center w-screen">
        
        <h2 className="mr-4 ml-4 w-80 text-x1 text-gray-500 text-center font-bold select-none">
        {monthName}
        </h2>

        
      </div>
      <button
        onClick={() => setMonthSelected(!monthSelected)}
        className="border rounded bg-white text-customGreen py-2 px-4 mr-5 select-none transition duration-300 shadow-2xl hover:shadow-md hover:font-bold"
      >
        Miesiąc
      </button>
    </header>
  );
};

export default CalendarHeaderWeek;
