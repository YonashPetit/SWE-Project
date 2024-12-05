import React from 'react';
import TextField from '@mui/material/TextField';
import EventList from '../lists/EventList';
import secureLocalStorage from 'react-secure-storage';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/Dashboard.css";



function Clubs({setShowNavbar}) {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let inputhandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();

    setInputText(lowerCase);
  };
  useLayoutEffect(() => {
    setShowNavbar(true);
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/event-rsvp/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_id: secureLocalStorage.getItem('curevent'), user_id: secureLocalStorage.getItem('id')}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to rsvp");
      }
      const data = await response.json();
      alert(data.message); // Success message
    } catch (error) {
      console.error("Error with rsvp:", error.message);
      alert(`Error: ${error.message}`);
    }
    navigate('/dashboard');
  };

  return (
    <>
    <div className='flex-container'>
      <div className='left'>
          <div className='search'>
            <TextField
                id='outlined-basic'
                onChange={inputhandler}
                variant='outlined'
                color= "success"
                fullWidth
                label='search'
                sx={{ input: { color: 'White' } }}
            />
          </div>
          <div className='list'>
            <EventList input={inputText}/>

          </div>
      </div>
      <div className='right'>
          <div id = 'EventName' className='name'>
          </div>
          <div id = 'EventHost' className='host'>
          </div>
          <div id = 'EventDate&Time' className='datetime'>
          </div>
          <div id = 'EventLoc' className='datetime'>
          </div>
          <div id = 'EventDesc' className='description'>
          </div>
          <div className='center' style={{marginTop: "30px"}}>
            <button className='submit-button' id='button' onClick={handleSubmit} style={{display: "none"}}>RSVP</button>
          </div>
      </div>
    </div>
    </>
  );
}

export default Clubs;
