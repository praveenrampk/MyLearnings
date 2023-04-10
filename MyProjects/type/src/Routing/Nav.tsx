import React,{ FC } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import {useState} from 'react';

const Nav: FC = () => {
    const navStyle = { color: 'white' };
    const [set, setSet] = useState<boolean>(false);
    const name = sessionStorage.getItem('name');

    return (
        <nav>
            <h3 onChange={() => setSet(false)}>{name}'s TODO-LIST</h3>
            <ul className='nav-links'>
                <Link style={navStyle} to='/'>
                    <li>Register</li>
                </Link>
                <Link style={navStyle} to='/login'>
                    <li>Login</li>
                </Link>
                <Link style={navStyle} to='/view/todo'>
                    <li>Goto Todo</li>
                </Link>
                <Link style={navStyle} to='/view/allPerson'>
                    <li>View User</li>
                </Link>
                <Link style={navStyle} to='/logout'>
                    <li>Logout</li>
                </Link>
            </ul>
        </nav>
    )
}
export default Nav;