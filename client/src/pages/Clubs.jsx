import React from 'react';
import TextField from '@mui/material/TextField';
import ClubList from '../lists/ClubList';
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/Dashboard.css";
import secureLocalStorage from 'react-secure-storage';



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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/join-club/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ club_id: secureLocalStorage.getItem('curclub'), user_id: secureLocalStorage.getItem('id')}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to join the club");
      }
      const data = await response.json();
      alert(data.message); // Success message
    } catch (error) {
      console.error("Error joining club:", error.message);
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
            <ClubList input={inputText}/>
          </div>
      </div>
      <div className='right' id='ClubPreview'>
          <div className='name' id = 'ClubName'>
          </div>
          <div className='description' id = 'ClubDesc' style={{marginTop: "30px"}}>
          </div>
          <div className='center' style={{marginTop: "30px"}}>
            <button className='submit-button' id='button' onClick={handleSubmit} style={{display: "none"}}>Join Club</button>
          </div>
      </div>
    </div>
    </>
  );
}

export default Clubs;
