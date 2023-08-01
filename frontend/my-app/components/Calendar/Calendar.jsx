import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '@/styles/Home.module.css';
import { useAuth } from "@/components/Cognito/UseAuth";

import Image from 'next/image';
import Modal from 'react-modal';


import scheduleIcon1 from '@/public/images/running.png';
import scheduleIcon2 from '@/public/images/muscle.png';


import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


const URL_LOAD = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"


const icons = {
  "RUNNING": scheduleIcon1,
  "PUSHUP": scheduleIcon2,
  "SQUAT": scheduleIcon2,
  "SITUP": scheduleIcon2
}


// Date()で取得した日付を"20230726"フォーマットの文字列に整形する関数
const GetDateString = (dateObj) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
  const formattedDate = dateObj.toLocaleDateString('ja-JP', options).replace(/\//g, '');
  return formattedDate;
}

function MyCalendar() {
  const [dataOutputText, setDataOutputText] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dateToShow, setDateToShow] = useState(new Date());
  const [menusToday, setMenusToday] = useState([]);

  const { idToken } = useAuth();
  const { username } = useAuth();

  // わざわざ外側でLoadDataって別関数として定義してるのは、UseEffect内以外からも呼び出したいからだよ～
  useEffect(() => {
    LoadData();
  }, []);

  // APIからスケジュールを受信して、daySchedulesを更新する
  const LoadData = async () => {
    try {
      const response = await fetch(URL_LOAD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": idToken,
        },
        body: JSON.stringify({
          username: username,
        })
      }
      );
      const dat = await response.json();
      // console.log("--------")
      // console.log(dat);
      // console.log("--------")

      setDataOutputText(dat.output_text);
    }
    catch (error) {
      console.error("Error Fetching Schedule data:", error);
      setDataOutputText([]); // データがない場合、nullを設定するなどエラーハンドリングを行う

    }
  }



  const handleDateChange = (value) => {
    setDate(value);
  };

  const tileContent = ({ date }) => {
    // console.log(dataOutputText[0].username);
    let menus_today = dataOutputText.filter((dat) => (dat.date == GetDateString(date)));
    let menu_names = ""
    if (menus_today.length > 0) {
      menus_today = menus_today[0].menu_list
      menu_names = menus_today.map((menu) => (menu.menu));
    }


    //menu_names →　src_icon_list 　筋トレアイコンが2つ以上表示されないように
    let src_icon_list = [];
    for (let i = 0; i < menu_names.length; i++) {
      if (i === 0) src_icon_list.push(menu_names[i]);
      else if (icons[menu_names[i]] !== icons[menu_names[i - 1]]) {
        src_icon_list.push(menu_names[i]);
      }
    }

    return menus_today.length > 0 ?
      <div>
        {src_icon_list.map((name, index) => (<Image key={index} src={icons[name]} width={15} height={15} alt={name} />))}
      </div>
      : null;
  };

  useEffect(() => {
    let menus_today = dataOutputText.filter((dat) => (dat.date == GetDateString(date)));
    if (menus_today.length > 0) {
      menus_today = menus_today[0].menu_list;
      setMenusToday(menus_today);
    }
    else {
      setMenusToday([])
    }
    console.log(menus_today);
  }, [dateToShow]);

  const openModal = (date) => {
    console.log(date);
    setDateToShow(date);
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ModalContents = () => {
    return (
      <>
        <h3>{GetDateString(dateToShow)} の予定</h3>

        {menusToday.map((item) => (
          <div key={item.menu} className={styles.listContainer}>
            <p className={styles.box}>
              {item.menu}: {item.intensity}
            </p>
            <button className={styles.button} >{item.is_done ? "true" : "false"}</button>
          </div>
        ))}

        <button onClick={closeModal}>閉じる</button> {/* 追加 */}
      </>
    )

  }

  return (
    <div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={dayjs('2023-08-17')}
        />s
      </LocalizationProvider>



      <h2>カレンダー</h2>
      <div>
        <Calendar
          value={date}
          onChange={handleDateChange}
          locale="ja-JP"
          tileContent={tileContent}
          onClickDay={(value, event) => openModal(value)} // Pass the formatted date
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="ポップアップウィンドウ"
      >
        <ModalContents />
      </Modal>
    </div>
  );
}

export default MyCalendar;