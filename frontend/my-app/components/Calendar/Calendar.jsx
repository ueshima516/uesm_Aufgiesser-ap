import React, { useEffect, useState, Fragment } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useAuth } from "@/components/Cognito/UseAuth";

import ICON_RUNNING from '@mui/icons-material/DirectionsRun';
import ICON_PUSHUP from '@/public/images/pushups.png';
import ICON_SQUAT from '@/public/images/squat.png';
import ICON_SITUP from '@/public/images/sit-up.png';

const URL_LOAD = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"

const icons = {
  "RUNNING": ICON_RUNNING,
  "PUSHUP": ICON_PUSHUP,
  "SQUAT": ICON_SQUAT,
  "SITUP": ICON_SITUP
}

const menuIcons = (menu, additionalProps) => {
  const iconProps = {
    ...additionalProps,
  };
  if (menu === "RUNNING") {
    return <ICON_RUNNING sx={iconProps} />
  } else if (menu === "PUSHUP") {
    return <Image src={ICON_PUSHUP} alt={menu} {...iconProps} />
  } else if (menu === "SQUAT") {
    return <Image src={ICON_SQUAT} alt={menu} {...iconProps} />
  } else if (menu === "SITUP") {
    return <Image src={ICON_SITUP} alt={menu} {...iconProps} />
  }
};

// Date()で取得した日付を"20230726"フォーマットの文字列に整形する関数
const GetDateString = (dateObj) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
  const formattedDate = dateObj.toLocaleDateString('ja-JP', options).replace(/\//g, '');
  return formattedDate;
}

const GetShowDateString = (dateObj) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
  return dateObj.toLocaleDateString('ja-JP', options);
}

function MyCalendar() {
  const [dataOutputText, setDataOutputText] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dateToShow, setDateToShow] = useState(new Date());
  const [menusToday, setMenusToday] = useState([]);
  const [startTime, setStartTime] = useState(null);

  const { idToken } = useAuth();
  const { username } = useAuth();
  const { mailAddress } = useAuth();

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
          username: mailAddress,
        })
      }
      );
      const dat = await response.json();

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

    const showIcons = menus_today.length > 0 ?
      src_icon_list.map((name, index) => (menuIcons(name, { key: index, width: 15, height: 15, color: "black" })))
      : null;

    return (
      <Box
        sx={{
          minHeight: 15,
          m: 1,
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        {showIcons}
      </Box>
    )
  };

  useEffect(() => {
    let menus_today = dataOutputText.filter((dat) => (dat.date == GetDateString(date)));

    if (menus_today.length > 0) {
      const menu_start_time = menus_today[0].start_time;
      menus_today = menus_today[0].menu_list;

      setMenusToday(menus_today);
      setStartTime(menu_start_time);
    }
    else {
      setMenusToday([])
      setStartTime([])
    }
  }, [dateToShow]);

  const openModal = (date) => {
    setDateToShow(date);
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ModalContents = () => {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    };
    return (
      <Box sx={style}>

        <Grid container spacing={0} alignItems='center' direction="column" maxHeight={400}>
          <Grid item>
            <h3>{GetShowDateString(dateToShow)} の予定</h3>
          </Grid>
          <Grid item>
            <h4>開始時刻: {startTime}</h4>
          </Grid>


          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {menusToday.map((item, index) => (

              <Fragment key={index}>
                <ListItem
                  secondaryAction={
                    <Button
                      variant='outlined'
                      sx={{ color: item.is_done ? '' : 'black !important', borderColor: item.is_done ? '' : 'black !important' }}
                    >
                      {item.is_done ? "達成済" : "未達成"}
                    </Button>
                  }

                  disablePadding>

                  <ListItemButton>
                    <ListItemIcon>
                      {menuIcons(item.menu, { key: index, width: 40, height: 40 })}
                    </ListItemIcon>
                    <ListItemText id={item.menu} primary={`${item.menu} ${item.intensity}`} />
                  </ListItemButton>

                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>

          <Grid item mt={5}>
            <Button onClick={closeModal} variant='contained'>閉じる</Button>
          </Grid>
        </Grid >
      </Box>
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
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalContents />
          </Modal>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MyCalendar;
