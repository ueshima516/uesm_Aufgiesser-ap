import React, { useEffect } from 'react';
import Navigation from "@/components/Navigation/Navigation"

const MyComponent = () => {
    useEffect(() => { //? useEffectって何
        const fetchData = async () => {
            const URL = "https://5t1rm2y7qf.execute-api.ap-northeast-1.amazonaws.com/dev/load_plan"
            const response = await fetch(URL);
            const data = await response.json();
            console.log(data);
            // console.log(data.output_text.AAAAA - AAAAA);
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navigation />
            Fetching data...
        </div>
    );
};
export default MyComponent;


/* import { useState, useEffect } from 'react';
export async function getServerSideProps() {
    const URL = "https://0dqc4n5mx8.execute-api.ap-northeast-1.amazonaws.com/dev/zmr_lambda-test"
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data); // VSCodeのconsoleに表示
    return {
        props: { //ここでreturn{props:{}}しておいたものは、関数の外でもグローバルに使える様になるみたい！
            text: 'My Text',
            data: { data }
        }
    }
}

export default function Page({ text, data }) {
    console.log(text); // ブラウザのconsokeに表示
    console.log(data);
    console.log(data.data.output_text); // ブラウザのconsokeに表示
    const ids = Object.keys(data.data.output_text);
    console.log(ids);

    // CHECK なんか二回出るんだけど？？

    // for (let i = 0; i < ids.length; i++) {
    //     console.log(data.data.output_text);
    // }
    ids.forEach(id => {
        // console.log(data.data.output_text.id);
        console.log(id);
    });


    return (
        <div>
            <Navigation />
            {text}

            {ids.map((id, index) => (
                <div key={index}>
                    {id}
                </div>
            ))}
        </div>
    );
} */


/* 
// これは APIを叩くAPIをpages/apiに作って、それを叩くバージョン。何でそんな回りくどい事するの？？
export default function Home() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/test');
            const data = await response.json();
            console.log(data);
            //   setUsers(data.users);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <Navigation />
        </div>
    );
} 
*/