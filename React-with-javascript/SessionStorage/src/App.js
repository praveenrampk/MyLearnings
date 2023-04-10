import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Routing/Login";
import Details from "./Routing/ViewDetails";
import Logout from "./Routing/Logout";
import Nav from "./Routing/Nav";

const App =_=> {
  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route path='/' exact component={Login}/>
          <Route path='/view' component={Details}/>
          <Route path='/logout' component={Logout}/>
        </Switch>
      </div>
    </Router>
  )
}
export default App;