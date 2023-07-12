import React, { useState } from 'react';

function MyPlan() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <div>
      <h2>計画立案〜〜</h2>
    </div>
  );
}

export default MyPlan;
