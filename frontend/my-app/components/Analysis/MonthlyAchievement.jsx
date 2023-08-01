import React, { useEffect, useState } from 'react';
import  {Doughnut}  from 'react-chartjs-2';
import 'chart.js/auto';
import styles from '@/styles/Home.module.css';
import { useAuth } from "@/components/Cognito/UseAuth";

//
const URL_LOAD = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_month_analysis"


const MonthlyAcheivement = () => {
  const [ratio, setRatio] = useState(null);
	// const [title, setTitle] = useState({});
	const { idToken } = useAuth();
	const { username } = useAuth();
	const {mailAddress} = useAuth();

	// let title_res = {"mode": "", "title": "存在しません"}
	const [title_res, setTitle] = useState({mode:"", title:"ありません"});


	// わざわざ外側でLoadDataって別関数として定義してるのは、UseEffect内以外からも呼び出したいからだよ～
	useEffect(() => {
		LoadData();
	}, []);

	// APIを叩いて、月次達成度データを取得
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
			
      if (data !== null){
				setRatio(data.output_text.total_achievement_ratio);
				// 追加
				

				const title = data.output_text.ranks
				console.log(title_res)
				console.log("----")
				for (const mode_ of ["EASY", "NORMAL", "HARD"]) {
					if(title[mode_]!==null){
						setTitle({mode: mode_, title: title[mode_]});
					}
				}

			}
		}
		catch (error) {
			console.error("Error Fetching Schedule data:", error);
			setRatio(null); // データがない場合、nullを設定するなどエラーハンドリングを行う

		}
	}


	

   // データ(達成率)がロードされていない場合の処理
   if (ratio===null) {
    return <div>まだデータがないよ！運動を続けてね！</div>;
  }

  const glaphData = {
    labels: ['達成', '未達成'],
    datasets: [
      {
        data: [ratio, 100 - ratio],
        backgroundColor: ['#1ABC9C', '#E74C3C'],
        hoverBackgroundColor: ['#1ABC9C', '#E74C3C'],
      },
    ],
  };

	const options = {
		aspectRatio: 1.0, // グラフのアスペクト比を調整（1に設定すると正方形になります）
		maintainAspectRatio: true, // アスペクト比を維持するかどうか（trueの場合、指定したアスペクト比を保持します）
		responsive: true, // グラフをレスポンシブにするかどうか（trueの場合、コンテナに合わせて自動的にサイズが調整されます）
	};

	return (
    <div>
			 <p className={styles.box}>
				称号: {title_res.mode} {title_res.title}
			</p> 
      <h1>先月の達成度</h1>
      <Doughnut data={glaphData} options={options}/>;
    </div>
  );
};

export default MonthlyAcheivement;





