import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shop from './Shop';
import React, { Suspense, lazy } from 'react';
// import About from './About';
import Home from './Home';
import Nav from './Nav';
import '../src/App.css';
const lazyAbout = lazy(() => import('./About'));

const App = () => {
  return (
    <Router>{/* we importing the react routing properites and enclosing all the contents inside the Router */}
      <div>
        <Nav />
        <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/' exact component={Home} /> {/* exact keyword checks the exact api present or not */}
          <Route path='/shop' component={Shop} />
          <Route path='/about' component={lazyAbout} /> {/* here, the path is used to navigate the desired pages */}
        </Switch> {/* the main motive of switch is, it allows only one component should render */}
        </Suspense>
      </div>
    </Router>
  )
}
export default App;
//npm install react-router-dom@5.2.0
//we want routing functionality of react, importing the BrowserRouter