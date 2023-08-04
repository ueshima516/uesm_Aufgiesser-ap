import React, { useEffect, useState, Fragment } from 'react';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useAuth } from "@/components/Cognito/UseAuth";
import TodayDate from "./Date";

import ICON_RUNNING from '@mui/icons-material/DirectionsRun';
import ICON_PUSHUP from '@/public/images/pushups.png';
import ICON_SQUAT from '@/public/images/squat.png';
import ICON_SITUP from '@/public/images/sit-up.png';

const menuIcons = (menu) => {
	if (menu === "RUNNING") {
		return <ICON_RUNNING sx={{ width: 40, height: 40 }} />
	} else if (menu === "PUSHUP") {
		return <Image key={menu} src={ICON_PUSHUP} width={40} height={40} alt={menu} />
	} else if (menu === "SQUAT") {
		return <Image key={menu} src={ICON_SQUAT} width={40} height={40} alt={menu} />
	} else if (menu === "SITUP") {
		return <Image key={menu} src={ICON_SITUP} width={40} height={40} alt={menu} />
	}
};

const URL_LOAD = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"
const URL_UPDATE = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/update_schedule"

// Date()で取得した日付を"20230726"フォーマットの文字列に整形する関数
const GetDateString = (dateObj) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
	const formattedDate = dateObj.toLocaleDateString('ja-JP', options).replace(/\//g, '');
	return formattedDate;
}
const day = GetDateString(new Date());


const Home = () => {
	const [completedMenus, setCompletedMenus] = useState([]);
	const [incompleteMenus, setIncompleteMenus] = useState([]);
	const [menus, setMenus] = useState([]);
	const [startTime, setStartTime] = useState(null);

	const { idToken } = useAuth();
	const { username } = useAuth();
	const {mailAddress} = useAuth();

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
					username: mailAddress,
				})
			}
			);
			const data = await response.json();

			const result = data.output_text.find(item => item.date === day) || null;

			if (result !== null) {
				setMenus(result["menu_list"]);
				setStartTime(result["start_time"]);

			} else {
				setMenus([]);
				setStartTime(null)
			};
		}
		catch (error) {
			console.error("Error Fetching Schedule data:", error);
			setMenus([]); // データがない場合、nullを設定するなどエラーハンドリングを行う
			setStartTime(null)

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
					username: mailAddress,
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

	return (
		<Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
			<Grid container spacing={0} alignItems='center' direction="column">
				<Grid item>
					<TodayDate />
				</Grid>
				<Grid item>
					<h2>本日の予定</h2>
				</Grid>
				<Grid item>
					<h3>{startTime !== null ? `開始時刻: ${startTime}`: "今日は予定が無いよ〜"}</h3>
				</Grid>
			</Grid>

			<h2>未達成</h2>
			<Box
				sx={{
					minHeight: 170,
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<List dense sx={{ width: '100%', maxWidth: 360 }}>
					{incompleteMenus.map((menu, index) => {
						const labelId = `checkbox-list-secondary-label-${menu}`;
						return (
							<Fragment key={index}>
								<ListItem
									secondaryAction={
										<Button
											variant='contained'
											onClick={() => toggleCompletion(menu.menu)}
										>
											完了
										</Button>
									}
									disablePadding
									sx={{ bgcolor: 'background.paper'}}
								>
									<ListItemButton>
										<ListItemIcon>
											{menuIcons(menu.menu)}
										</ListItemIcon>
										<ListItemText id={menu.menu} primary={`${menu.menu} ${menu.intensity}`} />
									</ListItemButton>
								</ListItem>
								<Divider />
							</Fragment>
						);
					})}
				</List>
			</Box>

			<h2>達成</h2>
			<Box
				sx={{
					minHeight: 170,
					justifyContent: 'center',
					display: 'flex',
				}}
			>
				<List dense sx={{ width: '100%', maxWidth: 360 }}>
					{completedMenus.map((menu, index) => {
						const labelId = `checkbox-list-secondary-label-${menu}`;
						return (
							<Fragment key={index}>
								<ListItem
									secondaryAction={
										<Button
											variant='outlined'
											onClick={() => {
												const result = window.confirm("本当は実行していないって事？");
												if (result) {
													toggleCompletion(menu.menu)
												}
											}}
										>
											達成済
										</Button>
									}
									disablePadding
									sx={{ bgcolor: "grey" }}
								>
									<ListItemButton>
										<ListItemIcon>
											{menuIcons(menu.menu)}
										</ListItemIcon>
										<ListItemText id={menu.menu} primary={`${menu.menu} ${menu.intensity}`} />
									</ListItemButton>
								</ListItem>
								<Divider />
							</Fragment>
						);
					})}
				</List>
			</Box>
		</Container>
	);
};

export default Home;
