import React, { useEffect, useState } from 'react';
import TodayDate from "./Date";
import styles from '@/styles/Home.module.css';

//? 期ごとの予定 =｢plan｣>日ごとの予定｢schedule｣ 的なつもりで命名してる？いや、そんな事もなさそうだな…
const URL_LOAD = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"
const URL_UPDATE = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/update_schedule"

// // TODO 本日の日付取得 これを変数として代入すること
// // ? 日付が変わったら自動でリロードとかもありかもね
//   const today = new Date();
// const year = today.getFullYear();
// const month = String(today.getMonth() + 1).padStart(2, '0'); // 月は0-indexedなので+1する
// const d = String(today.getDate()).padStart(2, '0');
// const date_ = `${year}-${month}-${d}`;
// console.log(date_); //"2023-07-20"形式で
const day = "2023-08-01";
// TODO メアドも変数にして変えられる様にすること
const mail_address = "てすてす@test.com";

const Home = () => {
	const [completedMenus, setCompletedMenus] = useState([]);
	const [incompleteMenus, setIncompleteMenus] = useState([]);
	const [menus, setMenus] = useState([]);
	const [scheduleID, setScheduleID] = useState(null);

	// わざわざ外側でLoadDataって別関数として定義してるのは、UseEffect内以外からも呼び出したいからだよ～
	useEffect(() => {
		LoadData();
	}, []);

	// APIからスケジュールを受信して、daySchedulesを更新する
	const LoadData = async () => {
		try {
			const response = await fetch(URL_LOAD, {
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
			setMenus(data);
			// console.log(data);
			const menus = data.output_text[0][day];
			setScheduleID(data.output_text[0]["schedule_id"]);
			setMenus(menus);
			// console.log(daily_schedules);

		}
		catch (error) {
			console.error("Error Fetching data:", error);
			setMenus(null); // データがない場合、nullを設定するなどエラーハンドリングを行う
			setScheduleID(null);

		}
	}

	// 達成状態をトグルする
	const toggleCompletion = async (menu_UUID) => {
		// console.log(schedule_id);
		try {
			const response = await fetch(URL_UPDATE, { // DBに更新要求

				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					mail_address: mail_address,
					schedule_id: scheduleID,
					target_date: day,
					UUID: menu_UUID,
				})
			}
			);
			const data = await response.json();
			// console.log("POST RES");
			// console.log(data);
			// console.log("POST RES");
			LoadData(); // DBから再度予定を受信

		}
		catch (error) {
			console.error("Error Updating data:", error);
		}
	}

	// daySchedulesが更新されると自動実行
	useEffect(() => {
		CheckCompletion();
	}, [menus]);

	const CheckCompletion = () => {
		const completed = menus.filter((menu) => menu.is_done);
		const incomplete = menus.filter((menu) => !menu.is_done);
		// console.log(completed);
		// console.log(incomplete);
		setCompletedMenus(completed);
		setIncompleteMenus(incomplete);
	}

	const formatTimeRange = (start_time, end_time) => {
		return `${start_time} ~ ${end_time}`;
	};

	return (
		<div>
			<h2>本日の予定</h2>
			<TodayDate />
			<div>
				<h2>未達成</h2>
				{incompleteMenus.map((menu) => (
					<div key={menu.UUID} className={styles.listContainer}>
						<p className={styles.box}>
							{menu.menu}: {formatTimeRange(menu.start_time, menu.end_time)}
						</p>
						<button className={styles.button} onClick={() => toggleCompletion(menu.UUID)}>未達成</button>
					</div>
				))}
			</div>

			<div>
				<h2>達成</h2>
				{completedMenus.map((menu) => (
					<div key={menu.UUID} className={styles.listContainer}>
						<p className={`${styles.box} ${styles.completed}`}>
							{menu.menu}: {formatTimeRange(menu.start_time, menu.end_time)}
						</p>
						<button className={styles.button} onClick={() => toggleCompletion(menu.UUID)}>達成</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
