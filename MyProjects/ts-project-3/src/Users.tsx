import { FC } from "react";
import {
    Routes,
    Route,
} from 'react-router-dom';
import Signup from "./Routing-Components/Signup";
import Login from "./Routing-Components/Login";
import Details from './Routing-Components/Details';
import Logout from "./Routing-Components/Logout";
import Nav from "./Routing-Components/Nav";

const MyUsers: FC = () => {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path='/' element={<Signup />}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/view' element={<Details />}/>
                <Route path='/logout' element={<Logout />}/>
            </Routes>
        </div>
    )
}
export default MyUsers;