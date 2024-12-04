import React from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import "../pages/Dashboard.css";

function Account({setShowNavbar}){
    const navigate = useNavigate();
    const handleLogout = () =>{
      secureLocalStorage.clear();
      navigate('/');   
    }
    useEffect(() => {
      const loggedInUser = secureLocalStorage.getItem('loggedin');
      if(loggedInUser) {
        if(secureLocalStorage.getItem('admin') == true){
          const idbox = document.getElementById("id");
          const userbox = document.getElementById("user");
          const emailbox = document.getElementById("email");
          const passbox = document.getElementById("password");
          idbox.innerHTML = "ID: " + secureLocalStorage.getItem('id');
          userbox.innerHTML = "Username: " + secureLocalStorage.getItem('clubname');
          emailbox.innerHTML = "Email: " + secureLocalStorage.getItem('email');
        }
        else{
          const idbox = document.getElementById("id");
          const userbox = document.getElementById("user");
          const emailbox = document.getElementById("email");
          const passbox = document.getElementById("password");
          idbox.innerHTML = "ID: " + secureLocalStorage.getItem('id');
          userbox.innerHTML = "Username: " + secureLocalStorage.getItem('username');
          emailbox.innerHTML = "Email: " + secureLocalStorage.getItem('email');
        }
      }
      else{
        console.log("No one is logged in!");
      }
    },[])
    useLayoutEffect(() => {
      setShowNavbar(true);
    }, [])
    return (
        <>
        <div className='flex-container'>
          <div className='middle' style={{marginLeft: "auto", marginRight: "auto"}}>
              <h2 id='profile'>
                Profile Pic 
              </h2>
              <h2 id='id'>
                ID Number:
              </h2>
              <h2 id='email'>
                Email:
              </h2>
              <h2 id='user'>
                User:
              </h2>
              <h2 id='password'>
                Password: **********
              </h2>
              <div style={{width: "12.5%", margin: "auto"}}>
                <button 
                  id = "login"
                  className="button" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
          </div>
        </div>
        </>
      );
    }
  
export default Account;