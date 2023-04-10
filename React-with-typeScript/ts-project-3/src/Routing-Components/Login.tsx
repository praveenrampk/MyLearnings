import React, { FC, useState } from "react";
import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface LoginValues {
    email: string;
    password: string;
}
const LoginSchema = Yup.object().shape({
    email: Yup.string().required('email is required'),
    password: Yup.string().required('password is required')
})
const Login: FC = () => {
    const [error, setError] = useState<boolean>(true);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginValues>({
        resolver: yupResolver(LoginSchema),
    });
    
    const findUserFromDB = async (data: LoginValues) => {
        await axios.post('http://localhost:5000/findUser', data)
        .then((res) => {
            console.log(res.data);
            sessionStorage.setItem('isLoggedIn', 'true');
            setError(true);
            navigate('/view');
        })
        .catch((error) => {
            console.log(error);
            setError(false);
        })
    }
    const handleLogin: SubmitHandler<LoginValues> = (data) => {
        findUserFromDB(data);
        console.log('error1');
    }
    const gotoHome = (event: React.FormEvent<HTMLButtonElement>): void => {
        navigate('/');
        event.preventDefault();
    }
    return (
        <div className="App-header">
            <div className="form-row">
                <form className='App' onSubmit={handleSubmit(handleLogin)}>
                    <h1>Login</h1>
                    <label>
                        <input type='email' placeholder='Enter your email' {...register('email')}/>
                        {errors.email && <p>{errors.email.message}</p>}
                    </label><br></br>
                    <label>
                        <input type='password' placeholder='Enter your password' {...register('password')}/>
                        {errors.password && <p>{errors.password.message}</p>}
                    </label>
                    {
                        !error && <p>Email or Password Wrong</p>
                    }
                    <br></br><br></br>
                    <button type='submit'>Login</button>{' '}<br></br><br></br>-------------or-------------<br></br><br></br>{' '}
                    <button onClick={(event) => gotoHome(event)}>Home</button>
                </form>
            </div>
        </div>
    )
}
export default Login;