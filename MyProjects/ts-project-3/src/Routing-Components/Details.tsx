import { FC, useEffect } from "react";
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FormValues } from './Signup';
import axios from 'axios';
import '../App.css';

const Details: FC = () => {
    const [view, setView] = useState<boolean>(Boolean(sessionStorage.getItem('isLoggedIn')));
    const [users, setUsers] = useState<FormValues[]>([]);
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();
    let sNo = 1;

    const findAllUsers = async () => {
        await axios.get('http://localhost:5000/getAllUsers')
        .then((res) => {
            setUsers(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const searchUserByName = async () => {
        await axios.get(`http://localhost:5000/search/${search}`)
        .then((res) => {
            setUsers(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        if (view)
            findAllUsers();
        else
            navigate('/login');
    }, []);
    
    useEffect(() => {
        if (search.length)
            searchUserByName();
        else
            findAllUsers();
    }, [search]);

    const sortByAge = (): void => {
        let newData = [...users];
        for (let i = 0; i < newData.length; i++) {
            for (let j = i + 1; j < newData.length; j++) {
                if (newData[i].age > newData[j].age) {
                    let firstName = newData[i].firstName;
                    let lastName = newData[i].lastName;
                    let email = newData[i].email;
                    let password = newData[i].password;
                    let age = newData[i].age;

                    newData[i].firstName = newData[j].firstName;
                    newData[i].lastName = newData[j].lastName;
                    newData[i].email = newData[j].email;
                    newData[i].password = newData[j].password;
                    newData[i].age = newData[j].age;

                    newData[j].firstName = firstName;
                    newData[j].lastName = lastName;
                    newData[j].email = email;
                    newData[j].password = password;
                    newData[j].age = age;
                }
            }
        }
        setUsers(newData);
    }
    const sortByName = (): void => {
        let newData = [...users];
        for (let i = 0; i < newData.length; i++) {
            for (let j = i + 1; j < newData.length; j++) {
                if (newData[i].firstName > newData[j].firstName) {
                    let firstName = newData[i].firstName;
                    let lastName = newData[i].lastName;
                    let email = newData[i].email;
                    let password = newData[i].password;
                    let age = newData[i].age;

                    newData[i].firstName = newData[j].firstName;
                    newData[i].lastName = newData[j].lastName;
                    newData[i].email = newData[j].email;
                    newData[i].password = newData[j].password;
                    newData[i].age = newData[j].age;

                    newData[j].firstName = firstName;
                    newData[j].lastName = lastName;
                    newData[j].email = email;
                    newData[j].password = password;
                    newData[j].age = age;
                }
            }
        }
        setUsers(newData);
    }
    const logoutThisPerson = (): void => {
        sessionStorage.clear();
        navigate('/logout');
    }
    const handleSearch = (event: React.FormEvent<HTMLFormElement>): void => {
        let newUsers: FormValues[] = [];
        users.map((person) => {
            if (search === person.firstName || search === person.lastName)
                newUsers.push(person);
        })
        setUsers(newUsers);
        event.preventDefault();
    }
    return (
        <div>
            {
                view?
                <div>
                    <h4>Sort By,</h4>
                    <button onClick={sortByAge}>age</button> {' '}
                    <button onClick={sortByName}>name</button>{' '}
                    <form className='App' onSubmit={(event) => handleSearch(event)}>
                        <input type='text' placeholder='search person by name' onChange={(event) => setSearch(event.target.value)} value={search}/>
                    </form>
                    <br></br>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((person) => (
                            <tr key={++sNo}>
                                <td>{sNo}</td>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.email}</td>
                                <td>{person.age}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn" onClick={logoutThisPerson}>logout</button>
                </div>
                :
                <div>
                    You're UnAuthorized to View
                </div>
            }
        </div>
    )
}
export default Details;