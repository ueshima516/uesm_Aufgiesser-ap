import React, { useState } from 'react';

const SelectFormPage = ({ title }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
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
          <label htmlFor="select-option">運動可能時刻:</label>
          <select id="select-option" value={selectedOption} onChange={handleOptionChange}>
              <option value="">時間</option>
              {PulldownHourItems.map(
                  (item, index) => (
                      <option key={index} value={item}>
                          {item}
                      </option>)
              )
              }
          </select>
          <select id="select-option" value={selectedOption} onChange={handleOptionChange}>
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