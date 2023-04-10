import { FC, useState } from "react";
import DatePicker from "./DatePicker";
import { TodoValues } from "./Routing/MyUsers";
import './App.css';
import axios from 'axios';
import {useEffect} from 'react';

interface ChildProps {
    personObj: TodoValues;
    setFunction: ([]) => void;
}
const FilterProduct: FC<ChildProps> = ({ personObj, setFunction }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>('');
    const [picked, setPicked] = useState<boolean>(false);

    useEffect(() => {
        let _id = sessionStorage.getItem('id');
        let id = personObj.id;
        _id = _id + " " + id;
        axios.get(`http://localhost:5000/fetchDate/${_id}`)
            .then((res) => {
                console.log(res.data);
                setSelectedDate(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        switch (event.target.value) {
            case 'today':
                setSelectedDate(new Date().toLocaleDateString());
                setSelectedValue('date');
                updateTodoDate(new Date().toLocaleDateString());
                break;
            case 'tomorrow':
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setSelectedValue('date');
                updateTodoDate(tomorrow.toLocaleDateString());
                break;
            case 'setDate':
                setPicked(true);
                setSelectedValue('date');
                console.log(selectedDate);
                break;
            default:
                setPicked(false);
                break;
        }
        event.preventDefault();
    }

    const updateTodoDate = (date: string): void => {
        const _id = sessionStorage.getItem('id');
        console.log('db: ', date);
        axios.patch('http://localhost:5000/upDate', { _id, id: personObj.id, date })
            .then((res) => {
                console.log(res);
                setSelectedDate(date);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const updateTodoValue = (): void => {
        const _id = sessionStorage.getItem('id');
        axios.patch('http://localhost:5000/updateTodo', { _id, id: personObj.id, editValue })
            .then((res) => {
                setFunction(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteTodoValue = (): void => {
        const _id = sessionStorage.getItem('id');
        axios.put(`http://localhost:5000/deleteTodo`, { _id, id: personObj.id })
            .then((res) => {
                console.log(res.data);
                setFunction(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>): void => {
        if (editValue.length > 3) {
            updateTodoValue();
            setSelectedValue('none');
            setEdit(false);
            setEditValue('');
        }
        event.preventDefault();
    }

    const cancelEdit = (): void => {
        setSelectedValue('none');
        setEdit(false);
    }

    return (
        <div className="App">
            {edit &&
                <div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <input className="App input" type='text' placeholder='edit your todo...' onChange={(event) => setEditValue(event.target.value)} value={editValue} />
                        <button className="input App" type='submit'>save</button>
                        <button className="input App" onClick={cancelEdit}>cancel</button>
                    </form>
                </div>
            }
            <button className="input" onClick={() => {
                setEditValue(personObj.todoValue);
                setEdit(true);
            }}>edit</button> {' '}
            <button className="input" onClick={() => deleteTodoValue()}>delete</button>{' '}
            <select className='input' value={selectedValue} onChange={handleSelectChange}>
                <option value='date'>due-date --- {selectedDate}</option>
                <option value='today'>1. Today</option>
                <option value='tomorrow'>2. Tomorrow</option>
                <option value='setDate'>3. custom-date</option>
            </select>
            {(picked && <DatePicker setPicked={setPicked} setSelectedValue={setSelectedValue} update={updateTodoDate}/>)}
        </div>
    )
}
export default FilterProduct;
