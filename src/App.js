import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NavBar from './components/layout/NavBar'
import './App.css'
import DashBoard from './components/layout/DashBoard';
import backgroundImage from './pattern.png'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Pokemon from './components/pokemon/Pokemon'

function App() {
  return (
    <Router>
    <div className="App" style={{background: `url(${backgroundImage})`}}>
      <NavBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route  path="/pokemon/:pokemonIndex" component={Pokemon} />        
        </Switch>
          </div>
    </div>
    </Router>
  );
}

export default App;
