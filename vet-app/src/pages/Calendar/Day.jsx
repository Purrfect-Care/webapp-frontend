import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const Day = ({ day, rowIdx }) => {
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.visit_datetime).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-customGreen text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 select-none">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center select-none ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => {
          return (
            <div
              key={idx}
              onClick={() => setSelectedEvent(evt)}
              className={`p-1 mr-3 text-black text-sm rounded mb-1 truncate ${
                evt.visit_status === "Zaplanowana"
                  ? "bg-yellow-200"
                  : evt.visit_status === "Zakończona"
                  ? "bg-green-200"
                  : evt.visit_status === "Odwołana"
                  ? "bg-red-200"
                  : "" 
              }`}
            >
              {evt.visits_visit_type.visit_type_name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
