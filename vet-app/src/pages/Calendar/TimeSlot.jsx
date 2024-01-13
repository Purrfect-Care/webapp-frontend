// TimeSlot.js
import React from 'react';

const TimeSlot = ({ time, onClick }) => {
  return (
    <div onClick={() => onClick(time)} className='h-12 cursor-pointer'>
      <hr />
    </div>
  );
};

export default TimeSlot;
