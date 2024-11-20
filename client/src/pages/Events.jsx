import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
//import ClubList from '../lists/ClubList';
import { useNavigate } from 'react-router-dom';
import "../pages/Dashboard.css";



function Events() {
  const navigate = useNavigate();
  // Optional: Logout function that could clear session storage and redirect to login
  const handleLogout = () => {
    // Perform any logout logic here
    navigate('/login');
  };
  return (
    <>
    <div className='flex-container'>
        <div className='left'>
                <div className='search'>
                <TextField
                    id='outlined-basic'
                    variant='outlined'
                    color= "success"
                    fullWidth
                    label='search'
                    sx={{ input: { color: 'black' } }}
                    style={{background: "white"}}
                />
                </div>
            </div>
      <div className='right'>
          Result
      </div>
    </div>
    </>
  );
}

export default Events;
