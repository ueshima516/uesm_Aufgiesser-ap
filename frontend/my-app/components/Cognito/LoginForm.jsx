import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { useAuth } from '@/components/Cognito/UseAuth';
import styles from '@/styles/LoginForm.module.css';

import LOGO from '@/public/images/Fotshow-all.svg';

const LoginForm = () => {
  const auth = useAuth();
  const navigate = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const executeSignIn = async (event) => {
    event.preventDefault();
    const result = await auth.signIn(username, password);
    if (result.success) {
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
      <Box
        component="span"
        sx={{
          height: 80,
          my: 1,
          display: 'flex',
        }}
      >
        <Image src={LOGO} width={250} alt={"Fitshow"} />
      </Box>
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
