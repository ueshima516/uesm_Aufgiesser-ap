import React, { useRef, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Grid from '@mui/material/Grid';

import { useAuth } from "@/components/Cognito/UseAuth";

const URL_WEEK_ANALYSIS = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_week_analysis";
const URL_LOAD = URL_WEEK_ANALYSIS

const WeeklyAchievement = () => {
  const [data_rate, setData] = useState([]);

  const { idToken } = useAuth();
  const { username } = useAuth();
  const {mailAddress} = useAuth();

  useEffect(() => {
    LoadData();
  }, []);

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
      setData(dat.output_text);

    }
    catch (error) {
      console.error("Error Fetching Schedule data:", error);
      setData([]);
    }
  }

  const chartData = Object.keys(data_rate).map((key) => ({
    x: key,
    y: data_rate[key]
  }));

  const dateTickFormatter = (value) => {
    const dateList = value.split('_')
    const startDate = `${parseInt(dateList[0].slice(4, 6), 10)}` + "/" + `${parseInt(dateList[0].slice(6, 8), 10)}`
    const endDate = `${parseInt(dateList[1].slice(4, 6), 10)}` + "/" + `${parseInt(dateList[1].slice(6, 8), 10)}`


    return (
      startDate + "~" + endDate
    )
  }

  return (
    <>
      <Grid container spacing={0} alignItems='center' direction="column">

        <Grid item mt={2}>
          <h2>週単位の達成率</h2>
        </Grid>
      </Grid>

      <ResponsiveContainer height={300} width="100%">
        <LineChart data={chartData} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" tickFormatter={dateTickFormatter} angle={-45} textAnchor="end" height={80} />
          <YAxis dataKey="y" tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="linear" dataKey="y" name="達成率" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

    </>
  );
}

export default WeeklyAchievement;