import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../../util";
import * as BiIcons from "react-icons/bi";
import GlobalContext from "../../context/GlobalContext";


function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  const {monthIndex} = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  return (
    <div className="mt-9">
      <header className="flex items-center">
        <p className="text-gray-500 font-bold text-center w-40 select-none">
          {dayjs(new Date(dayjs().year(), currentMonthIdx))
            .format("MMMM YYYY")
            .replace(/^[a-ząćęłńóśżź]/, (match) => match.toUpperCase())}
        </p>
        <div className="flex items-center w-20">
          <BiIcons.BiLeftArrowAlt
            className="cursor-pointer text-2xl text-customGreen mx-1"
            onClick={handlePrevMonth}
          />
          <BiIcons.BiRightArrowAlt
            className="cursor-pointer text-2xl text-customGreen mx-1"
            onClick={handleNextMonth}
          />
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day,i) =>(
            <span key={i} className="text-sm py-1 text-center">
                {day.format('dd').charAt(0)}
            </span>
        ))}
        {currentMonth.map((row,i) => (
            <React.Fragment key={i}>
                {row.map((day, idx) => (
                    <button key={idx} className={`py-1 w-full`}>
                        <span className="text-small">{day.format('D')}</span>
                    </button>
                ))}
            </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendar;
