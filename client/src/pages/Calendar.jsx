import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment'
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/Dashboard.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';



function Calendars({setShowNavbar}) {
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);
  localizer.segmentOffset = 0;
  // Optional: Logout function that could clear session storage and redirect to login
  useLayoutEffect(() => {
    setShowNavbar(true);
  }, [])
  const handleLogout = () => {
    // Perform any logout logic here
    navigate('/login');
  };
  return (
    <>
      <div className='flex-container'>
        <div className= "calendarleft" style={{height: "800px", color: "white", padding: "50px"}}>
          <Calendar
            localizer={localizer}
            style = {{color: 'white'}}
          />
        </div>
        <div className='right'>
          hi
        </div>
      </div>
    </>
  );
}

export default Calendars;
