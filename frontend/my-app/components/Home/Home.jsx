import React, { useEffect, useState } from 'react';
import TodayDate from "./Date";
import styles from '@/styles/Home.module.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [incompleteItems, setIncompleteItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // APIレスポンスの代わりにモックデータを使用
      const responseData = {
        "id1": {
          "menu": "ランニング",
          "startTime": "19:00",
          "endTime": "19:30"
        },
        "id2": {
          "menu": "腕立て伏せ",
          "startTime": "21:00",
          "endTime": "21:30"
        },
        "id3": {
          "menu": "ウォーキング",
          "startTime": "07:00",
          "endTime": "07:30"
        }
      };

      const boxItems = Object.keys(responseData).map((id) => ({
        id,
        menu: responseData[id].menu,
        startTime: responseData[id].startTime,
        endTime: responseData[id].endTime,
        completed: false
      }));

      setData(boxItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
