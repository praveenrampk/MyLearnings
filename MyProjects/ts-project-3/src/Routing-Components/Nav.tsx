import { Link } from "react-router-dom";
import { FC } from "react";
import '../App.css';

const Nav: FC = () => {
    const navStyle = { color: 'white' };
    return (
        <nav>
            <h3>USERS</h3>
            <ul className='nav-links'>
                <Link style={navStyle} to='/'>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to='/login'>
                    <li>Login</li>
                </Link>
                <Link style={navStyle} to='/view'>
                    <li>View Details</li>
                </Link>
                <Link style={navStyle} to='/logout'>
                    <li>Logout</li>
                </Link>
            </ul>
        </nav>
    )
}
export default Nav;