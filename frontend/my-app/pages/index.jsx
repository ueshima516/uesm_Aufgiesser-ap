import React from "react";
import Navigation from "@/components/Navigation/Navigation"
import Home from "@/components/Home/Home";
import PrivateRoute from "@/components/Cognito/PrivateRoute";

export default function HomePage () {
  return (
    <PrivateRoute>
      <Navigation />
      <Home />
    </PrivateRoute>
  );
};
