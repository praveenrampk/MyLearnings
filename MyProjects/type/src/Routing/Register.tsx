import React, { FC } from 'react';
import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // npm install @hookform/resolvers yup
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
}
const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  age: Yup.number().required('age is required'),
});

const Register: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: yupResolver(SignupSchema),
  });

  const submitDataToDB = (data: FormValues) => {
    axios.post('http://localhost:5000/submit', data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    reset();
  }
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    submitDataToDB(data);
    navigate('/login');
  };
  const handleSignin = (event: React.FormEvent<HTMLButtonElement>): void => {
    navigate('/login');
    event.preventDefault();
  }

  return (
    <div className='App-header'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1>User Details</h1>
        <h4>SignUp</h4>
        <label>
            <input className='input' type="text" placeholder='first name' {...register('firstName')}/>
            {errors.firstName && <p className='error-message'>{errors.firstName.message}</p>}
        </label><br></br>
        <label>
            <input className='input' type="text" placeholder='last name' {...register('lastName')}/>
            {errors.lastName && <p className='error-message'>{errors.lastName.message}</p>}
        </label><br></br>
        <label>
            <input className='input' type="text" placeholder='email' {...register('email')}/>
            {errors.email && <p className='error-message'>{errors.email.message}</p>}
        </label><br></br>
        <label>
            <input className='input' type="password" placeholder='password' {...register('password')}/>
            {errors.password && <p className='error-message'>{errors.password.message}</p>}
        </label><br></br>
        <label>
            <input className='input' type="password" placeholder='confirm password' {...register('confirmPassword')}/>
            {errors.confirmPassword && <p className='error-message'>{errors.confirmPassword.message}</p>}
        </label><br></br>
        <label>
            <input className='input' type='number' placeholder='age' {...register('age')}/>
            {errors.age && <p className='error-message'>{errors.age.message}</p>}
        </label><br></br><br></br>
        <button className='button' type="submit">signup</button>{' '}<br></br><br></br>or{' '}<br></br><br></br>
        <button className='button' onClick={(event) => handleSignin(event)}>signin</button>
        </form>
        </div>
    </div>
  );
}
export default Register;