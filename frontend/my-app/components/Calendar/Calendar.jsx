import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '@/styles/Home.module.css';

import Image from 'next/image';
import Modal from 'react-modal';


import scheduleIcon1 from '@/public/images/running.png';
import scheduleIcon2 from '@/public/images/muscle.png';

import data from '@/public/test.json';



const icons = {
  "RUNNING": scheduleIcon1,
  "pushup": scheduleIcon2,
  "squat": scheduleIcon2,
  "sit up": scheduleIcon2
}
  

// Date()で取得した日付を"2023-07-26"フォーマットの文字列に整形する関数
const GetDateString = (dateObj) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
  const formattedDate = dateObj.toLocaleDateString('ja-JP', options).replace(/\//g, '-');
  return formattedDate;
}



// Date()で取得した日付を"2023-07-26"フォーマットの文字列に整形する関数
const GetDateString_2 = (dateObj) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
  const formattedDate = dateObj.toLocaleDateString('ja-JP', options).replace(/\//g, '');
  return formattedDate;
}



function MyCalendar() {
  const today = GetDateString_2(new Date());

  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dateToShow, setDateToShow] = useState(today);
  const [menus, setMenus] = useState([]);

  const handleDateChange = (value) => {
    setDate(value);
  };


  const tileContent = ({ date }) => {

    // console.log(data.output_text[0].username);



    let menu_names = ""
    let menus_today = data.output_text.filter((set) => set.date == GetDateString_2(date))[0];

    
    if (menus_today != undefined) {
      menu_names = menus_today.menu_list.map((menu) => (menu.menu));
    }
   

    const formattedDate = GetDateString_2(date);
    const days_2 = data.output_text.map((arc) => (arc.date));

    return days_2.includes(formattedDate) ?
      <div>{menu_names.map((name) => (<Image src={icons[name]} width={15} height={15} alt="予定あり" />))}

      </div>
      : null;
  }


  useEffect(() => {
    const menus_today = schedule.filter((sch) => sch.date == dateToShow)[0];
    if (menus_today == undefined) {
      setMenus([]);
    }
    else {
      setMenus(menus_today.menus)
    }
    // console.log(menus);
  }, [dateToShow]);


  useEffect(() => {
    let menus_today = data.output_text.filter((dat) => (dat.date == GetDateString2(date)));
    if (menus_today.length > 0) {
      menus_today = menus_today[0].menu_list;
      setMenus(menus_today);
    }
    else {
      setMenus([])
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


    // console.log(menus_today);



    return (
      <>

        <h3>{GetDateString(dateToShow)} の予定</h3>



        {menus.map((item) => (
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