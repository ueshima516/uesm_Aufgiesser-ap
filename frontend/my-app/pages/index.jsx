"use client";

import React from "react";
import { useAuth } from "@/components/Cognito/UseAuth";
import Navigation from "@/components/Navigation/Navigation"
import Home from "@/components/Home/Home";
import PrivateRoute from "@/components/Cognito/PrivateRoute";

export default function HomePage () {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <PrivateRoute>
      <Navigation />
      <Home />
    </PrivateRoute>
  );
};
