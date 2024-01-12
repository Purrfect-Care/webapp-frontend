// TimeLabel.js
import React from 'react';

const TimeLabel = ({ time }) => {
  return (
    <>
    <div className='h-12 flex justify-center'>
      <div className='flex items-end'>
      {time}
      </div>
      </div>
      <hr />
    </>
  );
};

export default TimeLabel;
