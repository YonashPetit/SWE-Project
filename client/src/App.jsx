import './App.css'
import {BrowserRouter as Router,  Routes,  Route} from 'react-router-dom';
import { useState } from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Navbar from "./pages/Navbar";
import ForgotPass from './pages/ForgotPass';
import CreateAcc from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';
import Calendars from './pages/Calendar';
import Events from './pages/Events';
import Clubs from './pages/Clubs';
import AdminLogin from './pages/AdminLogin';
import AdminCA from './pages/AdminCA';
import Account from './pages/Account';
import CreateEvent from './pages/CreateEvent';
import Club from './pages/Club';

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <>
      {showNavbar && <Navbar/>}
      <Router>
        <Routes>
          <Route path = "/" element = {<Home setShowNavbar={setShowNavbar}/>} exact/>
          <Route path = "/login" element = {<Login setShowNavbar={setShowNavbar}/>} exact/>
          <Route path = "/createaccount" element = {<CreateAcc setShowNavbar={setShowNavbar}/>} exact/>
          <Route path = "/adminlogin" element = {<AdminLogin setShowNavbar={setShowNavbar}/>} exact/>
          <Route path = "/adminca" element = {<AdminCA setShowNavbar={setShowNavbar}/>} exact/>
          <Route path = "/forgotpass" element = {<ForgotPass setShowNavbar={setShowNavbar}/>} exact/>
          <Route path= "/dashboard" element = {<Dashboard setShowNavbar={setShowNavbar}/>} exact/>
          <Route path= "/calendar" element = {<Calendars setShowNavbar={setShowNavbar}/>} exact/>
          <Route path= "/events" element = {<Events setShowNavbar={setShowNavbar}/>} exact/>
          <Route path= "/clubs" element = {<Clubs setShowNavbar={setShowNavbar}/>} exact/>
          <Route path= "/account" element = {<Account setShowNavbar={setShowNavbar}/>} exact/>
          <Route path= "/club" element = {<Club setShowNavbar={setShowNavbar}/>} exact/>
          <Route path= "/createevent" element = {<CreateEvent setShowNavbar={setShowNavbar}/>} exact/>
          <Route path = "*" element = {<NoPage setShowNavbar={setShowNavbar}/>} exact/>
        </Routes> 
      </Router>
    </>
  );
}
export default App
