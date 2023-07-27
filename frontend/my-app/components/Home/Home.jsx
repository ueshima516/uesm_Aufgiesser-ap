import React, { useEffect, useState } from 'react';
import { useAuth } from "@/components/Cognito/UseAuth";
import TodayDate, { formattedDateString } from "./Date";
import styles from '@/styles/Home.module.css';

//? 期ごとの予定 =｢plan｣>日ごとの予定｢schedule｣ 的なつもりで命名してる？いや、そんな事もなさそうだな…
const URL_LOAD = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"
const URL_UPDATE = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/update_schedule"


// const day = formattedDateString;
const day = "20220801"

const Home = () => {
	const [completedMenus, setCompletedMenus] = useState([]);
	const [incompleteMenus, setIncompleteMenus] = useState([]);
	const [menus, setMenus] = useState([]);

	const { idToken } = useAuth();
	const { username } = useAuth();



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
					"Content-Type": "application/json",
					"Authorization": idToken,
				},
				body: JSON.stringify({
					username: username,
				})
			}
			);
			const data = await response.json();

			
			const result = data.output_text.find(item => item.date === day) || null;

			if (result !== null){
				setMenus(result["menu_list"]);

			} else {
				setMenus([]);
			};
		}
		catch (error) {
			console.error("Error Fetching Schedule data:", error);
			setMenus([]); // データがない場合、nullを設定するなどエラーハンドリングを行う

		}
	}

	// 達成状態をトグルする
	const toggleCompletion = async (menu) => {
		try {
			const response = await fetch(URL_UPDATE, { // DBに更新要求

				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": idToken,
				},
				body: JSON.stringify({
					username: username,
					date: day,
					menu: menu,
				})
			}
			);
			const data = await response.json();
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
					<div key={menu.menu} className={styles.listContainer}>
						<p className={styles.box}>
							{menu.menu}: {menu.intensity}
						</p>
						<button className={styles.button} onClick={() => toggleCompletion(menu.menu)}>未達成</button>
					</div>
				))}
			</div>

			<div>
				<h2>達成</h2>
				{completedMenus.map((menu) => (
					<div key={menu.menu} className={styles.listContainer}>
						<p className={`${styles.box} ${styles.completed}`}>
							{menu.menu}: {menu.intensity}
						</p>
						<button className={styles.button} onClick={() => toggleCompletion(menu.menu)}>達成</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
