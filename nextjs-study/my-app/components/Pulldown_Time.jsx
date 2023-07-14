import React, { useState } from 'react';

const SelectFormPage = ({ title }) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setSelectedMinute(e.target.value);
  };

  const [selectedHour2, setSelectedHour2] = useState('');
  const [selectedMinute2, setSelectedMinute2] = useState('');

  const handleHourChange2 = (e) => {
    setSelectedHour2(e.target.value);
  };

  const handleMinuteChange2 = (e) => {
    setSelectedMinute2(e.target.value);
  };
  const PulldownHourItems = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
  const PulldownMinuteItems = ["00","30"];
  let Time="",Time1="00",Time2="30";
  
//   {PulldownTimeItems.map(
//     (item, index) => (
//       if(index%2){
// Time="00";
//       }
        
// )
// }

  return (
      <div>
          <label htmlFor="select-hour">運動開始可能時刻:</label>
          <select id="select-hour" value={selectedHour} onChange={handleHourChange}>
              <option value="">時間</option>
              {PulldownHourItems.map(
                  (item, index) => (
                      <option key={index} value={item}>
                          {item}
                      </option>)
              )
              }
          </select>
          <select id="select-minute" value={selectedMinute} onChange={handleMinuteChange}>
              <option value="">分</option>
              {PulldownMinuteItems.map(
                  (item, index) => (
                      <option key={index} value={item}>
                          {item}
                      </option>)
              )
              }
          </select>

          <label htmlFor="select-hour2">  運動終了可能時刻:</label>
          <select id="select-hour2" value={selectedHour2} onChange={handleHourChange2}>
              <option value="">時間</option>
              {PulldownHourItems.map(
                  (item, index) => (
                      <option key={index} value={item}>
                          {item}
                      </option>)
              )
              }
          </select>
          <select id="select-minute2" value={selectedMinute2} onChange={handleMinuteChange2}>
              <option value="">分</option>
              {PulldownMinuteItems.map(
                  (item, index) => (
                      <option key={index} value={item}>
                          {item}
                      </option>)
              )
              }
          </select>
      </div>
  );
};

export default SelectFormPage;