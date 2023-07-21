import React, { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation/Navigation"
import { PostTest } from "@/components/tmp/PostTest"


const URL = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/update_schedule"
const mail_address = "てすてす@test.com";

export default function TestSomething({ day = "2023-08-01" }) {
    // daily_schedulseの初期値はnull
    const [daily_schedulse, setDailySchedule] = useState(null);
    //GETかたポストに書き換えると…

    // useEffect(() => {
    //     const fetchData = async () => {

    //         try {
    //             const response = await fetch(URL, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     mail_address: "てすてす@test.com",
    //                     schedule_id: "term1",
    //                     target_date: "2023-08-01",
    //                     UUID: "xxxxx-xxxxx",
    //                 })
    //             }
    //             );
    //             const data = await response.json();
    //             console.log("DATA");
    //             console.log(data);
    //             console.log("DATA____");
    //             // const term_id = data.output_text[0].schedule_id;
    //             // const days = data.output_text[0][term_id];
    //             // const daily_schedule = days[day];
    //             // setDailySchedule(daily_schedule);
    //             // console.log(daily_schedule);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             setDailySchedule(null); // データがない場合、nullを設定するなどエラーハンドリングを行う
    //         }
    //     };
    //     fetchData();
    // },
    //     []// 変更されるとuseEffectする変数一覧：無し=ロード時のみ
    // );


    return (
        <div>
            <h1>ホーム画面に統合する</h1>
            <Navigation />

            <PostTest />
        </div>
    );
};