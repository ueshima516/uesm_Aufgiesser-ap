import React from 'react';
import Image from 'next/image'

import homeIcon from '@/public/images/home-icon.png';

const HomeButton = () => {
  return (
    <button>
      <Image src={homeIcon} width={15} height={15} alt="Home" />
    </button>
  );
}

export default HomeButton;
