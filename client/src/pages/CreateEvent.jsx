import React from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import "../pages/Dashboard.css";

function CreateEvent({setShowNavbar}){
    const navigate = useNavigate();
    const handleLogout = () =>{
      secureLocalStorage.clear();
      navigate('/');   
    }
    const [formData, setFormData] = useState({
        eventName: '',
        eventDescription: '',
        eventTime: '',
        eventLocation: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:8000/create-event/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventname: formData.eventName,
            clubname: secureLocalStorage.getItem('clubname'),
            description: formData.eventDescription,
            location: formData.eventLocation,
            date: formData.eventTime
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
    useLayoutEffect(() => {
      setShowNavbar(true);
    }, [])
    if (secureLocalStorage.getItem('admin') == true){
        return (
            <>
            <div className='flex-container'>
            <div className='middle' style={{marginLeft: "auto", marginRight: "auto"}}>
            <form onSubmit={handleSubmit} className="event-form">
                    <label htmlFor="eventName" className="label">Event Name</label>
                    <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    className="input"
                    required
                    />
                    <label htmlFor="eventDescription" className="label">Event Description</label>
                    <textarea
                    id="eventDescription"
                    name="eventDescription"
                    value={formData.eventDescription}
                    onChange={handleChange}
                    className="textarea"
                    required
                    ></textarea>
                    <label htmlFor="eventTime" className="label">Event Date & Time</label>
                    <input
                    type="datetime-local"
                    id="eventTime"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    className="input"
                    required
                    />
                    <label htmlFor="eventLocation" className="label">Event Location</label>
                    <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    className="input"
                    required
                    />
                    <div>
                    <h8 id="errormsg"></h8>
                    </div>
                    <div>
                    <button type="submit" className="submit-button">Create Event</button>
                    </div>
                </form>
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
  
export default CreateEvent;