import '../App.css';

const Logout =_=> {
    const removeStorage =_=> {
        // To remove a specific item from session storage
        //sessionStorage.removeItem('myItem');

        // To remove all items from session storage
        sessionStorage.clear();
    }
    return (
        <div className="App-header">
            <h1>Logged out..</h1>
            {removeStorage}
        </div>
    )
}
export default Logout;