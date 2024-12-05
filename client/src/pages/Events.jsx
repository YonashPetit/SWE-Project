import React from 'react';
import TextField from '@mui/material/TextField';
import EventList from '../lists/EventList';
import axios from 'axios';
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
      </div>
    </div>
    </>
  );
}

export default Clubs;
