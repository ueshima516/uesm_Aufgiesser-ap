import React from 'react';
import homeIcon from './images/home-icon.png';

const HomeButton = () => {
  return (
    <button>
      <img src={homeIcon} alt="Home" />
    </button>
  );
}

export default HomeButton;