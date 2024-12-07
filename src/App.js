import Navbar from './components/Navbar/Navbar';
import React from 'react';
import './App.css'
import { actions, originals,comedy, horror } from './urls'
import Banner from './components/Banner/Banner';
import RowPost from './components/RowPost/RowPost';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/signup" element={<Signup />}></Route>
      <Route exact path='/' element={<Home/>}></Route>
    </Routes>
    </Router>
     
     
    </div>
  );
}

export default App;