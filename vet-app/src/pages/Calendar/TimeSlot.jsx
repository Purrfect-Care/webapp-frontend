import React from 'react';

const TimeSlot = ({ time, onClick }) => {
  return (
    <div onClick={onClick} className='h-12'>
      <hr />
    </div>
  );
};

export default TimeSlot;
