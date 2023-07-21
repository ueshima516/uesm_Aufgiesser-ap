"use client";

import React from "react";
import SignUpForm from "@/components/Cognito/Signup";
import ConfirmForm from "@/components/Cognito/Confirm";

export default function SignUpFormPage () {
  return (
    <div>
      <SignUpForm />
      <ConfirmForm />
    </div>
  );
};
