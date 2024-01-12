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

        <div className="flex-1 grid grid-rows-14 cursor-pointer">
          {timeSlots}
        </div>
      </div>
    </>
  );
};

export default DayWeek;
