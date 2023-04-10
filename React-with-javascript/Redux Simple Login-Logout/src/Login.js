import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/user";
import { useSelector } from "react-redux";
import '../src/App.css';

const Login = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    const user = useSelector(state => state.user.value)

    return (
        <div className='App'>
            { !user.name && 
                <div>
                    <label>Name: 
                        <input type='text'
                        value={name}
                        onChange={ event => setName(event.target.value) }/>
                    </label><br></br>
                    <label>Age:
                        <input type='text'
                        value={age}
                        onChange={ event => setAge(event.target.value) }/>
                    </label><br></br>
                    <label>Email: 
                        <input type='text'
                        value={email}
                        onChange={ event => setEmail(event.target.value) }/>
                    </label><br></br>
                </div>
            }
            { !user.name ? <button onClick={ () => dispatch(login({ name, age, email }))}>Login</button> 
                :
                <button onClick={ () => dispatch(logout())}>Logout</button>
            }
        </div>
    )
}
export default Login;
//useDispatch is used to update the state value
//useSelector is used to fetch the state value