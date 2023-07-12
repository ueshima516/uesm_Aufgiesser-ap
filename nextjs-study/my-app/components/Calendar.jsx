import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <div>
      <h2>カレンダー</h2>
      <div>
        <Calendar
          value={date}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
}

export default MyCalendar;
