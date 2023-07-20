import React, { useEffect, useState } from 'react';
import TodayDate from "./Date";

import styles from '@/styles/Home.module.css';

const URL = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"

const Home = () => {
  const [boxItems, setBoxItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [incompleteItems, setIncompleteItems] = useState([]);
  const [daily_schedules, setDailySchedules] = useState([]);

  const day = "2023-08-01";
  const mail_address = "てすてす@test.com";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    // TODO 本日の日付取得 これを変数として代入する
    // ? 日付が変わったら自動でリロードとかもありかもね
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, '0'); // 月は0-indexedなので+1する
    // const d = String(today.getDate()).padStart(2, '0');
    // const date_ = `${year}-${month}-${d}`;
    // console.log(date_); //"2023-07-20"形式で

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mail_address: mail_address,
        })
      }
      );
      const data = await response.json();
      setDailySchedules(data);
      // console.log(data);
      const daily_schedules = data.output_text[0][day];
      setDailySchedules(daily_schedules);
      // console.log(daily_schedules);

    }
    catch (error) {
      console.error("Error fetching data:", error);
      setDailySchedules(null); // データがない場合、nullを設定するなどエラーハンドリングを行う
    }
  }

  // 達成状態をトグルする
  const toggleCompletion = (UUID) => {
    // console.log(UUID);
    const updatedData = daily_schedules.map((item) => {
      if (item.UUID === UUID) {
        console.log(UUID);
        return {
          ...item,
          is_done: !item.is_done
        };
      }
      return item;
    });

    setDailySchedules(updatedData);
  };

  useEffect(() => {
    const completed = daily_schedules.filter((schedule) => schedule.is_done);
    const incomplete = daily_schedules.filter((schedule) => !schedule.is_done);
    // console.log(completed);
    // console.log(incomplete);
    setCompletedItems(completed);
    setIncompleteItems(incomplete);
  }, [daily_schedules]);

  const formatTimeRange = (start_time, end_time) => {
    return `${start_time} ~ ${end_time}`;
  };

  return (
    <div>
      <h2>本日の予定</h2>
      <TodayDate />
      <div>
        <h2>未達成</h2>
        {incompleteItems.map((item) => (
          <div key={item.UUID} className={styles.listContainer}>
            <p className={styles.box}>
              {item.menu}: {formatTimeRange(item.start_time, item.end_time)}
            </p>
            <button className={styles.button} onClick={() => toggleCompletion(item.UUID)}>未達成</button>
          </div>
        ))}
      </div>

      <div>
        <h2>達成</h2>
        {completedItems.map((item) => (
          <div key={item.UUID} className={styles.listContainer}>
            <p className={`${styles.box} ${styles.completed}`}>
              {item.menu}: {formatTimeRange(item.start_time, item.end_time)}
            </p>
            <button className={styles.button} onClick={() => toggleCompletion(item.UUID)}>達成</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
