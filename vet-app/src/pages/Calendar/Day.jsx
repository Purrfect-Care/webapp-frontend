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

  function formatToTime(date) {
    let date_obj = new Date(date);

    let hours = date_obj.getHours();
    let minutes = date_obj.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let time_str = hours + ":" + minutes;
    return time_str;
  }

  function addTimes(time1, time2) {
    let [hours1, minutes1] = time1.split(":").map(Number);
    let [hours2, minutes2] = time2.slice(0, 5).split(":").map(Number);

    let time1InMinutes = hours1 * 60 + minutes1;
    let time2InMinutes = hours2 * 60 + minutes2;

    let sumInMinutes = time1InMinutes + time2InMinutes;

    let sumHours = Math.floor(sumInMinutes / 60);
    let sumMinutes = sumInMinutes % 60;

    sumHours = sumHours < 10 ? "0" + sumHours : sumHours;
    sumMinutes = sumMinutes < 10 ? "0" + sumMinutes : sumMinutes;

    return time1 + " - " + sumHours + ":" + sumMinutes;
  }

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-customGreen text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col cursor-pointer" onClick={() => {
      setDaySelected(day);
      setShowEventModal(true);
    }}>
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
        className="flex-1 pb-10"    
      >
        {dayEvents.map((evt, idx) => {
          return (
            <div
              key={idx}
              onClick={() => setSelectedEvent(evt)}
              className={`p-1 mr-3 text-black text-xs rounded mb-1 truncate ${
                evt.visit_status.toLowerCase() === "zaplanowana"
                  ? "bg-yellow-200"
                  : evt.visit_status.toLowerCase() === "zakończona"
                  ? "bg-green-200"
                  : evt.visit_status.toLowerCase() === "odwołana"
                  ? "bg-red-200"
                  : ""
              }`}
            >
              <div
                onClick={() => setSelectedEvent(evt)}
                className={`p-1 text-black text-sm rounded mb-1 truncate ${
                  evt.visit_status.toLowerCase() === "zaplanowana"
                    ? "bg-yellow-300"
                    : evt.visit_status.toLowerCase() === "zakończona"
                    ? "bg-green-300"
                    : evt.visit_status.toLowerCase() === "odwołana"
                    ? "bg-red-300"
                    : ""
                }`}
              >
                {evt.visits_visit_type.visit_type_name}
              </div>
              <span style={{ marginRight: "15px", marginLeft: "6px" }}>
                {addTimes(formatToTime(evt.visit_datetime), evt.visit_duration)}
              </span>
              <span>
                {evt.visits_employee.employee_first_name.charAt(0) +
                  "." +
                  evt.visits_employee.employee_last_name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
