import React, { useState } from "react";
import { useAuth } from "@/components/Cognito/UseAuth";
import styles from "@/styles/FormForPlan.module.css";

const API_ENDPOINT_URL = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/plan_schedule";

const FormForPlan = () => {
  const { idToken } = useAuth();
  const { username } = useAuth();

  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    start_time: "",
    menu: "",
    mode: "EASY",
    username: username,
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": idToken,
        },
      });

      if (response.ok) {
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
      <label className={styles.label}>
        Start Date:
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <span> </span>
      <label className={styles.label}>
        End Date:
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <br />
      <label className={styles.label}>
        Start Time:
        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className={styles.input}
        />
      </label>

      <br />
      <label className={styles.label}>
        Menu:
        <select
          name="menu"
          value={formData.menu}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="RUNNIG">ランニング</option>
          <option value="MUSCLE">筋トレ</option>
          <option value="RUNNING_MUSCLE">ランニング＋筋トレ</option>
        </select>
      </label>

      <br />
      <label className={styles.label}>
        Mode:
        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="EASY">EASY</option>
          <option value="NORMAL">NORMAL</option>
          <option value="HARD">HARD</option>
        </select>
      </label>
      <br />
      <button type="submit" className={styles.button}>
        送信
      </button>
    </form>
  );

  const renderResponseMessage = () => (
    <div className={styles["response-container"]}>
      <p className={styles["response-message"]}>{responseMessage}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1>入力フォーム</h1>
      {!formSubmitted ? renderForm() : renderResponseMessage()}
    </div>
  );
};

export default FormForPlan;
