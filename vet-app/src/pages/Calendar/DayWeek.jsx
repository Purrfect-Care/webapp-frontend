import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import TimeSlot from "./TimeSlot";

const DayWeek = ({ day, rowIdx }) => {
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    monthSelected,
  } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.visit_datetime).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  const timeSlots = [];
  for (let i = 8; i < 20; i++) {
    timeSlots.push(
      <TimeSlot
        key={i}
        time={`${i}:00 - ${i}:30`}
        onClick={() => console.log("Time slot clicked")}
      />,
      <TimeSlot
        key={i + 0.5}
        time={`${i}:30 - ${i + 1}:00`}
        onClick={() => console.log("Time slot clicked")}
      />
    );
  }
  timeSlots.push(<TimeSlot key={20} time={`20:00`} />);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-customGreen text-white rounded-full w-7"
      : "";
  }

  return (
    <>
      <div
        className="border border-gray-200 flex flex-col"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        <header className="flex flex-col items-center sticky top-0 bg-myGreen h-16">
          <p className="text-sm mt-1 select-none">
            {day.format("ddd").toUpperCase()}
          </p>
          <p
            className={`text-sm p-1 my-1 text-center select-none ${getCurrentDayClass()}`}
          >
            {day.format("DD")}
          </p>
          <div className="border-t border-customGreen w-full border-4"></div>
        </header>
  
        <div className="mt-8">
          {timeSlots}
          {dayEvents.map((event, index) => (
            <div key={index}>{event.title}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DayWeek;
