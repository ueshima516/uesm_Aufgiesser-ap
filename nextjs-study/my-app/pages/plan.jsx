import React from "react";
import Navigation from "@/components/Navigation"
import Plan from "@/components/Plan";
import Pulldown from "@/components/Pulldown";
import Pulldown_Time from "@/components/Pulldown_Time";


export default function CalendarPage () {
  return (
    <div>
      <Navigation />
      <Plan />
      <Pulldown title="種目" li={["プール", "筋トレ", "ランニング"]} />
      <Pulldown title="強度" li={["EASY", "NORMAL", "HARD"]} />
      <Pulldown_Time />
    </div>
  );
};