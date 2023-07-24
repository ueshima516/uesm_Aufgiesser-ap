"use client";

import React, { useState } from "react";
import styles from "@/styles/FormForPlan.module.css";
import PrivateRoute from "@/components/Cognito/PrivateRoute";
import { useAuth } from "@/components/Cognito/UseAuth";
import Navigation from "@/components/Navigation/Navigation";


const API_ENDPOINT_URL = 'https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev_cognito/api_test';


const ApiTest = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { idToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINT_URL, {
        method: "GET",
        headers: {
          "Authorization": idToken,
        },
      });

      if (response.ok) {
        console.log(response.text())
        setResponseMessage("成功しました");
      } else {
        setResponseMessage("失敗しました");
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("失敗しました");
    }

    setFormSubmitted(true);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button type="submit" className={styles.button}>
        Call API
      </button>
    </form>
  );

  const renderResponseMessage = () => (
    <div className={styles["response-container"]}>
      <p className={styles["response-message"]}>{responseMessage}</p>
    </div>
  );

  const { isLoading } = useAuth();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <PrivateRoute>
      <Navigation></Navigation>
      <div className={styles.container}>
        <h1>入力フォーム</h1>
        {!formSubmitted ? renderForm() : renderResponseMessage()}
      </div>
    </PrivateRoute>
  );
};

export default ApiTest;
