import { FC } from "react";
import {useState, useEffect} from 'react';
import DatePickerForSearch from "./DatePickerForSearch";
import './App.css';
import SearchTodos from './SearchTodos';

const DateFilter: FC = () => {
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');

    return (
        <div>
            {
                <div className="btr">
                    <p>From -- {from}</p>
                    {!from && <input className='input' type='date' onChange={(event) => {
                        let date = event.target.value;
                        let parts = date.split('-');
                        let reversed = parts.reverse().join('/');
                        setFrom(reversed);
                    }}/>}
                    <button className="input btl" onClick={() => setFrom('')}>From Calender</button>
                </div>
            }
            {
                <div className="btn">
                    <p>To -- {to}</p>
                {!to && <input className='input' type='date' onChange={(event) => {
                    let date = event.target.value;
                    let parts = date.split('-');
                    let reversed = parts.reverse().join('/');
                    setTo(reversed);
                    }}/>}
                <button className="input btl" onClick={() => setTo('')}>To Calender</button>
            </div>
            }
            <SearchTodos from={from} to={to}/>
        </div>
    )
}
export default DateFilter;