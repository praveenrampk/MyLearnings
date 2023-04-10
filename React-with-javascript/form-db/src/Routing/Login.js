import *as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import axios from "axios";
import '../App.css';

const schema = yup.object().shape({
    name: yup.string().required('Enter Your Name'),
    email: yup.string().email('Please Enter Valid Email').required('Enter the Email'),
    age: yup.number().integer().positive().required(),
    password: yup.string().required().min(4, 'Minimum 4 chars required').max(15, 'Maximum 15 chars is allowed'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const DataHandling = () => {
    
    const { register, watch, formState: { errors, isValid }, reset} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange' //validates true or false
    });    
    const history = useHistory();

    const handleSubmit = event => {

        const formData = {
            name: watch('name'),
            email: watch('email'),
            age: watch('age'),
            password: watch('password'),
        };
        
        axios.post('http://localhost:2000/submit', formData)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        reset();
        event.preventDefault();
    }

    const handleSignIn = event => {
        history.push('/signin');
    }

    return (
        <div className='App-header'>
            <h1>ENTER DETAILS</h1>
            <form onSubmit={handleSubmit}>
                <label>
                <input {...register('name')} placeholder="Enter Your Name"/>
                {errors?.name && <p>{errors.name.message}</p>}
                </label><br></br>
                <label>
                <input {...register('email')} placeholder="Email"/>
                {errors?.email && <p>{errors.email.message}</p>}
                </label><br></br>
                <label>
                <input {...register('age')} placeholder="Age"/>
                {errors?.age && <p>{errors.age.message}</p>}
                </label><br></br>
                <label>
                <input {...register('password')} type='password' placeholder="password"/>
                {errors?.password && <p>{errors.password.message}</p>}
                </label><br></br>
                <label>
                <input {...register('confirmPassword')} type='password' placeholder='confirm password'/>
                {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </label>
            </form>
            <br></br>
            <button onClick={handleSubmit} disabled={!isValid}>signUp</button>
            <p>or</p>
            <button onClick={handleSignIn}>sigIn</button>
        </div>
    )
}
export default DataHandling;