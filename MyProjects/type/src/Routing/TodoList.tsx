import React, { FC } from "react";
import DateFilter from "../DateFilter";
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface ChildProps {
    setPicked: (input: boolean) => void;
    setSelectedValue: (input: string) => void;
    update: (input: string) => void;
}
const TodoList: FC = () => {
    const navigate = useNavigate();
    let isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn'));
    let name = sessionStorage.getItem('name');

    const gotoLoginPage = (): void => {
        sessionStorage.clear();
        navigate('/login');
    }
    return (
        <div>
            { isLoggedIn && sessionStorage.getItem('id') && sessionStorage.getItem('name')?

            <div className="App-header">
                <h1>Hello {name}</h1><br></br>
                <h3>Choose-The-Date To find The Todo</h3>
                <DateFilter/>
            </div>
            :
            <div className="App-header">
                <br></br><br></br><br></br>
                <div className="App">
                    <h2>Your'e UnAuthorized To Proceed...</h2>
                    <h3>Please Login To Continue..!</h3>
                    <button className='input button' onClick={gotoLoginPage}>Login</button>
                </div>
            </div>
            }
        </div>
    )
}
export default TodoList;