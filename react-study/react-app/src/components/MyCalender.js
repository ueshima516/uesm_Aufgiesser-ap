import React, { useState } from 'react';
import Calendar from 'react-calendar';

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <Calendar value={date} onChange={handleDateChange} />
    </div>
  );
}

export default MyCalendar;
