import *as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import '../src/App.css';

const schema = yup.object().shape({
  firstName: yup.string().required('Enter the FirstName'), 
  lastName: yup.string().required('Enter the LastName'),
  email: yup.string().email('Please Enter Valid Email').required('Enter the Email'),
  age: yup.number().integer().positive().required(),
  password: yup.string().required().min(4, 'Minimum 4 chars required').max(15, 'Maximum 15 chars is allowed'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})
const App =_=> {
  const { register, handleSubmit, watch, formState: { errors, isValid }} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange' //validates true or false
  });

  console.log(errors);
  return (
    <div className="App-header">
      <form onSubmit={handleSubmit((data) => {
        console.log(data);
      })}>
        <input {...register('firstName')} placeholder="First Name"/>
        {errors?.firstName && <p>{errors.firstName.message}</p>}
        <input {...register('lastName')} placeholder="Last Name"/>
        {errors?.lastName && <p>{errors.lastName.message}</p>}
        <input {...register('email')} placeholder="Email"/>
        {errors?.email && <p>{errors.email.message}</p>}
        <input {...register('age')} placeholder="Age"/>
        {errors?.age && <p>{errors.age.message}</p>}
        <input {...register('password')} type='password' placeholder="password"/>
        {errors?.password && <p>{errors.password.message}</p>}
        <input {...register('confirmPassword')} type='password' placeholder='confirm password'/>
        {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <input type='submit' id='submit' disabled={!isValid}/>
      </form>
    </div>
  )
}
export default App;