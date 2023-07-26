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

  // const days = ["2023-07-19", "2023-07-23", "2023-07-25"]; // ここはDBから取得したデータを使う

  const schedule = [{
    date: "2023-07-18",
    menus: [
      {
        is_done: true,
        menu: "swimming",
        work_time: 30,
      },
      {
        is_done: false,
        menu: "pushup",
        work_time: 20,
      },
    ]
  },
  {
    date: "2023-07-26",
    menus: [
      {
        is_done: false,
        menu: "squat",
        work_time: 4,
      }
    ]
  }
  ]
  const days = schedule.map((sch) => (Object.values(sch)[0]));
  

  const handleDateChange = (value) => {
    setDate(value);
  };


  const tileContent = ({ date }) => {

    // console.log(data.output_text[0].username);

    // const x = data.output_text.filter((dat) => (dat.date == date));
    console.log("----------------");
    console.log(data.output_text);
    console.log(data.output_text[0]);
    console.log(data.output_text[0].date);
    console.log(GetDateString_2(date));
    // console.log(data.output_text.menus);
    
    

    let menu_names = ""
    // let menus_today = schedule.filter((sch) => sch.date == GetDateString_2(date))[0];
    let menus_today = data.output_text.filter((set) => set.date == GetDateString_2(date))[0];
    console.log(menus_today);// {menu_list: Array(1), username: 'ふわぽめ', date: '20230726'}
    // console.log(menus_today.menu_list);
    
    
    if (menus_today != undefined) {
      console.log(menus_today.menu_list);
      menu_names = menus_today.menu_list.map((menu) => (menu.menu));
    }
    console.log(menu_names);//['sit up']
    


    const formattedDate = GetDateString_2(date);
    const days_2 = data.output_text.map((arc) => (arc.date));
    console.log(days_2);
    console.log("----------------");

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

  const openModal = (date) => {
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
        <h3>{dateToShow} の予定</h3>



        {menus.map((menu) => (
          <div key={menu.menu} className={styles.listContainer}>
            <p className={styles.box}>
              {menu.menu}: {menu.work_time}
            </p>
            <button className={styles.button} >{menu.is_done}</button>
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
          onClickDay={(value, event) => openModal(GetDateString_2(value))} // Pass the formatted date
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