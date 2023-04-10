import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Signin = _ => {

    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:2000/getData')
            .then((response) => {
                setUsers(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleSubmit = _ => {
        users.map((user) => {
            if (email === user.email && password === user.password) {
                sessionStorage.setItem('isLoggedIn', true);
                history.push('/view');
                return user;
            }
            else {
                console.log('Invalid Email or Password');
                return user;
            }
        })
    }
    const gotoHomePage =_=> {
        history.push('/');
    }
    return (
        <div className='App-header'>
            <h1>Sigin</h1>
            <label>
                <input type='email'
                    placeholder='type your email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label>
                <input type='password'
                    placeholder='enter your password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
            </label><br></br>
            <label>
                <button onClick={handleSubmit}>signin</button>
            </label>
            <p>or</p>
            <label>
                <button onClick={gotoHomePage}>Home</button>
            </label>
        </div>
    )
}
export default Signin;