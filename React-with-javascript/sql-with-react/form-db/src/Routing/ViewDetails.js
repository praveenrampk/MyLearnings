import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

const Details =_=> {

    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [copy, setCopy] = useState([]);
    const [check, setCheck] = useState(false);
    const history = useHistory();

    let isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn'));
    useEffect(() => {
        axios.get('http://localhost:2000/getData')
        .then((response) => {
            console.log(response.data.result);
            setData(response.data.result);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [copy]);
    const sortByAge =_=> {
        let newData = [...data];
        for (let i = 0; i < newData.length; i++) {
            for (let j = i + 1; j < newData.length; j++) {
                if (newData[i].age > newData[j].age) {
                    let name = newData[i].name;
                    let email = newData[i].email;
                    let password = newData[i].password;
                    let age = newData[i].age;

                    newData[i].name = newData[j].name;
                    newData[i].email = newData[j].email;
                    newData[i].password = newData[j].password;
                    newData[i].age = newData[j].age;

                    newData[j].name = name;
                    newData[j].email = email;
                    newData[j].password = password;
                    newData[j].age = age;
                }
            }
        }
        setData(newData);
    }
    const sortByName =_=> {
        let newData = [...data];
        for (let i = 0; i < newData.length; i++) {
            for (let j = i + 1; j < newData.length; j++) {
                if (newData[i].name > newData[j].name) {
                    let name = newData[i].name;
                    let email = newData[i].email;
                    let password = newData[i].password;
                    let age = newData[i].age;

                    newData[i].name = newData[j].name;
                    newData[i].email = newData[j].email;
                    newData[i].password = newData[j].password;
                    newData[i].age = newData[j].age;

                    newData[j].name = name;
                    newData[j].email = email;
                    newData[j].password = password;
                    newData[j].age = age;
                }
            }
        }
        setData(newData);
    }
    const backToSignin =_=> {
        history.push('/signin');
        sessionStorage.clear();
    }
    const search =_=> {
        let copy = [...data];
        let newList = data.filter((data) => {
            if (data.name === input) {
                return true;
            }
            return false;
        })
        setData(newList);
        setInput('');
        setCheck(!check);
    }
    const back =_=> {
        setCopy(data);
    }
    return (
        <div className="App-header">
            {
                isLoggedIn === true? 
                <div>
                    <h1>User Details</h1>
                    <input type='text' placeholder="Enter the Person's Name"
                    onChange={(event) => setInput(event.target.value)}
                    value={input}/>
                    <button onClick={search}>search</button>
                    {check === true &&
                    <button onClick={back}>cancel</button>}<br></br><br></br>

                    <label>
                        <button onClick={sortByAge}>Sort By Age</button>
                    </label>
                    <label>
                        <button onClick={sortByName}>Sort By Name</button>
                    </label>
                    <label>
                        <button onClick={backToSignin}>Exit</button>
                    </label>
                    <table>
                        <thead>
                            <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((person) => (
                            <tr key={person.id}>
                                <td>{person.id}</td>
                                <td>{person.name}</td>
                                <td>{person.email}</td>
                                <td>{person.age}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
                    :
                <h3>UnAuthorized to proceed. Please Signin to continue</h3>
            }
        </div>
    )
}
export default Details;