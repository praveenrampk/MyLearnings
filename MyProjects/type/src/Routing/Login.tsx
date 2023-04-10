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
        axios.post('http://localhost:5000/findUser', data)
            .then((res) => {
                sessionStorage.clear();
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('id', res.data._id);
                sessionStorage.setItem('name', res.data.firstName);
                setError(true);
                navigate('/view/todo', {state: res.data});
            })
            .catch((error) => {
                console.log(error);
                setError(false);
            })
    }
    const handleLogin: SubmitHandler<LoginValues> = (data) => {
        findUserFromDB(data);
    }
    const gotoHome = (event: React.FormEvent<HTMLButtonElement>): void => {
        navigate('/');
        event.preventDefault();
    }
    return (
        <div className="App-header">
            <div>
                <form className='App' onSubmit={handleSubmit(handleLogin)}>
                    <h1>Login</h1>
                    <label>
                        <input className='input' type='email' placeholder='Enter your email' {...register('email')} />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </label><br></br>
                    <label>
                        <input className='input' type='password' placeholder='Enter your password' {...register('password')} />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </label>
                    {
                        !error && <p>Email or Password Wrong</p>
                    }
                    <br></br><br></br>
                    <button className='button' type='submit'>Login</button>{' '}<br></br><br></br>or<br></br><br></br>{' '}
                    <button className='button' onClick={(event) => gotoHome(event)}>Home</button>
                </form>
            </div>
        </div>
    )
}
export default Login;