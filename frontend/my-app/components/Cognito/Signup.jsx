import React, { useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { useAuth } from '@/components/Cognito/UseAuth';
import styles from '@/styles/LoginForm.module.css';
import LOGO from '@/public/images/Fotshow-all.svg';

const SignUpForm = () => {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const executeSignUp = async (event) => {
    event.preventDefault();
    const result = await auth.signUp(username, password);
    if (result.success) {
      setFormSubmitted(true);
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
      <h2>Sign Up</h2>
      <form className={styles.form} onSubmit={executeSignUp}>
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
        {
          !formSubmitted ?
            <button type="submit" className={styles.button}>Sign Up</button> :
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            ><h3>認証コードを送信しました</h3>
            </Box>
        }
      </form>
    </div>
  );
};

export default SignUpForm;
