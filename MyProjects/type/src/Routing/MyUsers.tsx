import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import FilterProduct from "../Filtering";
import '../App.css';

export interface TodoValues {
    id: string;
    todoValue: string;
    completed: boolean;
    edit: boolean;
}
const MyUsers: FC = () => {
    const [task, setTask] = useState<string>('');
    const [data, setData] = useState<TodoValues[]>([]);
    const navigate = useNavigate();
    
    let name = sessionStorage.getItem('name');
    const navStyle = { color: 'yellow' };

    let _id = sessionStorage.getItem('id');
    console.log(_id);
    let isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn'));

    const addTaskToMyCollection = async () => {
        axios.post('http://localhost:5000/addTask', {_id, name, task})
            .then((res) => {
                setData(res.data);
                console.log('data: ', data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const findUser = async () => {
        axios.post('http://localhost:5000/findTask', {_id})
            .then((res) => { 
                console.log('_id: ', res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (isLoggedIn && name && _id) {
            findUser();
        } else {
            sessionStorage.clear();
            navigate('/view/allPerson');
        }
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>): void => {
        if (task.length > 3) {
            console.log(task);
            addTaskToMyCollection();
            setTask('');
        }
        event.preventDefault();
    }

    const handleToggle = (userId: string): void => {
        console.log(userId);
        axios.post('http://localhost:5000/updateStatus', { _id, userId })
            .then((res) => {
                console.log('toggled');
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const navigateToLogin = (): void => {
        navigate('/login');
    }

    return (
        <div className="App-header">
            {
                isLoggedIn ?
                    <div>
                        <h3>Hello {name}..!</h3>
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <input className='input App' type='text' placeholder='Add Your Tasks...' value={task} onChange={(event) => setTask(event.target.value)} />
                            <button className='button' type='submit'>add</button>{' '}
                            <button className="btn button" onClick={() => {
                                sessionStorage.clear();
                                navigate('/login');
                            }}>logout</button>
                        </form>
                        {
                            data.map((person: TodoValues) => (
                                <div>
                                    <br></br>
                                    <input type='checkbox' checked={person.completed} onChange={() => handleToggle(person.id)} />
                                    <span className='btl' style={{ textDecoration: person.completed ? 'line-through' : '' }}>{person.todoValue}</span>{' '}<br></br><br></br>
                                    <FilterProduct personObj={person} setFunction={setData}/>
                                </div>
                        ))}TodoValues
                    </div>
                    :
                    <div>
                        <h3>Your'e UnAuthorized to Proceed...</h3><h3>Please Login to coninue</h3>
                        <button className='button' onClick={navigateToLogin}>Login</button>
                    </div>
            }
        </div>
    )
}
export default MyUsers;