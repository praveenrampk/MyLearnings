import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "./Routing/ViewDetails";
import Nav from "./Routing/Nav";
import DataHandling from "./Routing/Login";
import Signin from "./Routing/Sigin";
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route path='/' exact component={DataHandling}/>
          <Route path='/view' component={Details}/>
          <Route path='/signin' component={Signin}/>
        </Switch>
      </div>
    </Router>
  )
}
export default App;