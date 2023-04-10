import { FC } from "react";
import {useEffect, useState} from 'react';
import { TodoValues } from './Routing/MyUsers';
import axios from 'axios';

interface Date {
    from: string;
    to: string;
}
const SearchTodos: FC<Date> = ({ from, to }) => {
    const [data, setData] = useState<TodoValues[]>([]);

    const dateCalling = (): void => {
        console.log('from: ', from, 'to: ', to);
        let _id = sessionStorage.getItem('id');
        axios.get(`http://localhost:5000/searchTodo?id=${_id}&from=${from}&to=${to}`)
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <button className='input btl' onClick={() => dateCalling()}>search</button>
            <br></br><br></br>
            {
            data.map((person) => (
                <div>
                    <br></br>
                    <li>{person.todoValue}</li>
                </div>
            ))}
        </div>
    )
}
export default SearchTodos;