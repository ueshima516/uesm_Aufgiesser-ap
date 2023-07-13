import React from "react";
import Navigation from "@/components/Navigation"
import Plan from "@/components/Plan";
import Pulldown from "@/components/Pulldown";


export default function CalendarPage () {
  return (
    <div>
      <Navigation />
      <Plan />
      <Pulldown title="種目" />
      <Pulldown title="強度" />
    </div>
  );
};
