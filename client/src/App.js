import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"

import Navbar from './component/Navbar'
import Landing from './component/Landing'
import Login from './component/Login'
import Register from './component/Register'
import Profile from './component/Profile'
import Quiz from './component/Quiz'
import Listeinfo from "./component/Listeinfo"
import  LoginRh from "./component/LoginRH"
import  RegisterRH from "./component/RegisterRH"
import QuestionsRH from './component/QuestionsRH';
import Fintest from './component/finTest'
import debutPhase from './component/debutPhase'

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/informations" component={Listeinfo} />
        <Route exact path="/loginRH" component={LoginRh} />
        <Route exact path="/enregistrementRH" component={RegisterRH} />
        <Route exact path="/questionsrh" component={QuestionsRH} />
        <Route exact path="/fintest" component={Fintest} />
        <Route exact path="/welcome" component={debutPhase} />
      </div>
    </div>
  </Router>
  );
}

export default App;
