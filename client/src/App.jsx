import './App.css'
import {BrowserRouter as Router,  Routes,  Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import ForgotPass from './pages/ForgotPass';
import CreateAcc from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home/>} exact/>
          <Route path = "/login" element = {<Login/>} exact/>
          <Route path = "/createaccount" element = {<CreateAcc/>} exact/>
          <Route path = "/forgotpass" element = {<ForgotPass/>} exact/>
          <Route path= "/dashboard" element = {<Dashboard />} exact/>
          <Route path = "*" element = {<NoPage/>} exact/>
        </Routes>
        </Router>    
    </>
  );
}

export default App
