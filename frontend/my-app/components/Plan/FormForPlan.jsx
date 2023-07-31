import React, { useState } from "react";
import { useAuth } from "@/components/Cognito/UseAuth";
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';


const API_ENDPOINT_URL = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/plan_schedule";

const FormForPlan = () => {
  const { idToken } = useAuth();
  const { username } = useAuth();

  const [formData, setFormData] = useState(
    {
      start_date: null,
      end_date: null,
      start_time: null,
      menu: "RUNNING",
      mode: "EASY",
      username: username,
    });
  const [responseMessage, setResponseMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await fetch(API_ENDPOINT_URL, {
    //     method: "POST",
    //     body: JSON.stringify(formData),
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": idToken,
    //     },
    //   });
    //   console.log(formData);
    //   if (response.ok) {
    //     setResponseMessage("成功しました");
    //   } else {
    //     setResponseMessage("失敗しました");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setResponseMessage("失敗しました");
    // }

    // setFormSubmitted(true);
    console.log(formData);
  };


  const renderForm = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <form onSubmit={handleSubmit}>
        <Grid container={true} spacing={3}>
          <Grid item xs={6}>
            <DatePicker
              label={'開始日'}
              views={['year', 'month', 'day']}
              format="YYYY / M / D"
              value={formData.start_date}
              onChange={(value) => handleChange("start_date", value)}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label={'終了日'}
              views={['year', 'month', 'day']}
              format="YYYY / M / D"
              value={formData.end_date}
              onChange={(value) => handleChange("end_date", value)}
            />
          </Grid>
        </Grid>

        <TimePicker
          value={formData.start_time}
          label="開始時刻"
          minutesStep={5} // 5分刻みで入力できるように設定
          onChange={(value) => handleChange("start_time", value)}
        />

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="menu-select-label">メニュー</InputLabel>
            <Select
              labelId="menu-select-label"
              value={formData.menu}
              onChange={(event) => handleChange("menu", event.target.value)}
            >
              <MenuItem value={"RUNNING"}>ランニング</MenuItem>
              <MenuItem value={"MUSCLE"}>筋トレ</MenuItem>
              <MenuItem value={"RUNNING_MUSCLE"}>ランニング＋筋トレ</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <br />
        <label>
          Mode:
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
          >
            <option value="EASY">EASY</option>
            <option value="NORMAL">NORMAL</option>
            <option value="HARD">HARD</option>
          </select>
        </label>
        <br />
        <button type="submit">
          送信
        </button>
      </form>
    </LocalizationProvider>
  );

  const renderResponseMessage = () => (
    <div>
      <p>{responseMessage}</p>
    </div>
  );

  return (
    <Container component="main" maxWidth="sm">
      <h1>入力フォーム</h1>
      {!formSubmitted ? renderForm() : renderResponseMessage()}
    </Container>
  );
};

export default FormForPlan;
