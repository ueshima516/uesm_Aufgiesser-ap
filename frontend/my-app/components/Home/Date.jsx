import React from 'react';

function TodayDate() {
  const today = new Date();

  // 日付のフォーマットを設定
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('ja-JP', options);

  return (
    <div>
      <span>{formattedDate}</span>
    </div>
  )
}

export default TodayDate;
