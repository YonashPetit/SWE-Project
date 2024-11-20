import React from 'react';
import './Navbar.css';

const Navbar = () => {
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
        <a href="/account" className="user-icon">
          <i className="fas fa-user">USER</i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
