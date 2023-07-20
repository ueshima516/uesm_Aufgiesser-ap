import React, { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation/Navigation"
import { PostTest } from "@/components/PostTest"


const URL = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"
const mail_address = "てすてす@test.com";

export default function GetTestPage({ day = "2023-08-01" }) {
    // daily_schedulseの初期値はnull
    const [daily_schedulse, setDailySchedule] = useState(null);
    //GETかたポストに書き換えると…

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        mail_address: mail_address,
                    })
                }
                );
                const data = await response.json();
                console.log("DATA");
                console.log(data);
                console.log("DATA____");
                // const term_id = data.output_text[0].schedule_id;
                // const days = data.output_text[0][term_id];
                // const daily_schedule = days[day];
                // setDailySchedule(daily_schedule);
                // console.log(daily_schedule);
            } catch (error) {
                console.error("Error fetching data:", error);
                setDailySchedule(null); // データがない場合、nullを設定するなどエラーハンドリングを行う
            }
        };
        fetchData();
    },
        []// 変更されるとuseEffectする変数一覧：無し=ロード時のみ
    );


    return (
        <div>
            <h1>ホーム画面に統合する</h1>
            <Navigation />
            {mail_address}<br />
            {daily_schedulse && Object.values(daily_schedulse).map((item) => (
                <>
                    {item.menu} {item.start_time}~{item.end_time}({item.work_time}) Done:{item.is_done}
                    <br />
                </>
            ))}

            <PostTest />
        </div>
    );
};