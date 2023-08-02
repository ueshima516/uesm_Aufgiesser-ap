import React from 'react';

const today = new Date();
// 日付のフォーマットを設定
const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
const formattedDate = today.toLocaleDateString('ja-JP', options);
// "yyyy/mm/dd" 形式の日付文字列を "yyyy-mm-dd" 形式に変換
const formattedDateString = formattedDate.replace(/\//g, '-');

function TodayDate() {
  return (
    <div>
      <span>{formattedDate}</span>
    </div>
  )
}

export default TodayDate;
export { formattedDate, formattedDateString };
