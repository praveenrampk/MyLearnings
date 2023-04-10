import { Link } from 'react-router-dom';
import '../App.css';

const Nav =_=> {
    const navStyle = { color: 'pink' };
    return (
        <nav>
            <h3 style={navStyle}>User Form</h3>
            <ul className='nav-links'>
                <Link style={ navStyle } to='/'>
                    <li>SignUp/Signin</li>
                </Link>
                <Link style={ navStyle } to='/view'>
                    <li>View Details</li>
                </Link>
                <Link style={ navStyle } to='/logout'>
                    <li>Logout</li>
                </Link>
            </ul>
        </nav>
    )
}
export default Nav;