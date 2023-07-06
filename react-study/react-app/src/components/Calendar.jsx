import React, { useState } from 'react';
import Calendar from 'react-calendar';
import withGlobalComponent from './withGlobalComponent';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // BootstrapのCSSをインポート

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <div className="container">
      <h1>カレンダー</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Calendar
            className="shadow p-3 mb-5 bg-white rounded"
            value={date}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
}

export default withGlobalComponent(MyCalendar);
