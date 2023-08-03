"use client";

import React from "react";
import Box from "@mui/material/Box";
import { useAuth } from "@/components/Cognito/UseAuth";
import Navigation from "@/components/Navigation/Navigation"
import WeeklyAchievement from "@/components/Analysis/WeeklyAchievement"
import MonthlyAcheivement from "@/components/Analysis/MonthlyAchievement";
import PrivateRoute from "@/components/Cognito/PrivateRoute";
import Container from '@mui/material/Container';


export default function HomePage() {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <PrivateRoute>
      <Navigation />
      <Container component="main" maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <h1>分析画面</h1>
        </Box>
        <MonthlyAcheivement />
        <WeeklyAchievement />
      </Container>
    </PrivateRoute>
  );
};
