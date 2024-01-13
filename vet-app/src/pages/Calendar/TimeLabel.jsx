import React from 'react';

const TimeLabel = ({ time, marginbottom }) => {
  return (
    <div className={`h-12 flex items-center ${marginbottom}`}>
      <div className='text-xs ml-1'>{time}</div>
      <hr className='w-full ml-1' />
    </div>
  );
};

export default TimeLabel;

