import React from "react";
import ReactDOM from "react-dom";
import  loginForm  from "./loginForm.js"
import  registrationForm  from "./registrationForm.js"
import  checkInForm  from "./checkInForm.js"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
    return (
        <section className="App">
            <Router>
                <ul>
            <li><Link to="/loginForm">loginForm</Link>
            <Route path="/loginForm" component={ loginForm } /></li>
            <li><Link to="/registrationForm">registrationForm</Link>
            <Route path="/registrationForm" component={ registrationForm } /></li>
            <li><Link to="/checkInForm">checkIn Form</Link>
            <Route path="/checkInForm" component={ checkInForm } /></li>
            </ul>
            </Router>
        </section>

      );
};

export default App;
  
ReactDOM.render(<App />, document.getElementById("root"));