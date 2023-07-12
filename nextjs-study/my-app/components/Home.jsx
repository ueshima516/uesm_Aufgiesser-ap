import React from 'react';
import Link from 'next/link';
import TodayDate from "./Date";
import Navigation from "./Navigation"
// import HomeButton from './HomeButton';
// import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
// import  {faHome}  from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  return (
    <div>
      <Navigation />
 
      <div>
        <h2>本日の予定</h2>
        <TodayDate />
      </div>

      <div>
      <ul>
        <li>
          <h3>未達成</h3>
          <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="20"></input>
          <input type="checkbox" id="horns" name="horns"></input>
        </li>
        <li>
          <h3>達成</h3>
          <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="20"></input>
          <input type="checkbox" id="horns" name="horns"></input>
        </li>
      </ul>
      </div>

    </div>
  );
};

export default Home;
