import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import logo from '../assets/images/logo.png'
import '../App.css'

function Login() {
  const userRef = useRef();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  useEffect(() => {
    userRef.current.focus();
    }, [])
  const navigate = useNavigate();
  const home = () => navigate('/');
  const createaccountpage = () =>  navigate('/createaccount');
  const ForgotPassPage = () => navigate('/forgotpass');
  const handleSubmit = () =>{
    console.log("Logging in!")
  }
  return (
    <>
      <div>
        <a href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={logo} className="logo react" alt="Congregator logo"/>
        </a>
      </div>
      <div className="center">
              <form onSubmit={handleSubmit} className="centerform">
                <label>
                    Email: 
                </label>
                <div className="center">
                  <input
                    type ="text"
                    name = "email"
                    ref = {userRef}
                    autoCapitalize="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                    required
                  />
                </div>
                <label>
                    Password: 
                  </label>
                <div className="center">
                  <input
                    type ="password"
                    name = "password"
                    onChange={(e) => setPwd(e.target.value)}
                    value = {pwd}
                    required
                  />
                </div>
                <div className="center">
                  <p id = "forgotpass" style={{color: "blue", cursor: "pointer"}} onClick={ForgotPassPage}>Forgot Password?</p>
                </div>
                <div className="center" id = "errorbox" style={{display: "none", color: "red"}}>
                  <p id = "errormsg"></p>
                </div>
                <div className="center">
                  <input
                    className="button"
                    type ="submit"
                    value = "Login"
                  />
                </div>
                <div className='center'>
                    <button className="button" onClick={createaccountpage} style={{animation: "none"}}>
                    Create Account
                    </button>
                </div>
              </form>
          </div>
    </>
  )
}

export default Login
