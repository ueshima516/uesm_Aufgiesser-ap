"use client";

import React from "react";
import { useAuth } from "@/components/Cognito/UseAuth";
import Navigation from "@/components/Navigation/Navigation"
import Calendar from "@/components/Calendar/Calendar";
import PrivateRoute from "@/components/Cognito/PrivateRoute";

export default function CalendarPage () {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <PrivateRoute>
      <Navigation />
      <Calendar />
    </PrivateRoute>
  );
};
