import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";
import TimeSlot from "./TimeSlot";
import VisitWeekTag from "./VisitWeekTag";

const DayWeek = ({ day }) => {
  const { setDaySelected, setShowEventModal, filteredEvents } =
    useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

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
        onClick={() => handleTimeSlotClick(`${i}:00`)}
        marginbottom={"mb-0"}
        cursor={"cursor-pointer"}
        height={"h-28"}
      />,
      <TimeSlot
        key={i + 0.5}
        time={`${i}:30 - ${i + 1}:00`}
        onClick={() => handleTimeSlotClick(`${i}:30`)}
        marginbottom={"mb-0"}
        cursor={"cursor-pointer"}
        height={"h-28"}
      />
    );
  }
  timeSlots.push(
    <TimeSlot
      key={20}
      time={`20:00`}
      marginbottom={"mb-4"}
      cursor={"select-none"}
      height={"h-4"}
    />
  );

  function handleTimeSlotClick(startTime) {
    setSelectedTime(startTime);
    setDaySelected(day);
    setShowEventModal(true);
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
        <header
          className="flex flex-col items-center bg-myGreen h-16 sticky top-0"
          style={{ zIndex: 10 }}
        >
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

        <div className="mt-14 relative" style={{ zIndex: 5 }}>
          <div className="absolute top-0 left-0 right-0">
            <VisitWeekTag day={day} />
          </div>
          {timeSlots}
        </div>
      </div>
    </>
  );
};

export default DayWeek;
