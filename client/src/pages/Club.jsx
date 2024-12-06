import React from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import moment from 'moment';
import "../pages/Dashboard.css";

function Club({setShowNavbar}){
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const handleLogout = () =>{
      secureLocalStorage.clear();
      navigate('/');   
    }
    const fetchEvents = async (e) => {
      try {
          const userId = secureLocalStorage.getItem("id");
          const response = await fetch("http://localhost:8000/get-events/", {
              method: "GET",
          });
          const data = await response.json();
          for (let i = data.events.length - 1; i >= 0; i--) {
              if (data.events[i].clubname == secureLocalStorage.getItem('clubname')) {
              } else {
                  data.events.splice(i, 1);
              }
          }
          // Sort events by date using moment.js
          data.events.sort((a, b) => moment(a.date).isBefore(moment(b.date)) ? -1 : 1);
          setEvents(data.events);
      } catch (error) {
          console.error('Error fetching events:', error);
      }
    };
    useLayoutEffect(() => {
      setShowNavbar(true);
    }, [])
    useEffect(() => {
      fetchEvents();
      const namebox = document.getElementById('name');
      const descbox = document.getElementById('description');
      namebox.innerHTML = secureLocalStorage.getItem('clubname');
      descbox.innerHTML = secureLocalStorage.getItem('desc');
    }, []);
    if (secureLocalStorage.getItem('admin') == true){
        return (
            <>
            <div className='flex-container'>
            <div className='middle' style={{marginLeft: "auto", marginRight: "auto"}}>
                <div id = "name" style={{fontSize: "XX-Large"}}>
                  Name
                </div>
                <div id = "description" style={{fontSize: "large", lineHeight: "2"}}>
                  Description
                </div>
                <div id = "events">
                      Events
                      {events.map((item) => (
                        <li
                          style={{ cursor: 'pointer', listStyle: 'none', margin: '0', padding: '0' }}
                          key={item._id}
                        >
                          <div>
                            <strong>{item.eventname}</strong>
                          </div>
                          <div style={{ fontSize: "0.9em", color: "gray" }}>
                            {moment(item.date).format("MMMM Do YYYY, h:mm A")}
                          </div> {/* Adjusted to display the event name */}
                        </li>
                      ))}
                </div>
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