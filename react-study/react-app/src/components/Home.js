import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">ログイン</Link>
          </li>
          <li>
            <Link to="/calendar">カレンダー</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
