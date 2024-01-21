import React from "react";

const TimeSlot = ({ time, onClick, marginbottom, cursor, height }) => {
  const handleClick = () => {
    if (time !== "20:00") {
      onClick(time);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${height} ${cursor} ${marginbottom}`}
    >
      <hr />
    </div>
  );
};

export default TimeSlot;
