import React from 'react';
import TextField from '@mui/material/TextField';
import ClubList from '../lists/ClubList';
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/Dashboard.css";



function Clubs({setShowNavbar}) {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  useLayoutEffect(() => {
    setShowNavbar(true);
  }, [])

  let inputhandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();

    setInputText(lowerCase);
  };
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
                onChange={inputhandler}
                variant='outlined'
                color= "success"
                fullWidth
                label='search'
                sx={{ input: { color: 'White' } }}
            />
          </div>
          <div className='list'>
            <ClubList input={inputText}/>
          </div>
      </div>
      <div className='right' id='ClubPreview'>
          <div className='name' id = 'ClubName'>
          </div>
          <div className='description' id = 'ClubDesc'>
          </div>
      </div>
    </div>
    </>
  );
}

export default Clubs;
