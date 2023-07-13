import React from 'react';
import homeIcon from './home-icon.png';

const HomeButton = () => {
  return (
    <button className="home-button">
      <img className="home-icon" src={homeIcon} alt="Home" />
    </button>
  );
}

export default HomeButton;