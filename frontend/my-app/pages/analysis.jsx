"use client";

import React, { useEffect, useState }  from "react";
import { useAuth } from "@/components/Cognito/UseAuth";
import Navigation from "@/components/Navigation/Navigation"
import WeeklyAchievement from "@/components/Analysis/WeeklyAchievement"
import Home from "@/components/Home/Home";
import MonthlyAcheivement from "@/components/Analysis/MonthlyAchievement";
import PrivateRoute from "@/components/Cognito/PrivateRoute";


import MonthlyRank from "@/components/Analysis/MonthlyRank";
import MonthlyCallAPI from "@/components/Analysis/MonthlyCallAPI";

export default function HomePage () {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  


  return (
    <PrivateRoute>
      <Navigation />
      <h1>分析画面</h1>
      <MonthlyAcheivement />
      <WeeklyAchievement />
    </PrivateRoute>
  );
};
