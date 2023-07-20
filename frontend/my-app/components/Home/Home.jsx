import React, { useEffect, useState } from 'react';
import TodayDate from "./Date";

import styles from '@/styles/Home.module.css';

const URL = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"
const mail_address = "xx@test.com";

const Home = () => {
  const [data, setData] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [incompleteItems, setIncompleteItems] = useState([]);
  const [daily_schedulse, setDailySchedule] = useState(null);
  const day = "2023-08-01";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

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
      const term_id = data.output_text[0].schedule_id;
      const days = data.output_text[0][term_id];
      const daily_schedule = days[day];
      setDailySchedule(daily_schedule);
    
      const boxItems = Object.keys(daily_schedule).map((id) => ({
        id,
        menu: daily_schedule[id].menu,
        startTime: daily_schedule[id].start_time,
        endTime: daily_schedule[id].end_time,
        completed: daily_schedule[id].is_done
      }));


      setData(boxItems);
      console.log(daily_schedule);
    } 
    catch (error) {
      console.error("Error fetching data:", error);
      setDailySchedule(null); // データがない場合、nullを設定するなどエラーハンドリングを行う
    }
  }


  const toggleCompletion = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed
        };
      }
      return item;
    });

    setData(updatedData);
  };

  useEffect(() => {
    const completed = data.filter((item) => item.completed);
    const incomplete = data.filter((item) => !item.completed);

    setCompletedItems(completed);
    setIncompleteItems(incomplete);
  }, [data]);

  const formatTimeRange = (startTime, endTime) => {
    return `${startTime} ~ ${endTime}`;
  };

  return (
    <div>
      <h2>本日の予定</h2>
      <TodayDate />
      <div>
        <h2>未達成</h2>
        {incompleteItems.map((item) => (
          <div key={item.id} className={styles.listContainer}>
            <p className={styles.box}>
              {item.menu}: {formatTimeRange(item.startTime, item.endTime)}
            </p>
            <button className={styles.button} onClick={() => toggleCompletion(item.id)}>未達成</button>
          </div>
        ))}
      </div>

      <div>
        <h2>達成</h2>
        {completedItems.map((item) => (
          <div key={item.id} className={styles.listContainer}>
            <p className={`${styles.box} ${styles.completed}`}>
              {item.menu}: {formatTimeRange(item.startTime, item.endTime)}
            </p>
            <button className={styles.button} onClick={() => toggleCompletion(item.id)}>達成</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
