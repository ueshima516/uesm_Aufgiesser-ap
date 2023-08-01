import React, { useRef, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

  return (
    <div>
      <h3>週単位の達成率</h3>
      <ResponsiveContainer width="60%" height={200}>
        <LineChart data={chartData} >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="x" tickFormatter={(value) => value.split('2023')[1].split('_')[0] + "-" + value.split('2023')[2]} />
          <YAxis />
          <Tooltip/>
          <Legend />
          <Line type="linear" dataKey="y" name="達成率" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyAchievement;