import React from 'react';
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">
              ログイン
            </Link>
          </li>
          <li>
            <Link href="/calendar">カレンダー</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
