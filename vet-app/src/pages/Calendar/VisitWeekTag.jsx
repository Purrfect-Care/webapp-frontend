import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const VisitWeekTag = ({ day }) => {
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

  const calculateTimeSlotIndex = (visitTime) => {
    const startTime = dayjs("8:00 AM", "h:mm A");
    const visitStartTime = dayjs(visitTime, "h:mm A");

    const minutesDiff = visitStartTime.diff(startTime, "minutes");
    const timeSlotIndex = Math.floor(minutesDiff / 30);
    const remainingMinutes = minutesDiff % 30;

    return { timeSlotIndex, remainingMinutes };
  };
  const calculateVisitHeight = (duration) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    const durationInMinutes = hours * 60 + minutes + seconds / 60;

    if (isNaN(durationInMinutes)) {
      console.error("Invalid visit duration:", duration);
      return 0;
    }
    const slotHeight = 112;
    const timeSlots = durationInMinutes / 30;
    const visitHeight = timeSlots * slotHeight;
    return visitHeight;
  };

  return (
    <div style={{ width: "100%" }}>
      {dayEvents.map((evt, idx) => {
        const { timeSlotIndex, remainingMinutes } = calculateTimeSlotIndex(
          dayjs(evt.visit_datetime).format("h:mm A")
        );
        const visitHeight = calculateVisitHeight(evt.visit_duration);
        const adjustedTop = `${
          timeSlotIndex * 112 + (remainingMinutes / 30) * 112
        }px`;

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
            style={{
              position: "absolute",
              top: adjustedTop,
              left: 0,
              width: "85%",
              height: `${visitHeight}px`,
            }}
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
            <span style={{ marginRight: "10px" }}>
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
  );
};

export default VisitWeekTag;
