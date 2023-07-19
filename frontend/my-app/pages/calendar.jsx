import React from "react";
import Navigation from "@/components/Navigation/Navigation"
import Calendar from "@/components/Calendar/Calendar";
import PrivateRoute from "@/components/Cognito/PrivateRoute";

export default function CalendarPage () {
  return (
    <PrivateRoute>
      <Navigation />
      <Calendar />
    </PrivateRoute>
  );
};
