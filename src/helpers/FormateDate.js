import React from 'react';

const FormattedDate = ({ date }) => { 
  const d = new Date(date);
 
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; 
 
  const day = d.getDate();
  const month = d.toLocaleString('default', { month: 'long' });
 
  return (
    <span className='md:text-sm text-xs'>
      {`${hours}:${minutes} ${ampm} . ${day} ${month}`}
    </span>
  );
};

export default FormattedDate;
