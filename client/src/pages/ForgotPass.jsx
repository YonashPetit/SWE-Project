import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import logo from '../assets/images/logo.png'
import '../App.css'

function ForgotPass() {
  const userRef = useRef();
  const [email, setEmail] = useState('');
  useEffect(() => {
    userRef.current.focus();
    }, [])
  const navigate = useNavigate();
  const home = () => navigate('/');
  const handleSubmit = async (e) =>{
    console.log("Logging in!")
  }
  return (
    <>
      <div style={{marginTop: "140px", marginBottom: "40px"}}>
        <Link to = {"/"}>
          <img src={logo} className="accountlogo" alt="Congregator logo"/>
        </Link>
      </div>
      <div className="center">
              <form onSubmit={handleSubmit} className="centerform" style={{marginTop: "30px", marginBottom: "30px"}}>
                <label>
                    Enter your Account Email to Retrieve your Password: 
                </label>
                <div className="center" style={{marginTop: "10px", marginBottom: "10px"}}>
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
                <div className="center">
                  <p id = "errormsg" style={{display: "none", color: "red"}}></p>
                  <input
                    className="button"
                    type ="submit"
                    value = "Login"
                  />
                </div>
              </form>
          </div>
    </>
  )
}

export default ForgotPass
