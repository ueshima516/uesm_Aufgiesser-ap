import React from "react";
import Navigation from "@/components/Navigation/Navigation"
import FormForPlan from "@/components/Plan/FormForPlan";
import PrivateRoute from "@/components/Cognito/PrivateRoute";

export default function CalendarPage () {
  return (
    <PrivateRoute>
      <Navigation />
      <FormForPlan />
    </PrivateRoute>
  );
};
