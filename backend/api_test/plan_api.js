const data = JSON.stringify({
  start_date: "2023-07-01",
  end_date: "2023-08-01",
  start_time: "08:00",
  end_time: "08:30",
  work_time: "30",
  menu: "running",
  mode: "EASY"
});

const url = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/plan_schedule"
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: data
})
.then(function(response) {
  if (response.ok) {
    return response.text();
  } else {
    throw new Error("リクエストが失敗しました。");
  }
})
.then(function(data) {
  write_json(data);
})
.catch(function(error) {
  console.error(error);
});


function write_json (jsonData) {
  // JSONをオブジェクトに変換
  const data = JSON.parse(jsonData);

  // output_textのバリューを変数として定義
  const outputData = data.output_text;

  // HTML要素を生成してデータを表示
  const outputDiv = document.createElement("div");
  for (const id in outputData) {
    const idElement = document.createElement("h2");
    idElement.textContent = id;

    const nestedData = outputData[id];
    for (const key in nestedData) {
      const keyElement = document.createElement("span");
      keyElement.textContent = key + ": ";

      const valueElement = document.createElement("span");
      valueElement.textContent = nestedData[key];

      outputDiv.appendChild(keyElement);
      outputDiv.appendChild(valueElement);
      outputDiv.appendChild(document.createElement("br"));
    }
    outputDiv.appendChild(document.createElement("hr"));
  }

  // 結果を表示するための要素に追加
  document.body.appendChild(outputDiv);
}
