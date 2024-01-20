import React from "react";
import DayWeek from "./DayWeek";
import TimeLabel from "./TimeLabel";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const Week = ({ month }) => {
  const { daySelected } = useContext(GlobalContext);

  if (!month || month.length === 0) {
    return null; // Or some loading state
  }

  const weekIndex = month.findIndex((week) =>
  week.some((day) => day.isSame(daySelected, 'day'))
);

  const week = month[weekIndex];
  if (!week) {
    console.log("week is undefined");
    return null;
  }

  const timeLabels = [];
  for (let i = 8; i < 20; i++) {
    timeLabels.push(
      <TimeLabel key={i} time={`${i}:00`} marginbottom={"mb-0"} />,
      <TimeLabel key={i + 0.5} time={`${i}:30`} marginbottom={"mb-0"} />
    );
  }
  timeLabels.push(
    <TimeLabel key={20} time={`20:00`} marginbottom={"mb-4"} />
  );
  

  return (
    <div className="flex-1 pb-1 grid grid-cols-8 " style={{ gridTemplateColumns: '0.4fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
      <div className="col-span-1 select-none">
        <div className="border border-gray-200 flex flex-col">
          <header className="flex flex-col items-center sticky h-16 bg-myGreen top-0">
            <p className="text-sm mt-1 select-none">Godziny</p>
            <p className={`text-sm p-1 my-1 text-center select-none`}>Wizyt</p>
            <div className="border-t border-customGreen w-full border-4"></div>
          </header>
          <div className="flex-1 grid grid-rows-14 select-none">
            {timeLabels}
          </div>
        </div>
      </div>
      {week.map((day, idx) => (
        <DayWeek day={day} key={idx} rowIdx={weekIndex} />
      ))}
    </div>
  );
};

export default Week;
