import React from 'react';
import Link from 'next/link';
import HomeButton from "./HomeButton";


function Navigation() {

  return (
    <div>
      {/* <h1>FitShow</h1> */}
      <h1 style={{ color: '#33CC66', fontFamily: 'Arial, sans-serif', fontSize: '36px'}}>FitShow</h1>


      <Link href="/">
        <HomeButton /> 
      </Link>

      <span>　</span>

      <Link href="/plan">
        <button className="button">計画</button>
      </Link>

      <span>　</span>

      <Link href="/calendar">
          <button className="button">カレンダー</button>
      </Link>

      <span>　</span>

      <Link href="/login">
        <button className="button">ログイン</button>
      </Link>
    </div>
  );
}

export default Navigation;
