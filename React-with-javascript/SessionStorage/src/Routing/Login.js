import { useState } from "react";
import Details from "./ViewDetails";
import { useHistory } from "react-router-dom";
import '../App.css';

const Login =_=> {
    const history = useHistory();

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [bool, setBool] = useState(false);

    const handleSubmit = event => {
        sessionStorage.setItem('name',user);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('age', age);
        setUser('');
        setEmail('');
        setPassword('');
        setAge(0);
        setBool(true);
    }
    const loginSubmit =_=> {
        if (sessionStorage.getItem('email') === email && sessionStorage.getItem('password') === password) {
            sessionStorage.setItem('isLoggedIn', true);
            setBool(false);
            setEmail('');
            setPassword('');
            history.push('/view');
        }
    }
    return (
        <div className='App-header'>
            {!bool && 
                <div className='App-header'>
                    <h1>SignUp</h1>
                    <label>Name</label>
                    <input type='text'
                        placeholder='Name'  
                        value={user}
                        onChange={ (event) => { setUser(event.target.value) }}/>
                    <br/>
                    <label>Email</label>
                    <input type='text'
                        placeholder='Email'
                        value={email}
                        onChange={ (event) => { setEmail(event.target.value) }}/>
                    <br/>
                    <label>Password</label>
                    <input type='text'
                        placeholder='password'
                        value={password}
                        onChange={ (event) => { setPassword(event.target.value) }}/>
                    <br/>
                    <label>Age</label>
                    <input type='text'
                        placeholder='Email'
                        value={age}
                        onChange={ (event) => { setAge(event.target.value) }}/>
                    <br/>
                    <button onClick={handleSubmit}>SignUp</button>
                </div>
            }

            {bool && 
                <div className='App-header'>
                    <h1>Login</h1>
                    <label>Email</label>
                    <input type='text'
                        placeholder='Email'
                        value={email}
                        onChange={ (event) => { setEmail(event.target.value) }}/>
                    <br/>
                    <label>Password</label>
                    <input type='text'
                        placeholder='password'
                        value={password}
                        onChange={ (event) => { setPassword(event.target.value) }}/>
                    <br/>
                    <button onClick={loginSubmit}>Login</button>
                </div>
            }
        </div>
    )
}
export default Login;
//useHistory - hook