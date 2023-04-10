import { useForm } from "react-hook-form";
import '../src/App.css';

const App =_=> {
  const { register, handleSubmit, watch, formState: { errors }} = useForm();

  console.log(watch('fName'));
  console.log(errors);
  return (
    <div className="App-header">
      <form onSubmit={handleSubmit((data) => {
        console.log(data);
      })}>
        <input {...register('fName', {required: 'firt name is required', minLength: {
          value: 5,
          message: 'Minimum 5 chars expected',
        } })} type='text'
        placeholder='First Name'/>
        {errors?.fName && <p>{errors.fName.message}</p>}

        <input { ...register('lName', { required: 'last name is required', minLength: {
          value: 5,
          message: 'Minimum 5 chars expected',
        } })} type='text'
        placeholder='Last Name'/>
        {errors?.lName && <p>{errors.lName.message}</p>}

        <input type='submit' id='submit'/>
      </form>
    </div>
  )
}
export default App;