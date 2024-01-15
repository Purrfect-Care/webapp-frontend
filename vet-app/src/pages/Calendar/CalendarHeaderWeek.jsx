import React, { useContext } from "react";
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
  } = useContext(GlobalContext);

  // Get the current month and week
  const month = getMonth(monthIndex);
  const week = month[weekIndex];

  function handlePrevWeek() {
    if (weekIndex > 1) {
      setWeekIndex(weekIndex - 1);
    } else {
      // Go to the last week of the previous month
      setMonthIndex(prevMonthIndex => {
        const prevMonth = getMonth(prevMonthIndex - 1);
        setWeekIndex(prevMonth.length - 1);
        return prevMonthIndex - 1;
      });
    }
  }
  
  function handleNextWeek() {
    const currentMonth = getMonth(monthIndex);
    if (weekIndex < currentMonth.length - 1) {
      setWeekIndex(weekIndex + 1);
    } else {
      // Go to the first week of the next month
      setMonthIndex(nextMonthIndex => {
        setWeekIndex(1);
        return nextMonthIndex + 1;
      });
    }
  }

  // Get the first and last day of the week
  const firstDayOfWeek = week[0];
  const lastDayOfWeek = week[week.length - 1];

  // Format the month name(s)
  let monthName;
  if (firstDayOfWeek.month() !== lastDayOfWeek.month()) {
    // If the week spans two months, display both month names
    monthName = `${firstDayOfWeek.format("MMMM").replace(/^[a-ząćęłńóśżź]/, (match) => match.toUpperCase())} - ${lastDayOfWeek.format("MMMM YYYY").replace(/^[a-ząćęłńóśżź]/, (match) => match.toUpperCase())}`;

  } else {
    // If the week is within a single month, display one month name
    monthName = `${firstDayOfWeek.format("MMMM YYYY").replace(/^[a-ząćęłńóśżź]/, (match) => match.toUpperCase())}`;
  }

  // Replace the first letter with an uppercase letter


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
        <BiIcons.BiLeftArrowAlt
          className="cursor-pointer text-4xl text-customGreen mx-2"
          onClick={handlePrevWeek}
        />
        <h2 className="mr-4 ml-4 w-80 text-x1 text-gray-500 text-center font-bold select-none">
          {monthName}
        </h2>

        <BiIcons.BiRightArrowAlt
          className="cursor-pointer text-4xl text-customGreen mx-2"
          onClick={handleNextWeek}
        />
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
