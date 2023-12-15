import React, { useContext, useState } from "react";
import * as BiIcons from "react-icons/bi";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";
import 'dayjs/locale/pl';
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex, showCalendarSidebar, setShowCalendarSidebar} = useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
  }

  dayjs.locale('pl');

  return (
    <header className="px-5 py-3 flex items-center bg-emerald-600/25 bg-opacity-20 rounded-md mb-3">
      <TbLayoutSidebarLeftExpandFilled className="text-5xl cursor-pointer border-gray-600 text-white mr-4" onClick={() => setShowCalendarSidebar(!showCalendarSidebar)}/>
      <button onClick={handleReset} className="border rounded bg-white text-customGreen py-2 px-4 mr-5 select-none transition duration-300 shadow-2xl hover:shadow-md hover:font-bold">Dzisiaj</button>    
      <div className="flex items-center justify-center w-screen">
        <BiIcons.BiLeftArrowAlt
          className="cursor-pointer text-4xl text-customGreen mx-2"
          onClick={handlePrevMonth}
        />
        <h2 className="mr-4 ml-4 w-80 text-x1 text-gray-500 text-center font-bold select-none">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY").replace(/^[a-ząćęłńóśżź]/, (match) => match.toUpperCase())}
        </h2>
        <BiIcons.BiRightArrowAlt
          className="cursor-pointer text-4xl text-customGreen mx-2"
          onClick={handleNextMonth}
        />
      </div>
    </header>
  );
};

export default CalendarHeader;
