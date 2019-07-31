import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Home from './components/home'
import AddProduct from "./components/AddProduct";
import UserPage from './components/UserPage'
function App() {
  return (
      <div className="App">
          <Router>
              <Route path="/" exact component={Home} />
              <Route path="/register/" component={Register} />
              <Route path="/login/" component={Login} />
              <Route path="/userpage/" component={UserPage} />
          </Router>
      </div>
  );
}

export default App;

