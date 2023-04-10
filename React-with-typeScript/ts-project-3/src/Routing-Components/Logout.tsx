import { FC } from "react";
import { useNavigate } from 'react-router-dom';

const Logout: FC = () => {
    const navigate = useNavigate();
    const backToHome = (): void => {
        navigate('/');
    }
    return (
        <div className="App">
            <h1>Logged out...</h1>
            <button onClick={backToHome}>Home</button>
        </div>
    )
}
export default Logout;