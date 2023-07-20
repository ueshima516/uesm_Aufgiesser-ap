import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/components/Cognito/UseAuth';
import styles from '@/styles/LoginForm.module.css';

const LoginForm = () => {
  const auth = useAuth();
  const navigate = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const executeSignIn = async (event) => {
    event.preventDefault();
    const result = await auth.signIn(username, password);
    if (result.success) {
      console.log('ログインが成功しました');
      navigate.push('/');
    } else {
      alert(result.message);
    }
  };


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={executeSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={handleUsernameChange}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className={styles.inputField}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <br />
      <Link href="/signup">
        <button>アカウントがない場合</button>
      </Link>
    </div>
  );
};

export default LoginForm;
