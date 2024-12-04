import React from 'react';
import './Navbar.css';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

const Navbar = () => {
  useEffect(() => {
    const loggedInUser = secureLocalStorage.getItem('loggedin');
    if(loggedInUser) {
      const user = document.getElementById("username");
      user.innerHTML = secureLocalStorage.getItem('email');
    }
    else{
      console.log("No one is logged in!");
    }
  },[])
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          CongreGator
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/Dashboard">Home</a>
          </li>
          <li>
            <a href="/Calendar">Calendar</a>
          </li>
          <li>
            <a href="/Events">Events</a>
          </li>
          <li>
            <a href="/Clubs">Clubs</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/account" className="user-icon" >
          <i className="fas fa-user" id="username">USER</i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
