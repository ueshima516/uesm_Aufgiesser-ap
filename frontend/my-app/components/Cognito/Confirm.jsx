import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/Cognito/UseAuth';
import styles from '@/styles/LoginForm.module.css';

const ConfirmForm = () => {
  const auth = useAuth();
  const navigate = useRouter();
  const [verificationCode, setVerificationCode] = useState('');

  const executeConfirm = async (event) => {
    event.preventDefault();
    const result = await auth.confirmSignUp(verificationCode);
    if (result.success) {
      alert('本人確認が成功しました');
      navigate.push('/login');
    } else {
      alert(result.message);
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>認証コード</h2>
      <form className={styles.form} onSubmit={executeConfirm}>
        <input
          type="text"
          placeholder="VerificationCode"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          className={styles.inputField}
        />
        <button type="submit" className={styles.button}>
          認証
        </button>
      </form>
    </div>
  );
};

export default ConfirmForm;
