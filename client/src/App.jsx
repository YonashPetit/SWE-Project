import './App.css'
import {BrowserRouter as Router,  Routes,  Route} from 'react-router-dom';
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
import { useState } from 'react';

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
          <Route path = "/forgotpass" element = {<ForgotPass setShowNavbar={setShowNavbar}/>} exact/>
          <Route path= "/dashboard" element = {<Dashboard/>} exact/>
          <Route path= "/calendar" element = {<Calendars/>} exact/>
          <Route path= "/events" element = {<Events/>} exact/>
          <Route path= "/clubs" element = {<Clubs/>} exact/>
          <Route path = "*" element = {<NoPage setShowNavbar={setShowNavbar}/>} exact/>
        </Routes> 
      </Router>
    </>
  );
}
export default App
