import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import logo from "../assets/images/logo.png";
import "../App.css";

function AdminLogin({setShowNavbar}) {
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useLayoutEffect(() => {
    setShowNavbar(false);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pwd }),
      });
      console.log(response);
      const result = await response.json();
      if (!response.ok) {
        const { detail } = result;
        document.getElementById("errormsg").textContent = detail;
      } else {
        // Redirect to the Dashboard page on successful login
        const { acc } = result;
        console.log(acc);
        secureLocalStorage.setItem("email", email);
        secureLocalStorage.setItem("pwd", pwd);
        secureLocalStorage.setItem("loggedin", true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("errormsg").textContent = "An error occurred. Please try again.";
    }
  };

  const createaccountpage = () => navigate("/adminca");
  const ForgotPassPage = () => navigate("/forgotpass");

  return (
    <>
      <div style={{marginTop: "140px", marginBottom: "40px"}}>
        <Link to="/">
          <img src={logo} className="accountlogo" alt="Congregator logo"/>
        </Link>
      </div>
      Admin Login
      <div className="center">
        <form onSubmit={handleSubmit} className="centerform">
          <label>Email:</label>
          <div className="center">
            <input
              type="text"
              name="email"
              ref={userRef}
              autoCapitalize="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <label>Password:</label>
          <div className="center">
            <input
              type="password"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>
          <div className="center">
            <p id="forgotpass" style={{ color: "green", cursor: "pointer" }} onClick={ForgotPassPage}>
              Forgot Password?
            </p>
            <p id="errormsg" style={{ color: "red" }}></p>
          </div>
          <div className="center">
            <input className="button" type="submit" value="Login" />
            <div className="space"></div>
            <button className="button" onClick={createaccountpage}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
