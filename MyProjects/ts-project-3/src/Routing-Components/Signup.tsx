import React, { FC } from 'react';
import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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

const SignupForm: FC = () => {
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
      <div className='form-row'>
        <form className='App' onSubmit={handleSubmit(onSubmit)}>
        <h1>User Details</h1>
        <h4>SignUp</h4>
        <label>
            <input type="text" placeholder='first name' {...register('firstName')}/>
            {errors.firstName && <p>{errors.firstName.message}</p>}
        </label><br></br>
        <label>
            <input type="text" placeholder='last name' {...register('lastName')}/>
            {errors.lastName && <p>{errors.lastName.message}</p>}
        </label><br></br>
        <label>
            <input type="text" placeholder='email' {...register('email')}/>
            {errors.email && <p>{errors.email.message}</p>}
        </label><br></br>
        <label>
            <input type="password" placeholder='password' {...register('password')}/>
            {errors.password && <p>{errors.password.message}</p>}
        </label><br></br>
        <label>
            <input type="password" placeholder='confirm password' {...register('confirmPassword')}/>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </label><br></br>
        <label>
            <input type='number' placeholder='age' {...register('age')}/>
        </label><br></br><br></br>
        <button type="submit">signup</button>{' '}<br></br><br></br>---------- or ----------{' '}<br></br><br></br>
        <button onClick={(event) => handleSignin(event)}>signin</button>
        </form>
        </div>
    </div>
  );
}
export default SignupForm;