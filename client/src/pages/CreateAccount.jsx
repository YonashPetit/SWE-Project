import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../App.css";

function CreateAcc() {
  const userRef = useRef();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  // Set focus on email input when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/create-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username: user,
          password: pwd,
        }),
      });
      
      if (!response.ok) {
        const { detail } = await response.json();
        document.getElementById("errormsg").textContent = detail;
      } else {
        navigate("/"); // Redirect after successful account creation
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("errormsg").textContent = "An error occurred. Please try again.";
    }
  };

  return (
    <>
      <div>
        <Link to="/">
          <img src={logo} className="accountlogo" alt="Congregator logo" />
        </Link>
      </div>
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
          <label>Username:</label>
          <div className="center">
            <input
              type="text"
              name="username"
              autoCapitalize="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
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
            <p id="errormsg"></p>
          </div>
          <div className="center">
            <input className="button" type="submit" value="Create Account" />
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAcc;
