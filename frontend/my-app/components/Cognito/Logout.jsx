import Link from 'next/link';

const SignOutView = () => {
  return (
    <div>
      <h1>ログアウト状態です</h1>
      <Link href="/login">
        <button>ログイン画面へ戻る</button>
      </Link>
    </div>
  );
}

export default SignOutView;
