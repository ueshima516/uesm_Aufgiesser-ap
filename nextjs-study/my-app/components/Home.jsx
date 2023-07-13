import React from 'react';
import Link from 'next/link';
import TodayDate from "./Date";
import Navigation from "./Navigation";
import TodoForm from "./Achievement";


// const fetchData = async () => {
//   const res = await fetch('外部APIのURL');
//   const data = await res.json();
//   return data;
// };

const Home = () => {

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     const apiData = await fetchData();
  //     setData(apiData);
  //   };
  //   getData();
  // }, []);

  return (
    <div>
      <Navigation />

      <h2>本日の予定</h2>
      <TodayDate />

      <TodoForm />

      {/* {data && (
        <div>
          <p>Date: {data.date}</p>
          <p>Work Time: {data.work_time}</p>
        </div>
      )} */}

    </div>
  );
};

export default Home;
