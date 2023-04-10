import { FC } from "react";
import {
    Routes,
    Route,
} from 'react-router-dom';
import Nav from "./Routing/Nav";
import Register from "./Routing/Register";
import Login from "./Routing/Login";
import MyUsers from "./Routing/MyUsers";
import TodoList from "./Routing/TodoList";
import Logout from "./Routing/Logout";

const Users: FC = () => {

    return (
        <div>
            <Nav/>
            <Routes>
                <Route path='/' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/view/allPerson' element={<TodoList/>}/>
                <Route path='/view/todo' element={<MyUsers/>}/>
                <Route path='/logout' element={<Logout/>}/>
            </Routes>
        </div>
    )
}
export default Users;