import React from 'react';
import { Router } from "@reach/router"
import NavBar from './componanet/NavBar'
import Home from './componanet/Home'
import About from './componanet/About'
import './App.css';
import './mobile.css';

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Home path="/"/>
        <About path="about"/>
      </Router>
    </div>
  );
}

export default App;
