import React from 'react';
import TextField from '@mui/material/TextField';
//import ClubList from '../lists/ClubList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/Dashboard.css";



function Clubs() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  // Optional: Logout function that could clear session storage and redirect to login
  const handleLogout = () => {
    // Perform any logout logic here
    navigate('/login');
  };
  const onChange = (date) => {
    setValue(date);
  }

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

export default Clubs;
