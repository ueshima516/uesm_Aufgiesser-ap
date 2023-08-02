import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import styles from '@/styles/Home.module.css';
import { useAuth } from "@/components/Cognito/UseAuth";
import { formattedDate } from '../Home/Date';

import Image from 'next/image';
import Modal from 'react-modal';

import ICON_RUNNING from '@mui/icons-material/DirectionsRun';
import ICON_PUSHUP from '@/public/images/pushups.png';
import ICON_SQUAT from '@/public/images/muscle.png';
import ICON_SITUP from '@/public/images/sit-up.png';


const icons = {
  "RUNNING": ICON_RUNNING,
  "PUSHUP": ICON_PUSHUP,
  "SQUAT": ICON_SQUAT,
  "SITUP": ICON_SITUP
}

const menuIcons = (menu) => {
  if (menu === "RUNNING") {
    return <ICON_RUNNING sx={{ width: 40, height: 40 }} />
  } else if (menu === "PUSHUP") {
    return <Image key={menu} src={ICON_PUSHUP} width={40} height={40} alt={menu} />
  } else if (menu === "SQUAT") {
    return <Image key={menu} src={ICON_SQUAT} width={40} height={40} alt={menu} />
  } else if (menu === "SITUP") {
    return <Image key={menu} src={ICON_SITUP} width={40} height={40} alt={menu} />
  }
};


function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


const URL_LOAD = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"




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
      <Grid container spacing={0} alignItems='center' direction="column">
        <Grid item>
          <h3>{formattedDate} の予定</h3>
        </Grid>

        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {menusToday.map((item) => (

            <>
              <ListItem key={item.menu} disablePadding>

                <ListItemButton>
                  <ListItemIcon>
                    {menuIcons(item.menu)}
                  </ListItemIcon>
                  <ListItemText id={item.menu} primary={`${item.menu} ${item.intensity}`} />
                </ListItemButton>

              </ListItem>
              <Divider />
            </>
          ))}



        </List>

        {/* {menusToday.map((item) => (
          <Grid item key={item.menu}>
            <p className={styles.box}>
              {item.menu}: {item.intensity}
            </p>
            <button className={styles.button} >{item.is_done ? "true" : "false"}</button>
          </Grid>
        ))} */}

        <Grid item>
          <Button onClick={closeModal} variant='contained'>閉じる</Button> {/* 追加 */}
        </Grid>
      </Grid >

    )

  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
      <Grid container spacing={0} alignItems='center' direction="column">
        <Grid item>
          <h2>カレンダー</h2>
        </Grid>
        <Grid item>
          <Calendar
            value={date}
            onChange={handleDateChange}
            locale="ja-JP"
            tileContent={tileContent}
            onClickDay={(value, event) => openModal(value)} // Pass the formatted date
          />
        </Grid>
        <Grid item>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="ポップアップウィンドウ"
          >
            <ModalContents />
          </Modal>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MyCalendar;