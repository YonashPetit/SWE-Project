import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import logo from '../assets/images/logo.png'
import '../App.css'

function CreateAcc() {
  const userRef = useRef();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  useEffect(() => {
    userRef.current.focus();
    }, [])
  const navigate = useNavigate();
  const home = () => navigate('/');
  const createaccountpage = () =>  navigate('/createaccount');
  const ForgotPassPage = () => navigate('/forgotpass');
  const handleSubmit = async (e) =>{
    console.log("Logging in!")
  }
  return (
    <>
      <div>
        <Link to = {"/"}>
          <img src={logo} className="accountlogo" alt="Congregator logo"/>
        </Link>
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
                    Username: 
                </label>
                <div className="center">
                  <input
                    type ="text"
                    name = "username"
                    ref = {userRef}
                    autoCapitalize="off"
                    onChange={(e) => setUser(e.target.value)}
                    value = {user}
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
                  <p id = "errormsg"></p>
                </div>
                <div className="center">
                  <input
                    className="button"
                    type ="submit"
                    value = "Create Account"
                  />
                </div>
              </form>
          </div>
    </>
  )
}

export default CreateAcc
