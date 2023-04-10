import Login from "./Login";
import Profile from "./Profile";
import '../src/App.css';

const App = () => {
  return (
    <div className='App'>
      Praveen
      <Profile/>
      <Login/>
    </div>
  )
}
export default App;
// creating the redux store : command for installing those modules
//npm i redux react-redux @reduxjs/toolkit