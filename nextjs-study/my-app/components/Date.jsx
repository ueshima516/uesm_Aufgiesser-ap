import React from 'react';

function TodayDate() {
  const today = new Date();

  // 日付のフォーマットを設定
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('ja-JP', options);

  return <span>本日の日付は {formattedDate} です。</span>;
}

export default TodayDate;