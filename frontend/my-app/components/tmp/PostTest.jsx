import React from 'react';

export function PostTest() {
    function handleSubmit(event) {
        event.preventDefault(); // フォームのデフォルトの動作をキャンセル
        // /* 
        // フォーム要素を取得
        var form = document.getElementById('myForm');

        // 入力値を取得
        // var startDate = form.elements.start_date.value;
        // var endDate = form.elements.end_date.value;
        // var startTime = form.elements.start_time.value;
        // var endTime = form.elements.end_time.value;
        // var workTime = form.elements.work_time.value;
        // var menu = form.elements.menu.value;
        // var mode = form.elements.mode.value;

        // オブジェクトを生成

        // console.log(
        //     startDate,
        //     endDate,
        //     startTime,
        //     endTime,
        //     workTime,
        //     menu,
        //     mode);

        //TODO こっちだとなぜか失敗する なんで~？
        // const data = JSON.stringify({
        //     start_date: startDate,
        //     end_date: endDate,
        //     start_time: startTime,
        //     end_time: endTime,
        //     work_time: workTime,
        //     menu: menu,
        //     mode: mode,
        //     mail_address: "aaaaaaa@gmail.com",
        // });
        const data = JSON.stringify({
            start_date: "2023-07-01",
            end_date: "2023-08-01",
            start_time: "08:00",
            end_time: "08:30",
            work_time: "30",
            menu: "running",
            mode: "EASY",
            mail_address: "ふわふわポメラニアン@gmail.com",
        });
        // 送るデータをコンソールに表示して確認
        console.log(data);
        const url = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/plan_schedule";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("リクエストが失敗しました。");
                }
            })
            .then(function (data) {
                write_json(data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // write_json関数の定義
    function write_json(data) {
        //     // データの処理を行う関数を定義する
        //     // 例えば、取得したデータをstateに設定するなどの処理を行う
        //     console.log(data);
    }

    return (
        <>
            <form id="myForm" onSubmit={handleSubmit}>
                {/* <form id="myForm" > */}
                <input type="date" name="start_date" />
                <input type="date" name="end_date" />
                <input type="time" name="start_time" />
                <input type="time" name="end_time" />
                <input type="number" name="work_time" />
                <input type="text" name="menu" />
                <input type="text" name="mode" />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
