import React from 'react';
import Link from 'next/link';
import HomeButton from "@/components/Navigation/HomeButton";
import { useAuth } from '@/components/Cognito/UseAuth';

function Navigation() {
  const auth = useAuth();

  const executeSignOut = async () => {
    const result = await auth.signOut();

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      {/* <h1>FitShow</h1> */}
      <h1 style={{ color: '#33CC66', fontFamily: 'Arial, sans-serif', fontSize: '36px' }}>FitShow</h1>

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

      <Link href="/analysis">
        <button className="button">分析</button>
      </Link>
      <span>　</span>

      <button onClick={executeSignOut}>ログアウト</button>
    </div>
  );
}

export default Navigation;
