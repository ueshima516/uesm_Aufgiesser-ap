import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Image from 'next/image';
import Modal from 'react-modal';

import scheduleIcon from '@/public/images/running-shoe.png';

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = ["2023-07-19", "2023-07-23", "2023-07-25"]; // ここはDBから取得したデータを使う

  const handleDateChange = (value) => {
    setDate(value);
  };

  const tileContent = ({ date }) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
    const formattedDate = date.toLocaleDateString('ja-JP', options).replace(/\//g, '-');
    return days.includes(formattedDate) ?
      <div>予定あり <Image src={scheduleIcon} width={15} height={15} alt="予定あり" />  </div>
      : null;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>カレンダー</h2>
      <div>
        <Calendar
          value={date}
          onChange={handleDateChange}
          locale="ja-JP"
          tileContent={tileContent}
          onClickDay={openModal} // 追加
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="ポップアップウィンドウ"
      >
        <h3>Hello!</h3>
        <button onClick={closeModal}>閉じる</button> {/* 追加 */}
      </Modal>
    </div>
  );
}

export default MyCalendar;