import { useHistory } from 'react-router-dom';
import '../App.css';

const Details = ({ setLogin}) => {

    const history = useHistory();
    const loggingOut =_=> {
        sessionStorage.clear();
        history.push('/logout');
    }
    return (
        <div className="App-header">
            <h1>User Details</h1>
            <label>Name: {sessionStorage.getItem('name')}</label>
            <label>Email: {sessionStorage.getItem('email')}</label>
            <label>Age: {sessionStorage.getItem('age')}</label>
            <button onClick={loggingOut}>Logout</button>
        </div>
    )
}
export default Details;