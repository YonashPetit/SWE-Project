import React from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import "../pages/Dashboard.css";

function Club({setShowNavbar}){
    const navigate = useNavigate();
    const handleLogout = () =>{
      secureLocalStorage.clear();
      navigate('/');   
    }
    useLayoutEffect(() => {
      setShowNavbar(true);
    }, [])
    if (secureLocalStorage.getItem('admin') == true){
        return (
            <>
            <div className='flex-container'>
            <div className='middle' style={{marginLeft: "auto", marginRight: "auto"}}>
                Club Hub
            </div>
            </div>
            </>
        );
    }
    else{
        return (
            <>
              <Link to = {"/"}>
                <img src={notfound} alt="Page not found"/>
              </Link>
              <p style={{fontSize: "50px"}}>
                  You Don't Have Access to This! 
              </p>
            </>
        );
    }
}
  
export default Club;